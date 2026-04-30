import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import { UserRegistrationData } from "@/types/userRegistration";
import { COOKIE_NAMES, FILE_PATHS } from "@/lib/constants";
import { getUsers, saveUsers } from "@/lib/auth";
import { setCookie } from "@/lib/cookiesStorage";

export async function POST(req: NextRequest) {
  try {
    const { signup }: { signup: UserRegistrationData } = await req.json();

    const filePath = path.join(process.cwd(), FILE_PATHS.REGISTRATION_DATA);

    let users: any[] = [];

    if (fs.existsSync(filePath)) {
      // const file = fs.readFileSync(filePath, "utf-8");
      // users = JSON.parse(file);
      users = getUsers();
    }

    const normalizedEmail = signup.email.trim().toLowerCase();
    const normalizedMobile = String(signup.mobile).replace(/\D/g, "");
    const existingUser = users.find(
      (user: any) => user.email?.toLowerCase() === normalizedEmail,
    );

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email already registered" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(signup.password, 10);

    const userId = randomUUID();

    const newUser = {
      id: userId,
      name: signup.name,
      mobile: normalizedMobile,
      email: normalizedEmail,
      gender: signup.gender,
      dob: signup.dob,
      address: signup.address,
      city: signup.city,
      pincode: signup.pincode,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    saveUsers(users);

    // const dir = path.dirname(filePath);
    // if (!fs.existsSync(dir)) {
    //   fs.mkdirSync(dir, { recursive: true });
    // }
    // fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    const response = NextResponse.json({
      success: true,
    });

    setCookie(response, COOKIE_NAMES.USER_ID, userId);

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Registration failed" },
      { status: 500 },
    );
  }
}
