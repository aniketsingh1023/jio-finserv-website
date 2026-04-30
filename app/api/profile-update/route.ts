import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "@/lib/cookiesStorage";
import { COOKIE_NAMES } from "@/lib/constants";
import { getUsers, saveUsers } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const userId = await getCookie(COOKIE_NAMES.USER_ID);

    if (!userId)
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );

    const body = await req.json();

    const users = getUsers();

    const index = users.findIndex((u: any) => u.id === userId);

    if (index === -1)
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );

    const user = users[index];

    user.name = body.name ?? user.name;
    user.mobile = body.mobile ?? user.mobile;
    user.gender = body.gender ?? user.gender;
    user.dob = body.dob ?? user.dob;
    user.address = body.address ?? user.address;
    user.city = body.city ?? user.city;
    user.pincode = body.pincode ?? user.pincode;

    users[index] = user;

    saveUsers(users);

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, message: "Profile update failed" },
      { status: 500 },
    );
  }
}
