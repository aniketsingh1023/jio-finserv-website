import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";

import { FILE_PATHS } from "./constants";
import { UserRegistrationPasswordDto } from "@/types/userRegistration";

const filePath = path.join(process.cwd(), FILE_PATHS.REGISTRATION_DATA);

/* -------------------------
   Read users from JSON DB
-------------------------- */
export function getUsers(): UserRegistrationPasswordDto[] {
  if (!fs.existsSync(filePath)) return [];

  const data = fs.readFileSync(filePath, "utf-8");

  if (!data) return [];

  return JSON.parse(data);
}

/* -------------------------
   Save users to JSON DB
-------------------------- */
export function saveUsers(users: UserRegistrationPasswordDto[]) {
  const dir = path.dirname(filePath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

/* -------------------------
   Find user by email
-------------------------- */
export function findUserByEmail(email: string) {
  const users = getUsers();

  const normalizedEmail = email.trim().toLowerCase();

  return users.find((user) => user.email?.toLowerCase() === normalizedEmail);
}

/* -------------------------
   Verify password
-------------------------- */
export async function verifyPassword(
  plainPassword: string,
  hashedPassword: string,
) {
  return bcrypt.compare(plainPassword, hashedPassword);
}
