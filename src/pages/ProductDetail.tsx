import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isSale?: boolean;
  category: string;
  colors: string[];
  sizes: string[];
  images: string[];
  description: string;
  features: string[];
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();
  const { toast } = useToast();

  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get<Product>(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchRelated = async () => {
      try {
        const res = await axios.get<Product[]>(`http://localhost:5000/api/products/${id}/related`);
        setRelated(res.data);
      } catch (err) {
        console.error("Error fetching related products:", err);
      }
    };

    fetchProduct();
    fetchRelated();
  }, [id]);

  if (loading) return <div className="p-10 text-center">Loading product details...</div>;
  if (!product) return <div className="p-10 text-center text-xl">Product Not Found</div>;

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast({
        title: "Please select options",
        description: "Select both size and color before adding to cart.",
        variant: "destructive",
      });
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
    });

    toast({ title: "Added to cart!", description: `${product.name} added to your cart.` });
  };

  const isWishlisted = wishlist.some((item) => item.id === product.id);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/shop">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <img src={product.images[selectedImage]} alt={product.name} className="w-full rounded-lg" />
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(i)}>
                  <img src={img} className={`rounded-lg border-2 ${selectedImage === i ? "border-accent" : "border-border"}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Labels */}
            <div className="flex gap-2">
              {product.isNew && <Badge className="bg-accent">New</Badge>}
              {product.isSale && <Badge variant="destructive">Sale</Badge>}
            </div>

            <h1 className="text-3xl font-light">{product.name}</h1>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-accent text-accent" />
              <span>{product.rating} ({product.reviews} reviews)</span>
            </div>

            <div className="flex gap-3">
              <span className="text-2xl font-medium">${product.price}</span>
              {product.originalPrice && <span className="line-through text-muted-foreground">${product.originalPrice}</span>}
            </div>

            {/* Color Selection */}
            <h3 className="font-medium">Colors</h3>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button key={color} onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 border rounded-md ${selectedColor === color ? "border-accent bg-accent/20" : "border-border"}`}>
                  {color}
                </button>
              ))}
            </div>

            {/* Size Selection */}
            <h3 className="font-medium mt-4">Sizes</h3>
            <div className="grid grid-cols-5 gap-2">
              {product.sizes.map((size) => (
                <button key={size} onClick={() => setSelectedSize(size)}
                  className={`py-3 border rounded-md ${selectedSize === size ? "border-accent bg-accent/20" : "border-border"}`}>
                  {size}
                </button>
              ))}
            </div>

            {/* Add to Cart + Wishlist */}
            <div className="flex gap-4 mt-4">
              <Button onClick={handleAddToCart} className="flex-1 bg-accent text-white">Add to Cart</Button>
              <Button variant="outline" onClick={() => toggleWishlist({ ...product, image: product.images[0] })}>
                <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-medium">Description</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-medium">Features</h3>
              <ul className="list-disc ml-5">
                {product.features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl mb-6">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((p) => (
                <Link key={p.id} to={`/product/${p.id}`} className="block border rounded-lg overflow-hidden">
                  <img src={p.images[0]} alt={p.name} className="w-full h-48 object-cover" />
                  <div className="p-3">
                    <h4 className="font-medium">{p.name}</h4>
                    <span className="text-sm">${p.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
