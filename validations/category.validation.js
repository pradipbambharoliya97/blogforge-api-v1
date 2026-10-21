import { z } from "zod";

import { paramsIdSchema } from "./common.validation.js";

// Common category title validation
export const categoryTitleField = z
  .string({ error: "Category title is required" })
  .trim()
  .min(2, { error: "Category title must be at least 2 characters long" });

// Create category schema
export const createCategorySchema = z.strictObject({
  title: categoryTitleField,
});

// Update category schema
export const updateCategorySchema = z.strictObject({
  title: categoryTitleField,
});

// Validate route params
export { paramsIdSchema };
