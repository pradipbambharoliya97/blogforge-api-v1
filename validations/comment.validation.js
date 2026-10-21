import { z } from "zod";

import { paramsIdSchema } from "./common.validation.js";

// Common comment description validation
export const commentDescriptionField = z
  .string({ error: "Comment description is required" })
  .trim()
  .min(1, { error: "Comment description cannot be empty" });

// Create comment schema
export const createCommentSchema = z.strictObject({
  description: commentDescriptionField,
});

// Update comment schema
export const updateCommentSchema = z.strictObject({
  description: commentDescriptionField,
});

// Validate route params
export { paramsIdSchema };
