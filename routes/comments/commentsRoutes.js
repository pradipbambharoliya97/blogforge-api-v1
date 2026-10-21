const express = require("express");
const {
  createCommentsCtrl,
  deleteCommentCtrl,
  updateCommentCtrl,
} = require("../../controllers/comments/commentsControllers");
const isLogin = require("../../middlewares/isLogin");
const { validate } = require("../../middlewares/validate.js");
const {
  createCommentSchema,
  updateCommentSchema,
  paramsIdSchema,
} = require("../../validations/comment.validation.js");

const commentsRoutes = express.Router();

commentsRoutes.post(
  "/:id",
  isLogin,
  validate(paramsIdSchema, "params"),
  validate(createCommentSchema),
  createCommentsCtrl,
);

commentsRoutes.delete(
  "/:id",
  isLogin,
  validate(paramsIdSchema, "params"),
  deleteCommentCtrl,
);

commentsRoutes.put(
  "/:id",
  isLogin,
  validate(paramsIdSchema, "params"),
  validate(updateCommentSchema),
  updateCommentCtrl,
);

module.exports = commentsRoutes;
