import CategoriesSection from '@/components/ui/CategoriesSection';
import ProductCard from '@/components/ui/ProductCard';
import { useQuery } from '@apollo/client';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GET_PRODUCTS } from '../queries/product';

const { width } = Dimensions.get('window');

export default function ShopScreen({ navigation }: any) {
  const { data, loading, error } = useQuery(GET_PRODUCTS);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const products = data?.products?.nodes || [];
  // Filter by search and category
  const filteredProducts = products.filter((p: any) => {
    const matchesSearch = p.name?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !selectedCategory || p.productCategories?.nodes?.some((cat: any) => cat.slug === selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const handleProductPress = (slug: string) => {
    navigation.navigate('ProductDetails', { slug });
  };

  const renderProduct = ({ item }: { item: any }) => (
    <ProductCard
      image={item.image?.sourceUrl ? { uri: item.image.sourceUrl } : require('../assets/images/partial-react-logo.png')}
      name={item.name}
      price={item.price || item.regularPrice || ''}
      regularPrice={item.regularPrice || ''}
      rating={item.averageRating ? parseFloat(item.averageRating) : 0}
      onAdd={() => {}}
      styled={{ marginBottom: 12 }}
      onPress={() => handleProductPress(item.slug)}
    />
  );

  return (
   <SafeAreaView style={styles.container}>
     <View >
     
     <View style={styles.searchRow}>
       <Ionicons name="search" size={22} color="#888" style={{ marginRight: 8 }} />
       <TextInput
         style={styles.searchInput}
         placeholder="Search"
         value={search}
         onChangeText={setSearch}
       />
       <TouchableOpacity style={styles.voiceBtn}>
         <Ionicons name="mic-outline" size={22} color="#fff" />
       </TouchableOpacity>
     </View>
     <CategoriesSection selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
     <View style={styles.sectionRow}>
       <Text style={styles.sectionTitle}>Products</Text>
       <TouchableOpacity>
         <Text style={styles.seeAll}>See All</Text>
       </TouchableOpacity>
     </View>
     {loading ? (
       <ActivityIndicator size="large" color="#1a8c4a" style={{ marginTop: 40 }} />
     ) : error ? (
       <Text style={styles.errorText}>Failed to load products.</Text>
     ) : (
       <FlatList
         data={filteredProducts}
         renderItem={renderProduct}
         keyExtractor={(item) => item.id}
         numColumns={2}
         columnWrapperStyle={{ justifyContent: 'space-between' }}
         contentContainerStyle={{ paddingBottom: 24, paddingTop: 8 }}
         showsVerticalScrollIndicator={false}
       />
     )}
   </View>
   </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    width:width ,
    backgroundColor: '#fafbfc',
    paddingTop: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginLeft: 12,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#222',
    paddingVertical: 4,
  },
  voiceBtn: {
    backgroundColor: '#1a8c4a',
    borderRadius: 16,
    padding: 6,
    marginLeft: 8,
  },
  categoryRow: {
    flexDirection: 'row',
    marginBottom: 10,
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryBtn: {
    backgroundColor: '#f4f4f4',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 6,
  },
  categoryBtnActive: {
    backgroundColor: '#1a8c4a',
  },
  categoryText: {
    color: '#888',
    fontWeight: '600',
    fontSize: 14,
  },
  categoryTextActive: {
    color: '#fff',
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },
  seeAll: {
    color: '#1a8c4a',
    fontWeight: '600',
    fontSize: 15,
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
}); 