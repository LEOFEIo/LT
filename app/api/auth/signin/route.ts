import { NextResponse } from "next/server";
import {
  createSessionToken,
  safeRelativeReturnPath,
  sessionCookieName,
} from "../../../chatgpt-auth";

export async function POST(request: Request) {
  const form = await request.formData();
  const displayName = String(form.get("displayName") ?? "").trim().slice(0, 80);
  const email = String(form.get("email") ?? "").trim().toLowerCase().slice(0, 160);
  const password = String(form.get("password") ?? "");
  const returnTo = safeRelativeReturnPath(
    String(form.get("returnTo") ?? "/workspace"),
  );
  const signInUrl = new URL("/signin", request.url);
  signInUrl.searchParams.set("return_to", returnTo);

  if (!displayName || !email || !email.includes("@")) {
    signInUrl.searchParams.set("error", "invalid");
    return NextResponse.redirect(signInUrl, 303);
  }

  const adminEmail = (process.env.ADMIN_EMAIL ?? "").trim().toLowerCase();
  if (
    adminEmail &&
    email === adminEmail &&
    password !== (process.env.ADMIN_PASSWORD ?? "")
  ) {
    signInUrl.searchParams.set("error", "admin");
    return NextResponse.redirect(signInUrl, 303);
  }

  const response = NextResponse.redirect(new URL(returnTo, request.url), 303);
  response.cookies.set(
    sessionCookieName,
    createSessionToken({
      displayName,
      email,
      fullName: displayName,
    }),
    {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    },
  );
  return response;
}
