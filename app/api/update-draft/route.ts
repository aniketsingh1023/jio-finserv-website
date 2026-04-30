import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    // 🔹 1. Check session
    const session = req.cookies.get("session");

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const userId = session.value;

    // 🔹 2. Parse request body
    const body = await req.json();
    const { applicationId, loanDetails, kycDetails, payment, status } = body;

    if (!applicationId) {
      return NextResponse.json(
        { success: false, message: "Application ID required" },
        { status: 400 },
      );
    }

    // 🔹 3. Load applications.json
    const filePath = path.join(process.cwd(), "data/applications.json");

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { success: false, message: "No applications found" },
        { status: 404 },
      );
    }

    const file = fs.readFileSync(filePath, "utf-8");
    const applications = JSON.parse(file);

    // 🔹 4. Find application by id + ownership
    const index = applications.findIndex(
      (item: any) => item.id === applicationId && item.userId === userId,
    );

    if (index === -1) {
      return NextResponse.json(
        { success: false, message: "Application not found" },
        { status: 404 },
      );
    }

    const currentApplication = applications[index];

    // 🔒 5. Prevent editing already submitted applications
    if (currentApplication.status === "submitted") {
      return NextResponse.json(
        {
          success: false,
          message: "Cannot edit submitted application",
        },
        { status: 400 },
      );
    }

    // 🔐 6. Secure status transition (draft → submitted only)
    let newStatus = currentApplication.status;

    if (status === "submitted" && currentApplication.status === "draft") {
      newStatus = "submitted";
    }

    // 🔹 7. Update allowed fields only
    applications[index] = {
      ...currentApplication,
      loanDetails: loanDetails ?? currentApplication.loanDetails,
      kycDetails: kycDetails ?? currentApplication.kycDetails,
      payment: payment ?? currentApplication.payment,
      status: newStatus,
      updatedAt: new Date().toISOString(),
    };

    // 🔹 8. Save file
    fs.writeFileSync(filePath, JSON.stringify(applications, null, 2));

    return NextResponse.json({
      success: true,
      status: newStatus,
    });
  } catch (error) {
    console.error("Update Draft Error:", error);

    return NextResponse.json(
      { success: false, message: "Update failed" },
      { status: 500 },
    );
  }
}
