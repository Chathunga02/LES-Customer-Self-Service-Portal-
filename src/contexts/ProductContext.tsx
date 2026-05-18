import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MOCK_PRODUCTS } from '@/lib/mockData';
import { type Product } from '@/types';

interface ProductContextType {
  activeProduct: Product;
  products: Product[];
  setActiveProduct: (productId: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [activeProductId, setActiveProductId] = useState<string>(MOCK_PRODUCTS[0].id);

  const activeProduct = MOCK_PRODUCTS.find(p => p.id === activeProductId) || MOCK_PRODUCTS[0];

  const setActiveProduct = (productId: string) => {
    setActiveProductId(productId);
  };

  return (
    <ProductContext.Provider value={{
      activeProduct,
      products: MOCK_PRODUCTS,
      setActiveProduct
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
}
