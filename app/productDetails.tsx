import { useQuery } from '@apollo/client';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GET_PRODUCT_BY_SLUG } from '../queries/product';

interface ProductDetailsProps {
  route: { params: { slug: string } };
  navigation: any;
}

export default function ProductDetails({ route, navigation }: ProductDetailsProps) {
  const { slug } = route.params;
  const { data, loading, error } = useQuery(GET_PRODUCT_BY_SLUG, { variables: { slug } });
  const [quantity, setQuantity] = useState(1);

  if (loading) return <ActivityIndicator size="large" color="#222" style={{ flex: 1, marginTop: 32 }} />;
  if (error) return <Text style={{ color: 'red', margin: 16 }}>Error loading product: {error.message}</Text>;

  const product = data?.product;
  if (!product) return <Text style={{ color: 'red', margin: 16 }}>Product not found.</Text>;

  const price = product.price || product.regularPrice || '';

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
      <Image source={{ uri: product.image?.sourceUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>{price}</Text>
        <Text style={styles.description}>{product.description || product.shortDescription}</Text>
        <View style={styles.quantityRow}>
          <Text style={styles.quantityLabel}>Quantity:</Text>
          <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))} style={styles.qtyBtn}>
            <Ionicons name="remove-circle-outline" size={28} color="#222" />
          </TouchableOpacity>
          <Text style={styles.quantityValue}>{quantity}</Text>
          <TouchableOpacity onPress={() => setQuantity(quantity + 1)} style={styles.qtyBtn}>
            <Ionicons name="add-circle-outline" size={28} color="#222" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addToCartBtn} onPress={() => navigation.navigate('ProductDetails', { slug: product.slug })}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyNowBtn}>
          <Text style={styles.buyNowText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  image: {
    width: '100%',
    height: 320,
    resizeMode: 'contain',
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a8c4a',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: '#444',
    marginBottom: 18,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  quantityLabel: {
    fontSize: 16,
    color: '#222',
    marginRight: 12,
  },
  qtyBtn: {
    padding: 4,
  },
  quantityValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 12,
    color: '#222',
  },
  addToCartBtn: {
    backgroundColor: '#222',
    borderRadius: 8,
    paddingVertical: 14,
    marginBottom: 12,
  },
  addToCartText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  buyNowBtn: {
    backgroundColor: '#1a8c4a',
    borderRadius: 8,
    paddingVertical: 14,
  },
  buyNowText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
}); 