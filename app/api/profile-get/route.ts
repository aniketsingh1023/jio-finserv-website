import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { UserRegistrationDto } from "@/types/userRegistration";
import { COOKIE_NAMES, FILE_PATHS, API_MESSAGES } from "@/lib/constants";
import { getCookie } from "@/lib/cookiesStorage";

export async function GET(req: NextRequest) {
  try {
    /* get session cookie */

    const cookiesUserId = await getCookie(COOKIE_NAMES.USER_ID);

    if (!cookiesUserId) {
      return NextResponse.json(
        { success: false, message: API_MESSAGES.UNAUTHORIZED },
        { status: 401 },
      );
    }

    const userId = cookiesUserId;

    /* locate users file */

    const filePath = path.join(process.cwd(), FILE_PATHS.REGISTRATION_DATA);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { success: false, message: API_MESSAGES.DB_NOT_FOUND },
        { status: 500 },
      );
    }

    /* read users */

    const users: UserRegistrationDto[] = JSON.parse(
      fs.readFileSync(filePath, "utf-8"),
    );

    const user = users.find((u: UserRegistrationDto) => u.id === userId);

    if (!user) {
      return NextResponse.json(
        { success: false, message: API_MESSAGES.USER_NOT_FOUND },
        { status: 404 },
      );
    }

    /* remove password before returning */
    // const { password, confirmPassword, ...safeUser } = user;

    return NextResponse.json({
      success: true,
      // user: safeUser,
      user: user,
    });
  } catch (error) {
    console.error("Profile API error:", error);

    return NextResponse.json(
      { success: false, message: API_MESSAGES.PROFILE_FETCH_ERROR },
      { status: 500 },
    );
  }
}
