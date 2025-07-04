import { GET_PRODUCT_BY_SLUG } from '@/queries/product';
import { useQuery } from '@apollo/client';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ProductDetailsScreenRouteProp } from '../types/navigation';

interface ProductDetailsProps {
  route: ProductDetailsScreenRouteProp;
  navigation: any;
}

const sizes = ['S', 'M', 'L', 'XL'];

export default function ProductDetails({ route, navigation }: ProductDetailsProps) {
  const { slug } = route.params;

  const { data , loading, error } = useQuery(GET_PRODUCT_BY_SLUG, {
    variables: { slug },
  });

  const item = data?.product

  console.log('Product Details:', item);

  // Example data, replace with real product data
  const product = {
    name: 'Cotton T-Shirt',
    category: 'Outerwear Men',
    price: 86.0,
    images: [
    item?.image?.sourceUrl,
      require('../assets/images/products/men-offwhite-shirt.png'),
      require('../assets/images/products/men-black-shirt.png'),
      require('../assets/images/products/huddi.png'),
    ],
    description:
      'A cotton T-shirt is a must-have for its softness, breathability, and effortless style. Ideal for any season, it keeps you cool in warm weather and adds a light layer when needed. With a range of colors...',
  };

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('L');
  const [quantity, setQuantity] = useState(1);

  return (
    <ScrollView style={styles.container}>

      {/* Product Images */}
      <View style={styles.imageSection}>
        <Image source={product.images[selectedImage]} style={styles.mainImage} />
        <TouchableOpacity style={styles.favoriteBtn}>
          <MaterialIcons name="favorite-border" size={24} color="#ff6600" />
        </TouchableOpacity>
        <View style={styles.thumbnailRow}>
          {product.images.map((img, idx) => (
            <TouchableOpacity
              key={idx}
              style={[
                styles.thumbnailWrapper,
                selectedImage === idx && styles.selectedThumbnail,
              ]}
              onPress={() => setSelectedImage(idx)}
            >
              <Image source={img} style={styles.thumbnail} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Product Info */}
      <View style={styles.infoSection}>
        <View style={styles.titleRow}>
          <View>
            <Text style={styles.productName}>{item?.name.slice(0,20)}</Text>
            <Text style={styles.productCategory}>{item?.category}</Text>
          </View>
          <Text style={styles.productPrice}>{item?.price}</Text>
        </View>

        {/* Size Selector */}
        <Text style={styles.sectionLabel}>Select Size</Text>
        <View style={styles.sizeRow}>
          {sizes.map((size) => (
            <TouchableOpacity
              key={size}
              style={[
                styles.sizeBtn,
                selectedSize === size && styles.selectedSizeBtn,
              ]}
              onPress={() => setSelectedSize(size)}
            >
              <Text
                style={[
                  styles.sizeText,
                  selectedSize === size && styles.selectedSizeText,
                ]}
              >
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quantity Selector */}
        <View style={styles.qtyRow}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Text style={styles.qtyBtnText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtyValue}>{quantity}</Text>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => setQuantity(quantity + 1)}
          >
            <Text style={styles.qtyBtnText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Description */}
        <Text style={styles.sectionLabel}>Description</Text>
        <Text style={styles.descriptionText}>
          {item?.description}
          <Text style={{ color: '#ff6600', fontWeight: 'bold' }}> Learn More</Text>
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.cartBtn}>
          <Ionicons name="cart-outline" size={22} color="#ff6600" />
          <Text style={styles.cartBtnText}>Add To Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyBtn}>
          <Text style={styles.buyBtnText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', padding: 16, justifyContent: 'space-between',
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#222' },
  headerIcons: { flexDirection: 'row', gap: 16 },
  imageSection: { alignItems: 'center', marginTop: 8, marginBottom: 12 },
  mainImage: { width: 220, height: 220, borderRadius: 16, backgroundColor: '#f7f7f7' },
  favoriteBtn: {
    position: 'absolute', top: 12, right: 24, backgroundColor: '#fff', borderRadius: 20, padding: 6, elevation: 2,
  },
  thumbnailRow: { flexDirection: 'row', marginTop: 12, gap: 10 },
  thumbnailWrapper: {
    borderRadius: 8, borderWidth: 2, borderColor: 'transparent', padding: 2,
  },
  selectedThumbnail: { borderColor: '#ff6600', backgroundColor: '#fff7f0' },
  thumbnail: { width: 48, height: 48, borderRadius: 8 },
  infoSection: { paddingHorizontal: 20, marginTop: 8 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  productName: { fontSize: 20, fontWeight: 'bold', color: '#222' },
  productCategory: { fontSize: 14, color: '#888', marginTop: 2 },
  productPrice: { fontSize: 20, fontWeight: 'bold', color: '#222' },
  sectionLabel: { fontSize: 15, fontWeight: '600', color: '#222', marginTop: 18, marginBottom: 8 },
  sizeRow: { flexDirection: 'row', gap: 10, marginBottom: 8 },
  sizeBtn: {
    borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingVertical: 8, paddingHorizontal: 18, backgroundColor: '#fff',
  },
  selectedSizeBtn: { backgroundColor: '#ff6600', borderColor: '#ff6600' },
  sizeText: { fontSize: 15, color: '#222', fontWeight: '500' },
  selectedSizeText: { color: '#fff' },
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 18, marginTop: 8 },
  qtyBtn: {
    borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 6, width: 36, alignItems: 'center', backgroundColor: '#fff',
  },
  qtyBtnText: { fontSize: 20, color: '#222', fontWeight: 'bold' },
  qtyValue: { fontSize: 18, fontWeight: '600', color: '#222', minWidth: 24, textAlign: 'center' },
  descriptionText: { fontSize: 14, color: '#666', marginTop: 6, marginBottom: 18, lineHeight: 20 },
  actionRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 24, marginTop: 8,
  },
  cartBtn: {
    flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ff6600', borderRadius: 10, paddingVertical: 12, paddingHorizontal: 18, backgroundColor: '#fff', gap: 8,
  },
  cartBtnText: { color: '#ff6600', fontWeight: 'bold', fontSize: 16 },
  buyBtn: {
    backgroundColor: '#ff6600', borderRadius: 10, paddingVertical: 12, paddingHorizontal: 28, marginLeft: 12,
  },
  buyBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
}); 