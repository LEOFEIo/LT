import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type ChatGPTUser = {
  displayName: string;
  email: string;
  fullName: string | null;
};

type SessionPayload = ChatGPTUser & {
  expiresAt: number;
};

const SESSION_COOKIE = "shiguang_session";

function sessionSecret() {
  return process.env.AUTH_SECRET || "shiguang-development-secret";
}

function signature(value: string) {
  return createHmac("sha256", sessionSecret())
    .update(value)
    .digest("base64url");
}

export function createSessionToken(user: ChatGPTUser) {
  const payload: SessionPayload = {
    ...user,
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${encoded}.${signature(encoded)}`;
}

function readSessionToken(token: string): ChatGPTUser | null {
  const [encoded, providedSignature] = token.split(".");
  if (!encoded || !providedSignature) return null;

  const expectedSignature = signature(encoded);
  const expected = Buffer.from(expectedSignature);
  const provided = Buffer.from(providedSignature);
  if (
    expected.length !== provided.length ||
    !timingSafeEqual(expected, provided)
  ) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(encoded, "base64url").toString("utf8"),
    ) as Partial<SessionPayload>;
    if (
      typeof payload.email !== "string" ||
      typeof payload.displayName !== "string" ||
      typeof payload.expiresAt !== "number" ||
      payload.expiresAt < Date.now()
    ) {
      return null;
    }
    return {
      email: payload.email,
      displayName: payload.displayName,
      fullName:
        typeof payload.fullName === "string" ? payload.fullName : null,
    };
  } catch {
    return null;
  }
}

export async function getChatGPTUser(): Promise<ChatGPTUser | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return token ? readSessionToken(token) : null;
}

export async function requireChatGPTUser(
  returnTo: string,
): Promise<ChatGPTUser> {
  const user = await getChatGPTUser();
  if (user) return user;
  redirect(chatGPTSignInPath(returnTo));
}

export function chatGPTSignInPath(returnTo: string): string {
  return `/signin?return_to=${encodeURIComponent(safeRelativeReturnPath(returnTo))}`;
}

export function chatGPTSignOutPath(returnTo = "/"): string {
  return `/api/auth/signout?return_to=${encodeURIComponent(
    safeRelativeReturnPath(returnTo),
  )}`;
}

export function safeRelativeReturnPath(value: string): string {
  if (!value.startsWith("/") || value.startsWith("//")) return "/";
  try {
    const url = new URL(value, "https://app.local");
    if (url.origin !== "https://app.local") return "/";
    if (url.pathname === "/signin" || url.pathname.startsWith("/api/auth/")) {
      return "/";
    }
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return "/";
  }
}

export const sessionCookieName = SESSION_COOKIE;
