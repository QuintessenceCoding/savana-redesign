import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

const CartIcon = () => {
  const { getTotalItems, setIsCartOpen } = useCart();
  const itemCount = getTotalItems();

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="relative"
      onClick={() => setIsCartOpen(true)}
    >
      <ShoppingBag className="h-5 w-5" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs font-medium flex items-center justify-center">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
      <span className="sr-only">Shopping cart</span>
    </Button>
  );
};

export default CartIcon;