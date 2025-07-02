import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ProductCardProps {
  image: any;
  name: string;
  price: string;
  rating: number;
  onAdd: () => void;
  styled?: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, name, price, rating, onAdd, styled }) => {
  return (
    <View style={[styles.card, styled ]}>
      <Image source={image} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <View style={styles.row}>
        <Ionicons name="star" size={14} color="#FFD700" />
        <Text style={styles.rating}>{rating.toFixed(1)}</Text>
      </View>
      <View style={styles.rowBetween}>
        <Text style={styles.price}>{price}</Text>
        <TouchableOpacity style={styles.addBtn} onPress={onAdd}>
          <Ionicons name="add" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 14,
    margin: 6,
    width: 150,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
    alignSelf: 'center',
    marginBottom: 8,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    justifyContent: 'center',
  },
  rating: {
    fontSize: 13,
    color: '#888',
    marginLeft: 3,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a8c4a',
  },
  addBtn: {
    backgroundColor: '#1a8c4a',
    borderRadius: 16,
    padding: 6,
  },
});

export default ProductCard; 