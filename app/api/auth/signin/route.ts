import { NextResponse } from "next/server";
import {
  createSessionToken,
  safeRelativeReturnPath,
  sessionCookieName,
} from "../../../chatgpt-auth";

export async function POST(request: Request) {
  const form = await request.formData();
  const displayName = String(form.get("displayName") ?? "").trim().slice(0, 80);
  const login = String(form.get("email") ?? "").trim().toLowerCase().slice(0, 160);
  const password = String(form.get("password") ?? "");
  const returnTo = safeRelativeReturnPath(
    String(form.get("returnTo") ?? "/workspace"),
  );
  const signInUrl = new URL("/signin", request.url);
  signInUrl.searchParams.set("return_to", returnTo);

  const adminUsername = (process.env.ADMIN_USERNAME ?? "admin").trim().toLowerCase();
  const adminEmail = (process.env.ADMIN_EMAIL ?? "admin@shiguang.local")
    .trim()
    .toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD ?? "fy147852";
  const isAdminLogin = login === adminUsername || login === adminEmail;
  const email = isAdminLogin ? adminEmail : login;

  if ((!isAdminLogin && (!displayName || !email.includes("@"))) || !login) {
    signInUrl.searchParams.set("error", "invalid");
    return NextResponse.redirect(signInUrl, 303);
  }

  if (isAdminLogin && password !== adminPassword) {
    signInUrl.searchParams.set("error", "admin");
    return NextResponse.redirect(signInUrl, 303);
  }

  const response = NextResponse.redirect(new URL(returnTo, request.url), 303);
  response.cookies.set(
    sessionCookieName,
    createSessionToken({
      displayName: isAdminLogin ? "admin" : displayName,
      email,
      fullName: isAdminLogin ? "Administrator" : displayName,
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
