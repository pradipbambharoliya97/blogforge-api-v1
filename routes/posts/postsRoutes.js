const express = require("express");
const {
  createPostsCtrl,
  deletePostCtrl,
  getAllPostsCtrl,
  updatePostCtrl,
  toggleLikePostsCtrl,
  toggleDisLikePostsCtrl,
  viewPostsCtrl,
} = require("../../controllers/posts/postsControllers");
const isLogin = require("../../middlewares/isLogin");
const multer = require("multer");
const storage = require("../../config/cloudinary");
const { validate } = require("../../middlewares/validate.js");
const {
  createPostSchema,
  updatePostSchema,
  paramsIdSchema,
} = require("../../validations/post.validation.js");

const postsRouter = express.Router();

const upload = multer({ storage });

postsRouter.post(
  "/",
  isLogin,
  upload.single("image"),
  validate(createPostSchema),
  createPostsCtrl,
);

postsRouter.get("/", isLogin, getAllPostsCtrl);

postsRouter.get(
  "/like/:id",
  isLogin,
  validate(paramsIdSchema, "params"),
  toggleLikePostsCtrl,
);

postsRouter.get(
  "/dislike/:id",
  isLogin,
  validate(paramsIdSchema, "params"),
  toggleDisLikePostsCtrl,
);

postsRouter.get(
  "/view-post/:id",
  isLogin,
  validate(paramsIdSchema, "params"),
  viewPostsCtrl,
);

postsRouter.delete(
  "/:id",
  isLogin,
  validate(paramsIdSchema, "params"),
  deletePostCtrl,
);

postsRouter.put(
  "/:id",
  isLogin,
  validate(paramsIdSchema, "params"),
  validate(updatePostSchema),
  updatePostCtrl,
);

module.exports = postsRouter;
