import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import { findUserByEmail, verifyPassword } from "@/lib/auth";
import { COOKIE_NAMES, FILE_PATHS } from "@/lib/constants";
import { LoginDto } from "@/types/userRegistration";
import { setCookie } from "@/lib/cookiesStorage";

export async function POST(req: NextRequest) {
  try {
    const { email, password }: LoginDto = await req.json();

    const filePath = path.join(process.cwd(), FILE_PATHS.REGISTRATION_DATA);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { success: false, message: "No users found" },
        { status: 400 },
      );
    }

    const user = findUserByEmail(email);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 },
      );
    }

    const passwordMatch = await verifyPassword(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid password..!" },
        { status: 401 },
      );
    }

    const response = NextResponse.json({
      success: true,
    });

    setCookie(response, COOKIE_NAMES.USER_ID, user.id);

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Login failed" },
      { status: 500 },
    );
  }
}
