import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CartIcon from './CartIcon';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigation = [{
    name: 'Home',
    href: '/'
  }, {
    name: 'Shop',
    href: '/shop'
  }, {
    name: 'About',
    href: '/about'
  }, {
    name: 'Lookbook',
    href: '/lookbook'
  }, {
    name: 'Contact',
    href: '/contact'
  }];
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border/40">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block text-2xl text-primary">Savana</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`transition-colors hover:text-[#B45309] ${
              isActive(item.href) ? 'text-[#B45309] font-semibold' : 'text-foreground/60'
              }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Link to="/" className="flex items-center space-x-2 md:hidden">
              <span className="font-bold text-2xl text-primary">Savana</span>
            </Link>
          </div>
          <nav className="flex items-center">
            <CartIcon />
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">User account</span>
            </Button>
          </nav>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="border-t border-border/40 bg-background/95 backdrop-blur md:hidden">
          <nav className="flex flex-col space-y-4 p-4">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`transition-colors hover:text-accent ${
                  isActive(item.href) ? 'text-accent' : 'text-foreground/60'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
export default Header;