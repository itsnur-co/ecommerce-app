import { useQuery } from '@apollo/client';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CategoryCarousel from '../components/ui/CategoryCarousel';
import ProductCard from '../components/ui/ProductCard';
import ProductCarousel from '../components/ui/ProductCarousel';
import SectionHeader from '../components/ui/SectionHeader';
import { GET_FEATURED_PRODUCTS } from '../queries/featured';
import { GET_NEW_ARRIVAL_PRODUCTS } from '../queries/newarrival';
import { GET_PRODUCTS } from '../queries/product';
import { GET_PRODUCT_CATEGORY } from '../queries/shop';

// Define the product type based on the GraphQL query
interface Product {
  id: string;
  slug: string;
  name: string;
  averageRating?: string;
  image?: { sourceUrl: string; altText?: string };
  price?: string;
  regularPrice?: string;
  productCategories?: { nodes: { slug: string }[] };
}

const SearchBar = ({ search, setSearch }: { search: string; setSearch: (v: string) => void }) => (
  <View style={styles.searchBarContainer}>
    <Ionicons name="search" size={22} color="#888" style={{ marginLeft: 8 }} />
    <TextInput
      style={styles.searchInput}
      placeholder="Search products..."
      placeholderTextColor="#aaa"
      value={search}
      onChangeText={setSearch}
    />
    {search.length > 0 && (
      <TouchableOpacity onPress={() => setSearch('')} style={styles.clearButton}>
        <Ionicons name="close-circle" size={20} color="#888" />
      </TouchableOpacity>
    )}
  </View>
);

const CategorySection = ({ selectedCategory, setSelectedCategory }: { selectedCategory: string; setSelectedCategory: (v: string) => void }) => {
  const { data, loading, error } = useQuery(GET_PRODUCT_CATEGORY);
  const categories = data?.productCategories?.nodes?.map((cat: { slug: string; name: string }) => ({ id: cat.slug, name: cat.name })) || [];

  useEffect(() => {
    if (!selectedCategory && categories.length > 0) {
      setSelectedCategory(categories[0].id);
    }
  }, [categories, selectedCategory]);

  if (loading) return <ActivityIndicator size="small" color="#222" style={{ marginTop: 16 }} />;
  if (error) return <Text style={{ color: 'red', margin: 16 }}>Error loading categories: {error.message}</Text>;
  if (!categories.length) return null;

  return (
    <CategoryCarousel
      categories={categories}
      selectedId={selectedCategory}
      onSelect={setSelectedCategory}
    />
  );
};

const FeaturedSection = () => {
  const { data, loading, error } = useQuery(GET_FEATURED_PRODUCTS);
  const featuredProducts: Product[] = data?.products?.nodes || [];
  return (
    <>
      <SectionHeader title="Featured Products" onSeeAll={() => {}} />
      {loading && <ActivityIndicator size="small" color="#222" style={{ marginTop: 16 }} />}
      {error && <Text style={{ color: 'red', margin: 16 }}>Error loading featured products: {error.message}</Text>}
      {!loading && !error && (
        <View style={styles.bestSellerRow}>
          {featuredProducts.map((item: Product) => (
            <ProductCard
              key={item.id}
              image={{ uri: item.image?.sourceUrl }}
              name={item.name}
              price={item.price || item.regularPrice || ''}
              rating={item.averageRating ? parseFloat(item.averageRating) : 0}
              onAdd={() => {}}
              styled={{ flex: 1 }}
            />
          ))}
        </View>
      )}
    </>
  );
};

const NewArrivalSection = () => {
  const { data, loading, error } = useQuery(GET_NEW_ARRIVAL_PRODUCTS);
  const newArrivals: Product[] = data?.products?.nodes || [];
  return (
    <>
      <SectionHeader title="New Arrival" onSeeAll={() => {}} />
      {loading && <ActivityIndicator size="small" color="#222" style={{ marginTop: 16 }} />}
      {error && <Text style={{ color: 'red', margin: 16 }}>Error loading new arrivals: {error.message}</Text>}
      {!loading && !error && (
        <ProductCarousel
          data={newArrivals}
          renderItem={({ item }: { item: Product }) => (
            <ProductCard
              image={{ uri: item.image?.sourceUrl }}
              name={item.name}
              price={item.price || item.regularPrice || ''}
              rating={item.averageRating ? parseFloat(item.averageRating) : 0}
              onAdd={() => {}}
              styled={{ flex: 1 }}
            />
          )}
        />
      )}
    </>
  );
};

export default function HomeScreen({ navigation }: any) {
  const { data, loading, error } = useQuery(GET_PRODUCTS);
  const products: Product[] = data?.products?.nodes || [];
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [search, setSearch] = useState('');

  // Filter products by search and selected category
  const filteredProducts: Product[] = products.filter(item => {
    const matchesSearch = item?.name?.toLowerCase().includes(search?.toLowerCase());
    const matchesCategory = selectedCategory
      ? item?.productCategories?.nodes?.some((cat) => cat.slug === selectedCategory)
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 24 }}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Modern Furniture</Text>
          <Text style={styles.subtitle}>for your house</Text>
        </View>
      </View>
      <SearchBar search={search} setSearch={setSearch} />
      <CategorySection selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      {loading && <ActivityIndicator size="large" color="#222" style={{ marginTop: 32 }} />}
      {error && <Text style={{ color: 'red', margin: 16 }}>Error loading products: {error.message}</Text>}
      {!loading && !error && filteredProducts.length > 0 && (
        <>
          <SectionHeader title="Products" onSeeAll={() => {}} />
          <ProductCarousel
            data={filteredProducts}
            renderItem={({ item }: { item: Product }) => (
              <ProductCard
                image={{ uri: item.image?.sourceUrl }}
                name={item.name}
                price={item.price || item.regularPrice || ''}
                rating={item.averageRating ? parseFloat(item.averageRating) : 0}
                onAdd={() => {}}
                styled={{ flex: 1 }}
                onPress={() => navigation.navigate('productDetails', { slug: item.slug })}
              />
            )}
          />
        </>
      )}
      <FeaturedSection />
      <NewArrivalSection />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingTop: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
  },
  subtitle: {
    fontSize: 15,
    color: '#888',
    marginTop: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  bestSellerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 24,
    marginHorizontal: 16,
    marginBottom: 12,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    color: '#222',
    backgroundColor: 'transparent',
  },
  clearButton: {
    padding: 4,
    marginRight: 8,
  },
}); 