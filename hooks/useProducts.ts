import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_PRODUCTS } from '../queries/product';
import { Product } from '../types/product';

export function useProducts() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const { data, loading, error } = useQuery(GET_PRODUCTS, {
    variables: { search, category },
  });

  const products: Product[] = data?.products?.nodes || [];

  return {
    products,
    loading,
    error,
    search,
    setSearch,
    category,
    setCategory,
  };
} 