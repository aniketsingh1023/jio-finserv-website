import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/* ----------------------------------------------------
   GET COOKIE VALUE
---------------------------------------------------- */

export async function getCookie(name: string) {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value || null;
}

/* ----------------------------------------------------
   SET COOKIE
---------------------------------------------------- */

export function setCookie(
  response: NextResponse,
  name: string,
  value: string,
  options?: {
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: "lax" | "strict" | "none";
    path?: string;
    maxAge?: number;
  },
) {
  response.cookies.set(name, value, {
    httpOnly: options?.httpOnly ?? true,
    secure: options?.secure ?? process.env.NODE_ENV === "production",
    sameSite: options?.sameSite ?? "lax",
    path: options?.path ?? "/",
    maxAge: options?.maxAge ?? 60 * 60 * 24 * 7,
  });
}

/* ----------------------------------------------------
   DELETE COOKIE
---------------------------------------------------- */

export function deleteCookie(response: NextResponse, name: string) {
  response.cookies.delete(name);
}
