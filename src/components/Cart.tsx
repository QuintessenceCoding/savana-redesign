import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { 
    items, 
    updateQuantity, 
    removeItem, 
    getTotalPrice, 
    isCartOpen, 
    setIsCartOpen 
  } = useCart();

  const total = getTotalPrice();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Cart Slider */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-background z-50 shadow-xl transform transition-transform">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-lg font-semibold text-primary">Shopping Cart</h2>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsCartOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-auto p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">Your cart is empty</p>
                <Button 
                  variant="outline"
                  onClick={() => setIsCartOpen(false)}
                  asChild
                >
                  <Link to="/shop">Continue Shopping</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={`${item.id}-${item.size}-${item.color}-${index}`} className="flex gap-4 pb-4 border-b border-border/50">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-primary mb-1">{item.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {item.color} • {item.size}
                      </p>
                      <p className="font-medium text-primary">${item.price}</p>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="font-medium w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id, item.size, item.color)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-border p-6 space-y-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total:</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
              
              <div className="space-y-2">
                <Button 
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  asChild
                  onClick={() => setIsCartOpen(false)}
                >
                  <Link to="/checkout">Checkout</Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  asChild
                  onClick={() => setIsCartOpen(false)}
                >
                  <Link to="/shop">Continue Shopping</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;