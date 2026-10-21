import { z } from "zod";

export const emailField = z
  .email({ error: "Please provide a valid email address" })
  .transform((value) => value.trim().toLowerCase());

// Common name validation
export const firstNameField = z
  .string()
  .trim()
  .min(2, { error: "First name must be at least 2 characters long" });

export const lastNameField = z
  .string()
  .trim()
  .min(2, { error: "Last name must be at least 2 characters long" });

// Common password validation
export const passwordField = z
  .string()
  .min(5, { error: "Password must be at least 5 characters long" });

// Common MongoDB ObjectId validation
export const objectIdField = z.string().regex(/^[a-fA-F0-9]{24}$/, {
  error: "Invalid ID. Please provide a valid MongoDB ObjectId.",
});

// Alias for backward compatibility
export const paramsIdField = objectIdField;

// Common MongoDB ObjectId route params schema
export const paramsIdSchema = z.strictObject({
  id: objectIdField,
});
