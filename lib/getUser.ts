import { getUsers } from "./auth";
import { getCookie } from "./cookiesStorage";
import { COOKIE_NAMES } from "./constants";
import { UserRegistrationDto } from "@/types/userRegistration";

export async function getUser(): Promise<UserRegistrationDto | null> {
  const session = await getCookie(COOKIE_NAMES.USER_ID);

  if (!session) return null;

  const users: UserRegistrationDto[] = getUsers();

  const user = users.find((u) => u.id === session);

  if (!user) return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    gender: user.gender,
    dob: user.dob,
    address: user.address,
    city: user.city,
    pincode: user.pincode,
    profilePic: user.profilePic,
    createdAt: user.createdAt,
  };
}
