import AntDesign from '@expo/vector-icons/AntDesign';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const width = Dimensions.get('window').width; 

interface ProductCardProps {
  image: any;
  name: string;
  price: string;
  regularPrice: string;
  rating: number  ;
  onAdd: () => void;
  styled?: any;
  onPress?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, name, price, regularPrice,  rating, onAdd, styled, onPress }) => {
  const CardContent = (
    <View style={[styles.card, styled ]}>
      <Image source={image} style={styles.image} />
     
      <View style={styles.row}>
      <Text style={styles.name}>{name?.slice(0,10)}</Text>
      <View style={styles.review}>
        <AntDesign name="star" size={20} color="#FFD700" />
       <Text style={styles.rating}>{rating.toFixed(1)}</Text>
      </View>
      </View>
      <View style={styles.rowBetween}>
        <Text style={styles.price}>{price.replace('.00', '')}</Text>
        
        <TouchableOpacity style={styles.addBtn} onPress={onAdd}>
        <AntDesign name="shoppingcart" size={20} color="white" /> <Text style={{color:'#fff'}}>Cart</Text>

        </TouchableOpacity>
      </View>
    </View>
  );
  if (onPress) {
    return (
      <TouchableOpacity activeOpacity={0.85} onPress={onPress}>{CardContent}</TouchableOpacity>
    );
  }
  return CardContent;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    margin: 6,
    width: width / 2 - 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    
  },
  image: {
    width: width / 2 - 12 - 1,
    height: width / 2 - 12,
    alignSelf: 'center',
    marginBottom: 8,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
    textAlign: 'center',
  },
  row: {
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    justifyContent: 'space-between',
  },
  review: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
  },
  rating: {
    fontSize: 13,
    color: '#000',
    marginLeft: 3,
  },
  rowBetween: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1a8c4a',
  },
  addBtn: {
    padding: 6,
    gap: 5,
    paddingHorizontal:10,
    color:'#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 16,
  },
});

export default ProductCard; 