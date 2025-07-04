import { GET_FEATURED_PRODUCTS } from "@/queries/featured";
import { Product } from "@/types/product";
import { useQuery } from "@apollo/client";
import { NavigationProp } from '@react-navigation/native';
import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from "react-native";
import ProductCard from "./ProductCard";
import ProductCarousel from "./ProductCarousel";
import SectionHeader from "./SectionHeader";



const width = Dimensions.get('window').width; 

const FeaturedSection = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const { data, loading, error } = useQuery(GET_FEATURED_PRODUCTS);
  const featuredProducts: Product[] = data?.products?.nodes || [];
  

  const handleProductPress = (slug: string) => {
    navigation.navigate('ProductDetails', { slug });
  };


  return (
    <View style={styles.container}>
      <SectionHeader title="Featured Products" onSeeAll={() => {}} />
      {loading && <ActivityIndicator size="small" color="#222" style={styles.loader} />}
      {error && <Text style={styles.errorText}>Error loading featured products: {error.message}</Text>}
      {!loading && !error && (
         <ProductCarousel
         data={featuredProducts}
         renderItem={({ item }: { item: Product }) => (
           <ProductCard
             image={{ uri: item.image?.sourceUrl }}
             name={item.name}
             price={item.price || item.regularPrice || ''}
             regularPrice={item.regularPrice || ''}
             rating={item.averageRating ? parseFloat(item.averageRating) : 0}
             onAdd={() => {}}
             styled={styles.productCard}
             onPress={() => handleProductPress(item.slug)}
           />
         )}
       />
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
  
  productCard: {
    flex: 1,
    width: width / 2 - 12, 
    margin: 6,
  },
});

export default FeaturedSection;