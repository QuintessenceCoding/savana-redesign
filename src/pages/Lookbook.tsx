import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Share2, Instagram } from 'lucide-react';

const Lookbook = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Looks' },
    { id: 'spring', name: 'Spring Edit' },
    { id: 'urban', name: 'Urban Edge' },
    { id: 'evening', name: 'Evening' },
    { id: 'casual', name: 'Everyday' }
  ];

  const looks = [
    {
      id: 1,
      title: "Urban Sophistication",
      category: 'urban',
      description: "Tailored blazer meets flowing silk pants for the perfect city look",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop",
      items: ["Silk Wrap Blouse", "Tailored Palazzo Pants", "Delicate Gold Necklace"],
      likes: 342,
      isLiked: false
    },
    {
      id: 2,
      title: "Soft Spring Morning",
      category: 'spring',
      description: "Embrace the season with flowing fabrics and pastel tones",
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop",
      items: ["Flowing Midi Dress", "Cashmere Cardigan", "Minimal Sandals"],
      likes: 289,
      isLiked: true
    },
    {
      id: 3,
      title: "Evening Elegance",
      category: 'evening',
      description: "Timeless pieces for special moments",
      image: "https://images.unsplash.com/photo-1583846835788-5a417f2e6103?w=600&h=800&fit=crop",
      items: ["Black Silk Dress", "Statement Earrings", "Structured Blazer"],
      likes: 456,
      isLiked: false
    },
    {
      id: 4,
      title: "Casual Chic",
      category: 'casual',
      description: "Effortless style for everyday adventures",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=800&fit=crop",
      items: ["Linen Button-Down", "Wide-Leg Jeans", "Canvas Tote"],
      likes: 201,
      isLiked: false
    },
    {
      id: 5,
      title: "Garden Party Ready",
      category: 'spring',
      description: "Feminine details perfect for outdoor gatherings",
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop",
      items: ["Floral Print Dress", "Straw Hat", "Nude Flats"],
      likes: 378,
      isLiked: true
    },
    {
      id: 6,
      title: "Modern Minimalist",
      category: 'urban',
      description: "Clean lines and neutral tones for the contemporary woman",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop",
      items: ["Knit Sweater", "Straight-Leg Trousers", "Leather Bag"],
      likes: 267,
      isLiked: false
    }
  ];

  const filteredLooks = selectedCategory === 'all' 
    ? looks 
    : looks.filter(look => look.category === selectedCategory);

  const [likedLooks, setLikedLooks] = useState(new Set(looks.filter(look => look.isLiked).map(look => look.id)));

  const toggleLike = (lookId: number) => {
    const newLikedLooks = new Set(likedLooks);
    if (newLikedLooks.has(lookId)) {
      newLikedLooks.delete(lookId);
    } else {
      newLikedLooks.add(lookId);
    }
    setLikedLooks(newLikedLooks);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-light text-primary mb-4">
              Style Inspiration
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover how to style our pieces for every occasion. From everyday elegance to special moments, find your perfect look.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={selectedCategory === category.id ? "bg-accent text-accent-foreground" : ""}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Looks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLooks.map((look) => (
            <Card key={look.id} className="group overflow-hidden border-0 bg-card hover-lift">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={look.image}
                    alt={look.title}
                    className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Overlay Actions */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => toggleLike(look.id)}
                      className="p-2 bg-background/80 rounded-full"
                    >
                      <Heart 
                        className={`h-4 w-4 ${
                          likedLooks.has(look.id) 
                            ? 'fill-red-500 text-red-500' 
                            : 'text-muted-foreground'
                        }`} 
                      />
                    </button>
                    <button className="p-2 bg-background/80 rounded-full">
                      <Share2 className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </div>

                  {/* Bottom Overlay Info */}
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-white">
                      <h3 className="font-medium mb-1">{look.title}</h3>
                      <p className="text-sm text-white/80">{look.description}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-medium text-primary mb-2">{look.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{look.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-primary mb-2">Featured Items:</h4>
                    <ul className="space-y-1">
                      {look.items.map((item, index) => (
                        <li key={index} className="text-sm text-muted-foreground">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Heart 
                        className={`h-4 w-4 ${
                          likedLooks.has(look.id) 
                            ? 'fill-red-500 text-red-500' 
                            : 'text-muted-foreground'
                        }`} 
                      />
                      <span className="text-sm text-muted-foreground">
                        {likedLooks.has(look.id) ? look.likes + 1 : look.likes} likes
                      </span>
                    </div>
                    
                    <Button variant="outline" size="sm" className="elegant-underline">
                      Shop the Look
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Instagram Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-light text-primary mb-4">
            Follow Us for Daily Inspiration
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Tag us @savana to be featured in our community
          </p>
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Instagram className="mr-2 h-4 w-4" />
            Follow @savana
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Lookbook;