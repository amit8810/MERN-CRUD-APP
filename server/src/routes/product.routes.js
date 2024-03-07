import express, { Router } from "express";
import {
  addProduct,
  getProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct
} from "../controllers/product.controller.js";

const router = Router();

router.route("/add").post(addProduct);
router.route("/").get(getProducts);
router.route("/:id").get(getSingleProduct);
router.route("/:id").delete(deleteProduct);
router.route("/:id").patch(updateProduct)

export default router;
