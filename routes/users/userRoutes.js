const express = require("express");
const {
  userLoginCtrl,
  userProfileCtrl,
  getAllUsersCtrl,
  deleteUserCtrl,
  updateUserProfileCtrl,
  userRegisterCtrl,
  profilePhotoUploadCtrl,
  whoViewMyProfileCtrl,
  followingCtrl,
  unFollowCtrl,
  blockUsersCtrl,
  unBlockUsersCtrl,
  adminBlockUsersCtrl,
  adminUnBlockUsersCtrl,
  updateUserPasswordCtrl,
} = require("../../controllers/users/userControllers.js");
const isLogin = require("../../middlewares/isLogin.js");
const multer = require("multer");
const storage = require("../../config/cloudinary.js");
const isAdmin = require("../../middlewares/isAdmin.js");
const { validate } = require("../../middlewares/validate.js");
const {
  loginUserSchema,
  registerUserSchema,
  updateUserProfileSchema,
  updateUserPasswordSchema,
  paramsIdSchema,
} = require("../../validations/user.validation.js");

const userRouter = express.Router();

// instance of multer
const upload = multer({ storage });

userRouter.post("/register", validate(registerUserSchema), userRegisterCtrl);

userRouter.post("/login", validate(loginUserSchema), userLoginCtrl);

userRouter.get("/profile", isLogin, userProfileCtrl);

// Get all user
userRouter.get("/", getAllUsersCtrl);

// Delete User
userRouter.delete("/", isLogin, deleteUserCtrl);

// Update user profile
userRouter.put(
  "/profile",
  isLogin,
  validate(updateUserProfileSchema),
  updateUserProfileCtrl,
);

// Password Update
userRouter.put(
  "/update-profile-password",
  isLogin,
  validate(updateUserPasswordSchema),
  updateUserPasswordCtrl,
);

// profile-viewers
userRouter.get(
  "/profile-viewers/:id",
  isLogin,
  validate(paramsIdSchema, "params"),
  whoViewMyProfileCtrl,
);

// following
userRouter.get(
  "/following/:id",
  isLogin,
  validate(paramsIdSchema, "params"),
  followingCtrl,
);

userRouter.get(
  "/unfollow/:id",
  isLogin,
  validate(paramsIdSchema, "params"),
  unFollowCtrl,
);

userRouter.get(
  "/block/:id",
  isLogin,
  validate(paramsIdSchema, "params"),
  blockUsersCtrl,
);

userRouter.get(
  "/unblock/:id",
  isLogin,
  validate(paramsIdSchema, "params"),
  unBlockUsersCtrl,
);

userRouter.put(
  "/admin-block/:id",
  isLogin,
  validate(paramsIdSchema, "params"),
  isAdmin,
  adminBlockUsersCtrl,
);

userRouter.put(
  "/admin-unblock/:id",
  isLogin,
  validate(paramsIdSchema, "params"),
  isAdmin,
  adminUnBlockUsersCtrl,
);

userRouter.post(
  "/profile-photo-upload",
  isLogin,
  upload.single("profile"),
  profilePhotoUploadCtrl,
);

module.exports = userRouter;
