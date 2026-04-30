/* ------------------------------------------------ */
/* BASE USER FIELDS */
/* ------------------------------------------------ */

export interface BaseUser {
  id: string;
  name: string;
  mobile: number;
  email: string;
  gender: string;
  dob: string;
  address: string;
  city: string;
  pincode: number;
  profilePic?: string;
  createdAt?: string;
  updatedAt?: string;
}

/* ------------------------------------------------ */
/* DATABASE USER (WITH PASSWORD) */
/* ------------------------------------------------ */

export interface UserRegistrationPasswordDto extends BaseUser {
  password: string;
}

/* ------------------------------------------------ */
/* SAFE USER DTO (WITHOUT PASSWORD) */
/* Used in UI / APIs */
/* ------------------------------------------------ */

export type UserRegistrationDto = Omit<UserRegistrationPasswordDto, "password">;

/* ------------------------------------------------ */
/* FORM DATA (REGISTRATION PAGE) */
/* ------------------------------------------------ */

export interface UserRegistrationData extends UserRegistrationPasswordDto {
  confirmPassword: string;
}

/* ------------------------------------------------ */
/* LOGIN */
/* ------------------------------------------------ */

export interface LoginDto {
  email: string;
  password: string;
}
