import { Request, Response } from "express";
import products from "../data/products.json";

export const getProducts = (req: Request, res: Response) => {
  res.json(products);
};

export const getProductById = (req: Request, res: Response) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);
  if (product) res.json(product);
  else res.status(404).json({ message: "Product not found" });
};

export const addProduct = (req: Request, res: Response) => {
  const newProduct = { id: products.length + 1, ...req.body };
  (products as any).push(newProduct); // simple push (no DB)
  res.status(201).json(newProduct);
};

export const updateProduct = (req: Request, res: Response) => {
  const productId = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === productId);
  if (index === -1) return res.status(404).json({ message: "Product not found" });

  (products as any)[index] = { ...products[index], ...req.body };
  res.json(products[index]);
};

export const deleteProduct = (req: Request, res: Response) => {
  const productId = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === productId);
  if (index === -1) return res.status(404).json({ message: "Product not found" });

  (products as any).splice(index, 1);
  res.json({ message: "Product deleted" });
};
