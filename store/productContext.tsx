import { HEIGHEST_PRICE, HEIGHEST_RATING } from '@/components/product/sort-product';
import { Product } from '@/types/product';
import { ReactElement, createContext, useContext, useMemo, useState } from 'react';

export async function getServerSideProps() {
  const resp = await fetch('https://dummyjson.com/products');
  const data = await resp.json();

  return {
    props: {
      products: data.products
    }
  };
}

const sortProduct = ({
  a,
  b,
  sortOption
}: {
  a: Product;
  b: Product;
  sortOption: string;
}): number => {
  if (sortOption === HEIGHEST_RATING) {
    return (a.rating || 0) - (b.rating || 0);
  }

  if (sortOption === HEIGHEST_PRICE) {
    return (b.price || 0) - (a.price || 0);
  }

  return (a.price || 0) - (b.price || 0);
};

const useProductController = (productsData: Product[]) => {
  const [products, setProducts] = useState<Product[]>(productsData);
  const [filterText, setFilterText] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('');

  const filteredAndSortedProduct = useMemo(() => {
    if (!filterText && !sortOption) {
      return products;
    }

    if (filterText && !sortOption) {
      return products.filter((p) => p.title.toLowerCase().includes(filterText));
    }

    if (filterText && sortOption) {
      return products
        .filter((p) => p.title.toLowerCase().includes(filterText))
        .sort((a, b) => sortProduct({ a, b, sortOption }));
    }

    if (!filterText && sortOption) {
      return products.sort((a, b) => sortProduct({ a, b, sortOption }));
    }
  }, [products, filterText, sortOption]);

  return {
    products: filteredAndSortedProduct,
    setProducts,
    setFilterText,
    setSortOption
  };
};

const ProductContext = createContext<ReturnType<typeof useProductController>>({
  products: [],
  setProducts: () => {},
  setFilterText: () => {},
  setSortOption: () => {}
});

export const ProductProvider = ({
  products,
  children
}: {
  products: Product[];
  children: ReactElement;
}) => (
  <ProductContext.Provider value={useProductController(products)}>
    {children}
  </ProductContext.Provider>
);

export const useProduct = () => useContext(ProductContext);
