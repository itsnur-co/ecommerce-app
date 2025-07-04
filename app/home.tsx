import CategorySection from '@/components/ui/CategoriesSection';
import FeaturedSection from '@/components/ui/FeaturedProductSection';
import HomeHeading from '@/components/ui/HomeHeading';
import NewArrivalSection from '@/components/ui/NewArrivalSection';
import ProductCard from '@/components/ui/ProductCard';
import ProductCarousel from '@/components/ui/ProductCarousel';
import SearchBar from '@/components/ui/SearchBar';
import SectionHeader from '@/components/ui/SectionHeader';
import { useFilteredProducts } from '@/hooks/useFilteredProduct';
import { GET_PRODUCTS } from '@/queries/product';
import { RootStackParamList } from '@/types/navigation';
import { Product } from '@/types/product';
import { useQuery } from '@apollo/client';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useCart } from '../hooks/useCart';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MainTabs'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const { data, loading, error, refetch } = useQuery(GET_PRODUCTS);
  const productsData: Product[] = data?.products?.nodes || [];
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const { addToCart } = useCart();

  const filteredProducts = useFilteredProducts(productsData, search, selectedCategory);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch();
    } catch (err) {
      console.error('Error refreshing:', err);
    } finally {
      setRefreshing(false);
    }
  };

  const handleProductPress = (slug: string) => {
    navigation.navigate('ProductDetails', { slug });
  };

  const handleClearFilters = () => {
    setSearch('');
    setSelectedCategory('');
  };

  const renderProductCard = ({ item }: { item: Product }) => (
    <ProductCard
      image={{ uri: item.image?.sourceUrl }}
      name={item.name}
      price={item.price || item.regularPrice || ''}
      regularPrice={item.regularPrice || ''}
      rating={item.averageRating ? parseFloat(item.averageRating) : 0}
      onAdd={async () => {
        await addToCart(item, 1);
        Alert.alert('Success', 'Product added to cart!');
      }}
      styled={styles.productCard}
      onPress={() => handleProductPress(item.slug)}
    />
  );

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <HomeHeading/>
      
      {/* Search Bar */}
      <SearchBar search={search} setSearch={setSearch} />
      
      {/* Categories */}
      <CategorySection 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
      />

      {/* Loading State */}
      {loading && !refreshing && (
        <ActivityIndicator size="large" color="#1a8c4a" style={styles.loader} />
      )}

      {/* Error State */}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error loading products</Text>
          <Text style={styles.errorSubtext}>{error.message}</Text>
        </View>
      )}
      
      {/* Filtered Products Section */}
      {!loading && !error && filteredProducts.length > 0 && (
        <View style={styles.productsSection}>
          <SectionHeader 
            title={`Products${search || selectedCategory ? ' (Filtered)' : ''}`}
            onSeeAll={() => {
              // TODO: Navigate to products listing page
              console.log('See all products');
            }}
          />
          <ProductCarousel
            data={filteredProducts}
            renderItem={renderProductCard}
          />
        </View>
      )}

      {/* No Results State */}
      {!loading && !error && filteredProducts.length === 0 && (search || selectedCategory) && (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>
            No products found {search && `for "${search}"`}
          </Text>
          <Text style={styles.noResultsSubtext}>
            Try adjusting your search or category filter
          </Text>
          <Text style={styles.clearFiltersText} onPress={handleClearFilters}>
            Clear Filters
          </Text>
        </View>
      )}
      
      {/* Featured Products */}
      <FeaturedSection navigation={navigation} />
      
      {/* New Arrivals */}
      <NewArrivalSection navigation={navigation} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  contentContainer: {
    paddingTop: 50,
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
    lineHeight: 20,
  },
  loader: {
    marginTop: 40,
    alignSelf: 'center',
  },
  errorContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: '#fff5f5',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ffebee',
    alignItems: 'center',
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  errorSubtext: {
    color: '#d32f2f',
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.8,
  },
  productsSection: {
    marginBottom: 20,
  },
  productCard: {
    marginHorizontal: 6,
  },
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
    paddingHorizontal: 20,
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginBottom: 16,
  },
  clearFiltersText: {
    fontSize: 16,
    color: '#1a8c4a',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});