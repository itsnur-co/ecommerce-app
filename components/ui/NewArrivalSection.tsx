import { GET_NEW_ARRIVAL_PRODUCTS } from "@/queries/newarrival";
import { RootStackParamList } from "@/types/navigation";
import { Product } from "@/types/product";
import { useQuery } from "@apollo/client";
import { StackNavigationProp } from "@react-navigation/stack";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import ProductCard from "./ProductCard";
import ProductCarousel from "./ProductCarousel";
import SectionHeader from "./SectionHeader";

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MainTabs"
>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const NewArrivalSection = ({ navigation }: HomeScreenProps) => {
  const { data, loading, error } = useQuery(GET_NEW_ARRIVAL_PRODUCTS);
  const newArrivals: Product[] = data?.products?.nodes || [];

  const handleProductPress = (slug: string) => {
    navigation.navigate("ProductDetails", { slug });
  };

  const handleSeeAll = (slug: string) => {
    navigation.navigate("Shop", { slug });
  };

  return (
    <View style={styles.container}>
      <SectionHeader
        title="New Arrival"
        onSeeAll={() => {
          handleSeeAll("shop");
        }}
      />
      {loading && (
        <ActivityIndicator size="small" color="#222" style={styles.loader} />
      )}
      {error && (
        <Text style={styles.errorText}>
          Error loading new arrivals: {error.message}
        </Text>
      )}
      {!loading && !error && (
        <ProductCarousel
          data={newArrivals}
          renderItem={({ item }: { item: Product }) => (
            <ProductCard
              image={{ uri: item.image?.sourceUrl }}
              name={item.name}
              price={item.price || item.regularPrice || ""}
              regularPrice={item.regularPrice || ""}
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
    alignSelf: "center",
  },
  errorText: {
    color: "#ff4444",
    fontSize: 14,
    textAlign: "center",
    margin: 16,
    padding: 12,
    backgroundColor: "#fff5f5",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ffebee",
  },
  productCard: {
    flex: 1,
    marginHorizontal: 4,
  },
});

export default NewArrivalSection;
