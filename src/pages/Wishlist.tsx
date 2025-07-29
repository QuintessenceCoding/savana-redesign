import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/contexts/WishlistContext';
import { Heart } from 'lucide-react';

const Wishlist = () => {
  const { wishlist, toggleWishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-light text-primary mb-6">Your Wishlist ❤️</h1>

        {wishlist.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-lg text-muted-foreground mb-6">
              Your wishlist is empty. Start adding your favorite items!
            </p>
            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link to="/shop">Browse Shop</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 bg-card shadow-sm hover:shadow-md transition">
                <Link to={`/product/${item.id}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-60 object-cover rounded-md mb-4"
                  />
                </Link>
                <h2 className="text-lg font-medium text-primary">{item.name}</h2>
                <p className="text-sm text-muted-foreground mb-2">${item.price}</p>

                <div className="flex justify-between items-center mt-3">
                  <Button asChild variant="outline" size="sm">
                    <Link to={`/product/${item.id}`}>View Product</Link>
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => toggleWishlist(item)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
