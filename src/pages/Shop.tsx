import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Filter, Grid, List, Heart, Star } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { API_BASE_URL } from "@/config"; // ✅ import config

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isSale?: boolean;
  image?: string;
  images?: string[];
}

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { wishlist, toggleWishlist } = useWishlist();
  const { toast } = useToast();

  const categories = [
    { id: "all", name: "All Items" },
    { id: "tops", name: "Tops" },
    { id: "dresses", name: "Dresses" },
    { id: "bottoms", name: "Bottoms" },
    { id: "outerwear", name: "Outerwear" },
    { id: "accessories", name: "Accessories" },
  ];

  // ✅ Fetch products dynamically from backend using API_BASE_URL
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get<Product[]>(`${API_BASE_URL}/api/products`);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  if (loading) return <div className="text-center py-10">Loading products...</div>;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-light text-primary mb-4">Shop Collection</h1>
          <p className="text-lg text-muted-foreground">Discover our carefully curated selection of timeless pieces</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="w-full lg:w-64 space-y-6">
            <h3 className="text-lg font-medium text-primary mb-4">Categories</h3>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  selectedCategory === category.id
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-primary hover:bg-accent/10"
                }`}
              >
                {category.name}
              </button>
            ))}

            <div>
              <h3 className="text-lg font-medium text-primary mb-4">Filters</h3>
              <Button variant="outline" className="w-full justify-start">
                <Filter className="mr-2 h-4 w-4" /> All Filters
              </Button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {filteredProducts.length} products
              </p>
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <p>No products found in this category.</p>
            ) : (
              <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
                {filteredProducts.map((product) => {
                  const isWishlisted = wishlist.some((item) => item.id === product.id);
                  return (
                    <Card key={product.id} className="group hover-lift border-0 bg-card">
                      <CardContent className="p-0">
                        <Link to={`/product/${product.id}`}>
                          <div className="relative overflow-hidden rounded-t-lg">
                            <img
                              src={product.images?.[0] || product.image}
                              alt={product.name}
                              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute top-4 left-4 flex flex-col gap-2">
                              {product.isNew && <Badge className="bg-accent text-accent-foreground">New</Badge>}
                              {product.isSale && <Badge variant="destructive">Sale</Badge>}
                            </div>

                            {/* Wishlist */}
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                toggleWishlist({ ...product, image: product.images?.[0] || product.image });
                                toast({
                                  title: isWishlisted ? "Removed from Wishlist" : "Added to Wishlist",
                                  description: `${product.name} has been ${isWishlisted ? "removed" : "added"} to your wishlist.`,
                                });
                              }}
                              className="absolute top-4 right-4 p-2 bg-background/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            >
                              <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
                            </button>
                          </div>
                        </Link>

                        <div className="p-4">
                          <Link to={`/product/${product.id}`}>
                            <h3 className="font-medium text-primary mb-2 hover:text-accent transition-colors">{product.name}</h3>
                          </Link>

                          <div className="flex items-center gap-2 mb-2">
                            <Star className="h-4 w-4 fill-accent text-accent" />
                            <span className="text-sm text-muted-foreground ml-1">{product.rating} ({product.reviews})</span>
                          </div>

                          <div className="flex items-center gap-2 mb-3">
                            <span className="font-medium text-primary">${product.price}</span>
                            {product.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                            )}
                          </div>

                          <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                            <Link to={`/product/${product.id}`}>View Details</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
