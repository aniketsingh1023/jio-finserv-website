import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

import { getCookie } from "@/lib/cookiesStorage";
import { COOKIE_NAMES, FILE_PATHS } from "@/lib/constants";
import { getUsers, saveUsers } from "@/lib/auth";
import { UserRegistrationPasswordDto } from "@/types/userRegistration";

export async function POST(req: NextRequest) {
  try {
    const userId = await getCookie(COOKIE_NAMES.USER_ID);

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    /* -------------------------------
       Validate file existence
    -------------------------------- */

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file uploaded" },
        { status: 400 },
      );
    }

    /* -------------------------------
       Validate MIME type
    -------------------------------- */

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { success: false, message: "Only image files allowed" },
        { status: 400 },
      );
    }

    /* -------------------------------
       Validate file size (2MB)
    -------------------------------- */

    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: "Image must be under 2MB" },
        { status: 400 },
      );
    }

    /* -------------------------------
       Ensure upload directory exists
    -------------------------------- */

    const uploadDir = path.join(process.cwd(), FILE_PATHS.PROFILE_UPLOAD_DIR);

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    /* -------------------------------
       Safe extension handling
    -------------------------------- */

    const ext = file.name.split(".").pop() || "jpg";
    const fileName = `${userId}.${ext}`;

    const filePath = path.join(uploadDir, fileName);

    const buffer = Buffer.from(await file.arrayBuffer());

    fs.writeFileSync(filePath, buffer);

    /* -------------------------------
       Update user profile image
    -------------------------------- */

    const users = getUsers();

    const index = users.findIndex(
      (u: UserRegistrationPasswordDto) => u.id === userId,
    );

    if (index === -1) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    users[index].profilePic = `/uploads/profilePic/${fileName}`;

    saveUsers(users);

    return NextResponse.json({
      success: true,
      profilePic: `/uploads/profilePic/${fileName}`,
    });
  } catch (error) {
    console.error("Profile image upload error:", error);

    return NextResponse.json(
      { success: false, message: "Upload failed" },
      { status: 500 },
    );
  }
}
