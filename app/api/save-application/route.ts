import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { COOKIE_NAMES } from "@/lib/constants";
import { getCookie } from "@/lib/cookiesStorage";

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

    console.log("Vimal, Received form data:", formData);

    const rawData = formData.get("data") as string;

    if (!rawData) {
      return NextResponse.json(
        { success: false, message: "Invalid request" },
        { status: 400 },
      );
    }

    const parsed = JSON.parse(rawData);

    const {
      applicationId,
      personalInfo,
      loanDetails,
      kycDetails,
      payment,
      status,
    } = parsed;

    const uploadDir = path.join(process.cwd(), "public/uploads");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const saveFile = async (file: File | null, existingPath?: string) => {
      if (!file || file.size === 0) {
        return existingPath || null;
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uniqueName = Date.now() + "-" + file.name;

      const filePath = path.join(uploadDir, uniqueName);

      fs.writeFileSync(filePath, buffer);

      return `/uploads/${uniqueName}`;
    };

    const jsonPath = path.join(process.cwd(), "data/applications.json");

    if (!fs.existsSync(path.dirname(jsonPath))) {
      fs.mkdirSync(path.dirname(jsonPath), { recursive: true });
    }

    let applications: any[] = [];

    if (fs.existsSync(jsonPath)) {
      applications = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
    }

    let index = -1;

    if (applicationId) {
      index = applications.findIndex(
        (app) => app.id === applicationId && app.userId === userId,
      );
    }

    /**
     * HANDLE FILE UPLOADS
     */

    let updatedLoanDetails = loanDetails;

    if (loanDetails) {
      updatedLoanDetails = {
        ...loanDetails,
        bankStatementPath: await saveFile(
          formData.get("bankStatement") as File,
          loanDetails?.bankStatementPath,
        ),
      };
    }

    let updatedKycDetails = kycDetails;

    if (kycDetails) {
      updatedKycDetails = {
        ...kycDetails,
        aadharFrontPath: await saveFile(
          formData.get("aadharFront") as File,
          kycDetails?.aadharFrontPath,
        ),
        aadharBackPath: await saveFile(
          formData.get("aadharBack") as File,
          kycDetails?.aadharBackPath,
        ),
        panFilePath: await saveFile(
          formData.get("panFile") as File,
          kycDetails?.panFilePath,
        ),
      };
    }

    let finalId = applicationId;

    /**
     * CREATE NEW APPLICATION (STEP1)
     */

    if (!applicationId || index === -1) {
      finalId = randomUUID();

      const newApplication = {
        id: finalId,
        userId,
        personalInfo: personalInfo || {},
        loanDetails: updatedLoanDetails || {},
        kycDetails: updatedKycDetails || {},
        payment: payment || {},
        status: status || "draft",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      applications.push(newApplication);
    } else {
      /**
       * UPDATE EXISTING APPLICATION
       */

      const existing = applications[index];

      applications[index] = {
        ...existing,
        personalInfo: personalInfo ?? existing.personalInfo,
        loanDetails: updatedLoanDetails ?? existing.loanDetails,
        kycDetails: updatedKycDetails ?? existing.kycDetails,
        payment: payment ?? existing.payment,
        status: status ?? existing.status,
        updatedAt: new Date().toISOString(),
      };
    }

    fs.writeFileSync(jsonPath, JSON.stringify(applications, null, 2));

    return NextResponse.json({
      success: true,
      applicationId: finalId,
    });
  } catch (error) {
    console.error("Save Application Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Error saving application",
      },
      { status: 500 },
    );
  }
}
