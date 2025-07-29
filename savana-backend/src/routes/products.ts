import { Router } from "express";
import products from "../data/products.json";

const router = Router();

// GET all products
router.get("/", (req, res) => {
  res.json(products);
});

// GET single product by ID
router.get("/:id", (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  product ? res.json(product) : res.status(404).json({ message: "Product not found" });
});

export default router;
