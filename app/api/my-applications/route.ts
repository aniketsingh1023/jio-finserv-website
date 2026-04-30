import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { COOKIE_NAMES, FILE_PATHS, API_MESSAGES } from "@/lib/constants";
import { getCookie } from "@/lib/cookiesStorage";

export async function GET(req: NextRequest) {
  const cookiesUserId = await getCookie(COOKIE_NAMES.USER_ID);

  if (!cookiesUserId) {
    return NextResponse.json(
      { success: false, message: API_MESSAGES.UNAUTHORIZED },
      { status: 401 },
    );
  }
  const filePath = path.join(process.cwd(), "data/applications.json");

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({
      success: true,
      applications: [],
    });
  }

  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const userApplications = data.filter(
    (app: any) => app.userId === cookiesUserId,
  );

  return NextResponse.json({
    success: true,
    applications: userApplications,
  });
}
