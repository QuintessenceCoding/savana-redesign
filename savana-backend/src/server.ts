import express from "express";
import cors from "cors";
import products from "./data/products.json";

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Savana Backend is running 🚀");
});

// ✅ Get all products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// ✅ Get product by ID
app.get("/api/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

// ✅ Get related products by ID (same category, excluding current product)
app.get("/api/products/:id/related", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const related = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  res.json(related.slice(0, 4)); // limit to 4
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
