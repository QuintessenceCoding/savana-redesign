import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Sparkles, Heart, Star } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';
import collection1 from '@/assets/collection-1.jpg';
import collection2 from '@/assets/collection-2.jpg';

const Home = () => {
  const features = [
    {
      icon: <Sparkles className="h-6 w-6 text-accent" />,
      title: "Trendy & Timeless",
      description: "Pieces that transcend seasons and trends"
    },
    {
      icon: <Heart className="h-6 w-6 text-accent" />,
      title: "Soft Femininity",
      description: "Delicate designs with an urban edge"
    },
    {
      icon: <Star className="h-6 w-6 text-accent" />,
      title: "Premium Quality",
      description: "Crafted with attention to every detail"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
         
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 fade-in-up">
          <h1 className="text-5xl md:text-7xl font-light text-primary mb-6 leading-tight">
            Elegance
            <span className="block text-accent font-medium">Redefined</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-800 drop-shadow-sm mb-8 max-w-2xl mx-auto">
            Discover our collection of trendy yet timeless pieces, where soft femininity meets urban sophistication.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/shop">
                Shop Collection
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/lookbook">View Lookbook</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-primary mb-4">
              The Savana Difference
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every piece is thoughtfully designed to empower and inspire confidence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 bg-background hover-lift">
                <CardContent className="p-8 text-center">
                  <div className="mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-medium text-primary mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-primary mb-4">
              Featured Collections
            </h2>
            <p className="text-lg text-muted-foreground">
              Curated pieces for the modern woman
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group cursor-pointer hover-lift">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img 
                  src={collection1} 
                  alt="Spring Collection" 
                  className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-2xl font-medium text-primary mb-2">Spring Essentials</h3>
              <p className="text-muted-foreground mb-4">
                Light, airy pieces perfect for the season ahead
              </p>
              <Button asChild variant="outline" className="elegant-underline">
                <Link to="/shop">Explore Collection</Link>
              </Button>
            </div>
            
            <div className="group cursor-pointer hover-lift">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img 
                  src={collection2} 
                  alt="Urban Edge Collection" 
                  className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-2xl font-medium text-primary mb-2">Urban Edge</h3>
              <p className="text-muted-foreground mb-4">
                Bold statements for the modern city dweller
              </p>
              <Button asChild variant="outline" className="elegant-underline">
                <Link to="/shop">Explore Collection</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-accent/10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-light text-primary mb-4">
            Stay in the Loop
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Be the first to know about new collections, exclusive offers, and style inspiration
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-accent bg-background"
            />
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;