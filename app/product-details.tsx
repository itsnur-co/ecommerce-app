import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ProductDetailsScreenRouteProp } from '../types/navigation';

interface ProductDetailsProps {
  route: ProductDetailsScreenRouteProp;
}

export default function ProductDetails({ route }: ProductDetailsProps) {
  const { slug } = route.params;
  // TODO: Fetch product details using slug
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Details</Text>
      <Text style={styles.slug}>Slug: {slug}</Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  slug: {
    fontSize: 16,
    color: '#888',
  },
}); 