import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Filter, Grid, List, Heart, Star } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext'; // ✅ Import wishlist context
import { useToast } from '@/hooks/use-toast';


const Shop = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { wishlist, toggleWishlist } = useWishlist(); // ✅ Access wishlist
  const { toast } = useToast();
  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'tops', name: 'Tops' },
    { id: 'dresses', name: 'Dresses' },
    { id: 'bottoms', name: 'Bottoms' },
    { id: 'outerwear', name: 'Outerwear' },
    { id: 'accessories', name: 'Accessories' }
  ];

  const products = [
    {
      id: 1,
      name: 'Silk Wrap Blouse',
      category: 'tops',
      price: 128,
      originalPrice: 160,
      rating: 4.8,
      reviews: 24,
      isNew: true,
      isSale: true,
      colors: ['Cream', 'Blush', 'Sage'],
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500'
    },
    {
      id: 2,
      name: 'Flowing Midi Dress',
      category: 'dresses',
      price: 185,
      rating: 4.9,
      reviews: 18,
      isNew: true,
      colors: ['Ivory', 'Dusty Rose'],
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500'
    },
    {
      id: 3,
      name: 'Tailored Palazzo Pants',
      category: 'bottoms',
      price: 145,
      rating: 4.7,
      reviews: 31,
      colors: ['Charcoal', 'Cream', 'Olive'],
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500'
    },
    {
      id: 4,
      name: 'Cashmere Cardigan',
      category: 'outerwear',
      price: 220,
      originalPrice: 280,
      rating: 5.0,
      reviews: 12,
      isSale: true,
      colors: ['Oatmeal', 'Sage', 'Blush'],
      image: 'https://images.unsplash.com/photo-1583846835788-5a417f2e6103?w=500'
    },
    {
      id: 5,
      name: 'Delicate Gold Necklace',
      category: 'accessories',
      price: 85,
      rating: 4.6,
      reviews: 45,
      colors: ['Gold'],
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500'
    },
    {
      id: 6,
      name: 'Linen Button-Down',
      category: 'tops',
      price: 98,
      rating: 4.8,
      reviews: 29,
      isNew: true,
      colors: ['White', 'Natural', 'Sage'],
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500'
    }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-light text-primary mb-4">Shop Collection</h1>
          <p className="text-lg text-muted-foreground">
            Discover our carefully curated selection of timeless pieces
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="w-full lg:w-64 space-y-6">
            <div>
              <h3 className="text-lg font-medium text-primary mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-accent text-accent-foreground'
                        : 'text-muted-foreground hover:text-primary hover:bg-accent/10'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-primary mb-4">Filters</h3>
              <Button variant="outline" className="w-full justify-start">
                <Filter className="mr-2 h-4 w-4" />
                All Filters
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* View Controls */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {filteredProducts.length} products
              </p>
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map((product) => {
                const isWishlisted = wishlist.some(item => item.id === product.id); // ✅ check if in wishlist

                return (
                  <Card key={product.id} className="group hover-lift border-0 bg-card">
                    <CardContent className="p-0">
                      <Link to={`/product/${product.id}`}>
                        <div className="relative overflow-hidden rounded-t-lg">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-64 sm:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute top-4 left-4 flex flex-col gap-2">
                            {product.isNew && (
                              <Badge className="bg-accent text-accent-foreground">New</Badge>
                            )}
                            {product.isSale && (
                              <Badge variant="destructive">Sale</Badge>
                            )}
                          </div>
                          {/* ✅ Heart button with toggleWishlist */}
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              toggleWishlist(product);
                              toast({
                            title: isWishlisted ? "Removed from Wishlist" : "Added to Wishlist",
                            description: `${product.name} has been ${isWishlisted ? "removed" : "added"} to your wishlist.`,
                            });
                            }}
                            className="absolute top-4 right-4 p-2 bg-background/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          >
                            <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
                          </button>
                        </div>
                      </Link>
                      
                      <div className="p-4">
                        <Link to={`/product/${product.id}`}>
                          <h3 className="font-medium text-primary mb-2 hover:text-accent transition-colors">
                            {product.name}
                          </h3>
                        </Link>
                        
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-accent text-accent" />
                            <span className="text-sm text-muted-foreground ml-1">
                              {product.rating} ({product.reviews})
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-3">
                          <span className="font-medium text-primary">${product.price}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-xs text-muted-foreground">Colors:</span>
                          {product.colors.map((color, index) => (
                            <div
                              key={index}
                              className="w-4 h-4 rounded-full border border-border bg-muted"
                              title={color}
                            ></div>
                          ))}
                        </div>
                        
                        <Button 
                          className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                          asChild
                        >
                          <Link to={`/product/${product.id}`}>
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
