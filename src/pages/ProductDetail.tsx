import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

// Extended product data
const productDetails = {
  1: {
    id: 1,
    name: 'Silk Wrap Blouse',
    price: 128,
    originalPrice: 160,
    rating: 4.8,
    reviews: 24,
    isNew: true,
    isSale: true,
    colors: ['Cream', 'Blush', 'Sage'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800',
      'https://images.unsplash.com/photo-1583846835788-5a417f2e6103?w=800',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800'
    ],
    description: 'This luxurious silk wrap blouse combines timeless elegance with modern sophistication. Crafted from premium mulberry silk, it features a flattering wrap silhouette that adapts beautifully to your figure. Perfect for both professional and evening occasions.',
    features: [
      '100% Mulberry Silk',
      'Adjustable wrap tie',
      'French seam construction',
      'Dry clean only',
      'Made in Italy'
    ]
  },
  2: {
    id: 2,
    name: 'Flowing Midi Dress',
    price: 185,
    originalPrice: undefined,
    rating: 4.9,
    reviews: 18,
    isNew: true,
    isSale: false,
    colors: ['Ivory', 'Dusty Rose'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800'
    ],
    description: 'A beautifully flowing midi dress that embodies effortless elegance. The soft, breathable fabric moves gracefully with every step, while the classic silhouette ensures timeless appeal.',
    features: [
      'Flowing midi length',
      'Comfortable stretch fabric',
      'Hidden side zipper',
      'Machine washable',
      'Ethically made'
    ]
  },
  3: {
    id: 3,
    name: 'Tailored Palazzo Pants',
    price: 145,
    originalPrice: undefined,
    rating: 4.7,
    reviews: 31,
    isNew: false,
    isSale: false,
    colors: ['Charcoal', 'Cream', 'Olive'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800'
    ],
    description: 'These expertly tailored palazzo pants offer the perfect balance of comfort and sophistication. The wide-leg silhouette creates an elongating effect while the high-waisted design flatters every figure.',
    features: [
      'High-waisted design',
      'Wide-leg silhouette',
      'Premium stretch fabric',
      'Side pockets',
      'Professional finish'
    ]
  }
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const { toast } = useToast();
  
  const product = productDetails[parseInt(id || '1') as keyof typeof productDetails];
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Product Not Found</h1>
          <Link to="/shop" className="text-accent hover:underline">
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast({
        title: "Please select options",
        description: "Please select both size and color before adding to cart.",
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

    toast({
      title: "Added to cart!",
      description: `${product.name} in ${selectedColor}, size ${selectedSize} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/shop">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shop
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-muted">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                      selectedImage === index ? 'border-accent' : 'border-border'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {product.isNew && (
                  <Badge className="bg-accent text-accent-foreground">New</Badge>
                )}
                {product.isSale && (
                  <Badge variant="destructive">Sale</Badge>
                )}
              </div>
              
              <h1 className="text-3xl font-light text-primary mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-accent text-accent" />
                  <span className="text-sm text-muted-foreground ml-1">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl font-medium text-primary">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-sm font-medium text-primary mb-3">Color</h3>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded-md transition-colors ${
                      selectedColor === color
                        ? 'border-accent bg-accent/10 text-accent'
                        : 'border-border text-muted-foreground hover:border-accent/50'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-sm font-medium text-primary mb-3">Size</h3>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 border rounded-md transition-colors ${
                      selectedSize === size
                        ? 'border-accent bg-accent/10 text-accent'
                        : 'border-border text-muted-foreground hover:border-accent/50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-4">
              <Button 
                onClick={handleAddToCart}
                className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                size="lg"
              >
                Add to Cart
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-medium text-primary mb-3">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-medium text-primary mb-3">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-muted-foreground">
                    • {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;