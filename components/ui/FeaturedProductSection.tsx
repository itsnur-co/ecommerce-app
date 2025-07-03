import { GET_FEATURED_PRODUCTS } from "@/queries/featured";
import { Product } from "@/types/product";
import { useQuery } from "@apollo/client";
import { NavigationProp } from '@react-navigation/native';
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import ProductCard from "./ProductCard";
import SectionHeader from "./SectionHeader";

const FeaturedSection = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const { data, loading, error } = useQuery(GET_FEATURED_PRODUCTS);
  const featuredProducts: Product[] = data?.products?.nodes || [];
  
  return (
    <View style={styles.container}>
      <SectionHeader title="Featured Products" onSeeAll={() => {}} />
      {loading && <ActivityIndicator size="small" color="#222" style={styles.loader} />}
      {error && <Text style={styles.errorText}>Error loading featured products: {error.message}</Text>}
      {!loading && !error && (
        <View style={styles.productsGrid}>
          {featuredProducts.map((item: Product) => (
            <ProductCard
              onPress={() => navigation.navigate('ProductDetails', { slug: item.slug })}
              key={item.id}
              image={{ uri: item.image?.sourceUrl }}
              name={item.name}
              price={item.price || item.regularPrice || ''}
              rating={item.averageRating ? parseFloat(item.averageRating) : 0}
              onAdd={() => {}}
              styled={styles.productCard}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  loader: {
    marginTop: 16,
    alignSelf: 'center',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 14,
    textAlign: 'center',
    margin: 16,
    padding: 12,
    backgroundColor: '#fff5f5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffebee',
  },
  productsGrid: {
   
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
  },
  productCard: {
    flex: 1,
    minWidth: '45%',
    maxWidth: '48%',
  },
});

export default FeaturedSection;