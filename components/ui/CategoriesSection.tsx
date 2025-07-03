import { GET_PRODUCT_CATEGORY } from '@/queries/shop';
import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import CategoryCarousel from './CategoryCarousel';

interface Category {
  id: string;
  name: string;
}

interface CategorySectionProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({ 
  selectedCategory, 
  setSelectedCategory 
}) => {
  const { data, loading, error } = useQuery(GET_PRODUCT_CATEGORY, {
    errorPolicy: 'all',
  });

  const categories: Category[] = data?.productCategories?.nodes?.map(
    (cat: { slug: string; name: string }) => ({
      id: cat.slug,
      name: cat.name,
    })
  ) || [];

  // Add "All" category at the beginning
  const allCategories = [
    { id: '', name: 'All' },
    ...categories,
  ];

  useEffect(() => {
    // Set default category to "All" if no category is selected
    if (!selectedCategory && allCategories.length > 0) {
      setSelectedCategory('');
    }
  }, [allCategories, selectedCategory, setSelectedCategory]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color="#1a8c4a" style={styles.loader} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error loading categories</Text>
      </View>
    );
  }

  if (!allCategories.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <CategoryCarousel
        categories={allCategories}
        selectedId={selectedCategory}
        onSelect={setSelectedCategory}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  loader: {
    marginVertical: 20,
    alignSelf: 'center',
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 16,
    marginHorizontal: 20,
    padding: 12,
    backgroundColor: '#fff5f5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffebee',
  },
});

export default CategorySection;