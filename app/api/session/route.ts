import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  const session = req.cookies.get("session");

  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const filePath = path.join(process.cwd(), "data/applications.json");

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const file = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(file);

  const user = data.find((item: any) => item.id === session.value);

  if (!user) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    name: user.signup.name,
    applicationId: user.id,
    status: user.status,
  });
}
