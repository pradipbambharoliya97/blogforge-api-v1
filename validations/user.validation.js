import { z } from "zod";

import {
  emailField,
  firstNameField,
  lastNameField,
  passwordField,
  paramsIdSchema,
} from "./common.validation.js";

// Register user
export const registerUserSchema = z.strictObject({
  firstname: firstNameField,
  lastname: lastNameField,
  email: emailField,
  password: passwordField,
});

// Login user
export const loginUserSchema = z.strictObject({
  email: emailField,
  password: passwordField,
});

// Update user profile
export const updateUserProfileSchema = z.strictObject({
  firstname: firstNameField,
  lastname: lastNameField,
  email: emailField,
});

// Update user password
export const updateUserPasswordSchema = z.strictObject({
  password: passwordField,
});

// Validate route params
export { paramsIdSchema };
