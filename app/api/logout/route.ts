import { NextResponse } from "next/server";
import { deleteCookie } from "@/lib/cookiesStorage";
import { COOKIE_NAMES } from "@/lib/constants";

export async function GET() {
  const response = NextResponse.json({ success: true });

  deleteCookie(response, COOKIE_NAMES.USER_ID);

  return response;
}
