import { z } from "zod";

import { objectIdField, paramsIdSchema } from "./common.validation.js";

// Common post fields validation
export const postTitleField = z
  .string({ error: "Post title is required" })
  .trim()
  .min(2, { error: "Post title must be at least 2 characters long" });

export const postDescriptionField = z
  .string({ error: "Post description is required" })
  .trim()
  .min(2, { error: "Post description must be at least 2 characters long" });

export const postCategoryField = objectIdField;

// Create post schema
export const createPostSchema = z.strictObject({
  title: postTitleField,
  description: postDescriptionField,
  category: postCategoryField,
});

// Update post schema
export const updatePostSchema = z
  .strictObject({
    title: postTitleField.optional(),
    description: postDescriptionField.optional(),
    category: postCategoryField.optional(),
  })
  .refine(
    (data) =>
      data.title !== undefined ||
      data.description !== undefined ||
      data.category !== undefined,
    {
      message:
        "At least one field (title, description, or category) must be provided",
      path: ["body"],
    },
  );

// Validate route params
export { paramsIdSchema };
