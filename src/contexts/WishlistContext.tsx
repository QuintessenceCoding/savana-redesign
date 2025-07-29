import React, { createContext, useContext, useState, ReactNode } from "react";

// ✅ Extend WishlistItem to allow full product fields
export interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
  [key: string]: any; // allows other product fields (colors, sizes, etc.)
}

interface WishlistContextType {
  wishlist: WishlistItem[];
  toggleWishlist: (item: WishlistItem) => void;
  isWishlisted: (id: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  // ✅ Add/Remove item
  const toggleWishlist = (item: WishlistItem) => {
    setWishlist((prev) => {
      const exists = prev.find((p) => p.id === item.id);
      if (exists) {
        return prev.filter((p) => p.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  const isWishlisted = (id: number) => wishlist.some((item) => item.id === id);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
