import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Card from '../components/shared/Card';
import { useCart } from '../hooks/useCart';

const SHIPPING_COST = 10.0;

function CartItemRow({ item, onRemove, onQuantity }: { item: any; onRemove: (item: any) => void; onQuantity: (item: any, qty: number) => void }) {
  return (
    <Card style={styles.itemCard}>
      <View style={styles.itemRow}>
        <Image source={item.image ? { uri: item.image } : require('../assets/images/partial-react-logo.png')} style={styles.itemImage} />
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.name}</Text>
          {item.variationName && <Text style={styles.itemVariation}>Size: {item.variationName}</Text>}
          <Text style={styles.itemPrice}>€ {parseFloat(item.price).toFixed(2)}</Text>
        </View>
        <View style={styles.qtyContainer}>
          <TouchableOpacity style={styles.qtyBtn} onPress={() => onQuantity(item, item.quantity - 1)}>
            <Text style={styles.qtyBtnText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtyText}>{item.quantity}</Text>
          <TouchableOpacity style={styles.qtyBtn} onPress={() => onQuantity(item, item.quantity + 1)}>
            <Text style={styles.qtyBtnText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.removeBtn} onPress={() => onRemove(item)}>
          <Text style={styles.removeBtnText}>×</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
}

export default function CartScreen() {
  const { getCart, removeFromCart, updateQuantity, isLoggedIn, cart, refetch, addToCartMutation } = useCart();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [promo, setPromo] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      const items = await getCart();
      setCartItems(items);
      setLoading(false);
    };
    fetchCart();
  }, [cart, refetch]);

  const handleRemove = async (item: any) => {
    await removeFromCart(item);
    const items = await getCart();
    setCartItems(items);
  };

  const handleQuantity = async (item: any, qty: number) => {
    if (qty < 1) return;
    await updateQuantity(item, qty);
    const items = await getCart();
    setCartItems(items);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
  const total = subtotal + SHIPPING_COST;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Cart</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#1a8c4a" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(_, idx) => idx.toString()}
          renderItem={({ item }) => (
            <CartItemRow item={item} onRemove={handleRemove} onQuantity={handleQuantity} />
          )}
          contentContainerStyle={{ paddingBottom: 16 }}
          ListEmptyComponent={<Text style={styles.emptyText}>Your cart is empty.</Text>}
          showsVerticalScrollIndicator={false}
        />
      )}
      <View style={styles.promoContainer}>
        <TextInput
          style={styles.promoInput}
          placeholder="Promo/Student Code or Vouchers"
          value={promo}
          onChangeText={setPromo}
        />
      </View>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Sub Total</Text>
        <Text style={styles.summaryValue}>€ {subtotal.toFixed(2)}</Text>
      </View>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Shipping</Text>
        <Text style={styles.summaryValue}>€ {SHIPPING_COST.toFixed(2)}</Text>
      </View>
      <View style={styles.summaryRowTotal}>
        <Text style={styles.summaryLabelTotal}>Total</Text>
        <Text style={styles.summaryValueTotal}>€ {total.toFixed(2)}</Text>
      </View>
      <TouchableOpacity style={styles.checkoutBtn} onPress={() => Alert.alert('Checkout', 'Proceed to checkout!')}>
        <Text style={styles.checkoutBtnText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafbfc',
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
    color: '#222',
  },
  itemCard: {
    marginBottom: 12,
    padding: 0,
    backgroundColor: '#fff',
    borderRadius: 18,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  itemImage: {
    width: 70,
    height: 90,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: '#f0f0f0',
  },
  itemInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 2,
  },
  itemVariation: {
    fontSize: 13,
    color: '#888',
    marginBottom: 2,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1a8c4a',
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    borderRadius: 12,
    paddingHorizontal: 6,
    marginHorizontal: 8,
  },
  qtyBtn: {
    padding: 4,
    paddingHorizontal: 8,
  },
  qtyBtnText: {
    fontSize: 18,
    color: '#1a8c4a',
    fontWeight: 'bold',
  },
  qtyText: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 4,
    color: '#222',
  },
  removeBtn: {
    marginLeft: 4,
    padding: 4,
  },
  removeBtnText: {
    fontSize: 22,
    color: '#d32f2f',
    fontWeight: 'bold',
  },
  promoContainer: {
    marginTop: 8,
    marginBottom: 8,
  },
  promoInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#eee',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    marginBottom: 2,
  },
  summaryLabel: {
    fontSize: 15,
    color: '#888',
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 15,
    color: '#e67e22',
    fontWeight: '700',
  },
  summaryRowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
  },
  summaryLabelTotal: {
    fontSize: 17,
    color: '#222',
    fontWeight: '700',
  },
  summaryValueTotal: {
    fontSize: 17,
    color: '#e67e22',
    fontWeight: '900',
  },
  checkoutBtn: {
    backgroundColor: '#111',
    borderRadius: 16,
    paddingVertical: 16,
    marginTop: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  checkoutBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
    marginTop: 40,
  },
}); 