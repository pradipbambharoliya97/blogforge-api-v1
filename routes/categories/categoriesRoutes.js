const express = require("express");
const {
  createCategoriesCtrl,
  deleteCategoriesCtrl,
  updateCategoriesCtrl,
  categoryDetailsCtrl,
  getAllCategoriesCtrl,
} = require("../../controllers/categories/categoriesControllers");
const isLogin = require("../../middlewares/isLogin");
const { validate } = require("../../middlewares/validate.js");
const {
  createCategorySchema,
  updateCategorySchema,
  paramsIdSchema,
} = require("../../validations/category.validation.js");

const categoriesRoutes = express.Router();

categoriesRoutes.post(
  "/",
  isLogin,
  validate(createCategorySchema),
  createCategoriesCtrl,
);

categoriesRoutes.get("/", isLogin, getAllCategoriesCtrl);

categoriesRoutes.get(
  "/:id",
  isLogin,
  validate(paramsIdSchema, "params"),
  categoryDetailsCtrl,
);

categoriesRoutes.delete(
  "/:id",
  isLogin,
  validate(paramsIdSchema, "params"),
  deleteCategoriesCtrl,
);

categoriesRoutes.put(
  "/:id",
  isLogin,
  validate(paramsIdSchema, "params"),
  validate(updateCategorySchema),
  updateCategoriesCtrl,
);

module.exports = categoriesRoutes;
