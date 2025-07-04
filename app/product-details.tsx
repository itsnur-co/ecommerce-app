import { GET_PRODUCT_BY_SLUG } from '@/queries/product';
import { useQuery } from '@apollo/client';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { BORDER_RADIUS, COLORS, FONT_SIZES, FONT_WEIGHTS, LINE_HEIGHTS, SPACING } from '@/constants/theme';
import { ProductDetailsScreenRouteProp } from '../types/navigation';

interface ProductDetailsProps {
  route: ProductDetailsScreenRouteProp;
  navigation: any;
}

const { width } = Dimensions.get('window');
const SIZES = ['S', 'M', 'L', 'XL'] as const;

// Fallback images - replace with your actual fallback images
const FALLBACK_IMAGES = [
  require('../assets/images/products/men-offwhite-shirt.png'),
  require('../assets/images/products/men-black-shirt.png'),
  require('../assets/images/products/huddi.png'),
];

export default function ProductDetails({ route, navigation }: ProductDetailsProps) {
  const { slug } = route.params;
  
  // Apollo query
  const { data, loading, error } = useQuery(GET_PRODUCT_BY_SLUG, {
    variables: { slug },
  });
  
  // Component state
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<typeof SIZES[number]>('L');
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  // Handlers
  const handleQuantityChange = (increment: boolean) => {
    setQuantity(prev => increment ? prev + 1 : Math.max(1, prev - 1));
  };

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log('Add to cart:', { 
      product: data?.product, 
      size: selectedSize, 
      quantity 
    });
  };

  const handleBuyNow = () => {
    // TODO: Implement buy now functionality
    console.log('Buy now:', { 
      product: data?.product, 
      size: selectedSize, 
      quantity 
    });
  };

  const toggleFavorite = () => {
    setIsFavorite(prev => !prev);
    // TODO: Implement favorite functionality
  };

  // Loading state
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading product...</Text>
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading product: {error.message}</Text>
        <TouchableOpacity 
          style={styles.retryButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.retryButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const product = data?.product;

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Product not found</Text>
        <TouchableOpacity 
          style={styles.retryButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.retryButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Use product images if available, otherwise use fallback
  const displayImages = product.images?.length > 0 ? product.images : FALLBACK_IMAGES;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Product Images Section */}
      <View style={styles.imageSection}>
        <View style={styles.mainImageContainer}>
          <Image 
            source={displayImages[selectedImage]} 
            style={styles.mainImage}
            resizeMode="cover"
          />
          <TouchableOpacity 
            style={styles.favoriteBtn}
            onPress={toggleFavorite}
          >
            <MaterialIcons 
              name={isFavorite ? "favorite" : "favorite-border"} 
              size={24} 
              color={COLORS.primary} 
            />
          </TouchableOpacity>
        </View>
        
        {displayImages.length > 1 && (
          <View style={styles.thumbnailRow}>
            {displayImages.map((img, idx) => (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.thumbnailWrapper,
                  selectedImage === idx && styles.selectedThumbnail,
                ]}
                onPress={() => setSelectedImage(idx)}
              >
                <Image 
                  source={img} 
                  style={styles.thumbnail}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Product Information Section */}
      <View style={styles.infoSection}>
        <View style={styles.titleRow}>
          <View style={styles.titleContainer}>
            <Text style={styles.productName} numberOfLines={2}>
              {product.name}
            </Text>
            <Text style={styles.productCategory}>
              {product.category}
            </Text>
          </View>
          <Text style={styles.productPrice}>
            ${product.price}
          </Text>
        </View>

        {/* Size Selection */}
        <Text style={styles.sectionLabel}>Select Size</Text>
        <View style={styles.sizeRow}>
          {SIZES.map((size) => (
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

        {/* Quantity Selection */}
        <Text style={styles.sectionLabel}>Quantity</Text>
        <View style={styles.qtyRow}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => handleQuantityChange(false)}
          >
            <Text style={styles.qtyBtnText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.qtyValue}>{quantity}</Text>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => handleQuantityChange(true)}
          >
            <Text style={styles.qtyBtnText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Description */}
        {product.description && (
          <>
            <Text style={styles.sectionLabel}>Description</Text>
            <Text style={styles.descriptionText}>
              {product.description}
              <Text style={styles.learnMoreText}> Learn More</Text>
            </Text>
          </>
        )}
      </View>

      {/* Action Buttons */}
      <View style={styles.actionRow}>
        <TouchableOpacity 
          style={styles.cartBtn}
          onPress={handleAddToCart}
        >
          <Ionicons name="cart-outline" size={22} color={COLORS.primary} />
          <Text style={styles.cartBtnText}>Add To Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.buyBtn}
          onPress={handleBuyNow}
        >
          <Text style={styles.buyBtnText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  loadingText: {
    marginTop: SPACING.md,
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    fontWeight: FONT_WEIGHTS.regular,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
  },
  errorText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textGray,
    textAlign: 'center',
    marginBottom: SPACING.lg,
    lineHeight: LINE_HEIGHTS.md,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
  },
  retryButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.bold ,
  },
  imageSection: {
    alignItems: 'center',
    marginTop: SPACING.sm,
    marginBottom: SPACING.md,
  },
  mainImageContainer: {
    position: 'relative',
  },
  mainImage: {
    width: width - 40,
    height: width - 40,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.background,
  },
  favoriteBtn: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: SPACING.sm,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  thumbnailRow: {
    flexDirection: 'row',
    marginTop: SPACING.md,
    gap: SPACING.sm,
  },
  thumbnailWrapper: {
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 2,
    borderColor: 'transparent',
    padding: 2,
  },
  selectedThumbnail: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.lightOrange,
  },
  thumbnail: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.sm,
  },
  infoSection: {
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.sm,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  titleContainer: {
    flex: 1,
    marginRight: SPACING.md,
  },
  productName: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text,
    lineHeight: LINE_HEIGHTS.lg,
  },
  productCategory: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
    fontWeight: FONT_WEIGHTS.regular,
  },
  productPrice: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text,
  },
  sectionLabel: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.text,
    marginTop: SPACING.lg,
    marginBottom: SPACING.md,
  },
  sizeRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  sizeBtn: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    backgroundColor: COLORS.white,
  },
  selectedSizeBtn: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  sizeText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    fontWeight: FONT_WEIGHTS.medium,
  },
  selectedSizeText: {
    color: COLORS.white,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    marginBottom: SPACING.sm,
  },
  qtyBtn: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.sm,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  qtyBtnText: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.text,
    fontWeight: FONT_WEIGHTS.bold,
  },
  qtyValue: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.text,
    minWidth: 30,
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textGray,
    lineHeight: LINE_HEIGHTS.md,
    marginBottom: SPACING.sm,
  },
  learnMoreText: {
    color: COLORS.primary,
    fontWeight: FONT_WEIGHTS.bold,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
    marginBottom: SPACING.lg,
    gap: SPACING.md,
  },
  cartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    backgroundColor: COLORS.white,
    gap: SPACING.sm,
    flex: 1,
    justifyContent: 'center',
  },
  cartBtnText: {
    color: COLORS.primary,
    fontWeight: FONT_WEIGHTS.bold,
    fontSize: FONT_SIZES.md,
  },
  buyBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyBtnText: {
    color: COLORS.white,
    fontWeight: FONT_WEIGHTS.bold,
    fontSize: FONT_SIZES.md,
  },
});