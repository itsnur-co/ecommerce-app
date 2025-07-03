import { Product } from '@/types/product';
import { useMemo } from 'react';

export function useFilteredProducts(
  products: Product[], 
  search: string, 
  selectedCategory: string
): Product[] {
  return useMemo(() => {
    if (!products || products.length === 0) {
      return [];
    }

    return products.filter(item => {
      if (!item) return false;

      // Search filter
      const matchesSearch = search?.trim()
        ? item.name?.toLowerCase().includes(search.toLowerCase().trim()) ||
          item?.description?.toLowerCase().includes(search.toLowerCase().trim())
        : true;

      // Category filter
      const matchesCategory = selectedCategory?.trim()
        ? item.productCategories?.nodes?.some(
            category => category?.slug === selectedCategory
          )
        : true;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, selectedCategory]);
}