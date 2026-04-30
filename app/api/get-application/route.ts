import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { COOKIE_NAMES, FILE_PATHS, API_MESSAGES } from "@/lib/constants";
import { getCookie } from "@/lib/cookiesStorage";

export async function GET(req: NextRequest) {
  const cookiesUserId = await getCookie(COOKIE_NAMES.USER_ID);

  if (!cookiesUserId) {
    return NextResponse.json(
      { success: false, message: "Unauthorized, Please login" },
      { status: 401 },
    );
  }

  const { searchParams } = new URL(req.url);
  const appId = searchParams.get("appId");

  if (!appId) {
    return NextResponse.json(
      { success: false, message: "Application ID required" },
      { status: 400 },
    );
  }

  const filePath = path.join(process.cwd(), "data/applications.json");

  if (!fs.existsSync(filePath)) {
    return NextResponse.json(
      { success: false, message: "Not found" },
      { status: 404 },
    );
  }

  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const application = data.find((app: any) => app.id === appId);

  if (!application) {
    return NextResponse.json(
      { success: false, message: "Not found" },
      { status: 404 },
    );
  }

  // 🔐 SECURITY CHECK — Ensure application belongs to logged-in user
  if (application.userId !== cookiesUserId) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized, Application does not belong to you.",
      },
      { status: 401 },
    );
  }

  return NextResponse.json({
    success: true,
    application,
    readOnly: application.status === "submitted",
  });
}
