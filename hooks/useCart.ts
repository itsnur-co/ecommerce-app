import { useMutation, useQuery } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback } from 'react';
import { ADD_TO_CART, REMOVE_ITEM_FROM_CART, UPDATE_QUANTITY_FROM_CART } from '../mutation/cart';
import { GET_CART_PRODUCTS } from '../queries/cart';
import { useAuthForm } from './useAuthForm';

const LOCAL_CART_KEY = 'guest_cart';

export function useCart() {
  const { user } = useAuthForm();


  // Check if user is logged in
  const isLoggedIn = !!user;

  console.log('User logged in:', isLoggedIn)

  // Apollo hooks for logged-in users
  const { data, loading, refetch } = useQuery(GET_CART_PRODUCTS, { skip: !isLoggedIn });


  console.log('Cart data:', data);

  const [addToCartMutation] = useMutation(ADD_TO_CART);
  const [removeFromCartMutation] = useMutation(REMOVE_ITEM_FROM_CART);
  const [updateQuantityMutation] = useMutation(UPDATE_QUANTITY_FROM_CART);

  // Guest cart helpers
  const getGuestCart = async () => {
    const cart = await AsyncStorage.getItem(LOCAL_CART_KEY);
    return cart ? JSON.parse(cart) : [];
  };

  const setGuestCart = async (cart: any[]) => {
    await AsyncStorage.setItem(LOCAL_CART_KEY, JSON.stringify(cart));
  };

  // Add to cart
  const addToCart = useCallback(async (product: any, quantity = 1, variation = null) => {
    if (isLoggedIn) {
      await addToCartMutation({
        variables: {
          input: {
            productId: product?.databaseId ?? product?.id,
            quantity,
            variationId: variation?.databaseId ?? variation?.id ?? undefined,
          },
        },
      });
      refetch();
    } else {
      const cart = await getGuestCart();
      // Check if product already in cart
      const idx = cart.findIndex((item: any) => item.id === product.id && item.variationId === (variation?.id || null));
      if (idx > -1) {
        cart[idx].quantity += quantity;
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          image: product.image?.sourceUrl,
          price: product.price,
          variationId: variation?.id ?? null,
          variationName: variation?.name ?? null,
          quantity,
        });
      }
      await setGuestCart(cart);
    }
  }, [isLoggedIn, addToCartMutation, refetch]);

  // Remove from cart
  const removeFromCart = useCallback(async (item: any) => {
    if (isLoggedIn) {
      await removeFromCartMutation({
        variables: { input: { keys: [item.key] } },
      });
      refetch();
    } else {
      const cart = await getGuestCart();
      const newCart = cart.filter((c: any) => c.id !== item.id || c.variationId !== (item.variationId || null));
      await setGuestCart(newCart);
    }
  }, [isLoggedIn, removeFromCartMutation, refetch]);

  // Update quantity
  const updateQuantity = useCallback(async (item: any, quantity: number) => {
    if (isLoggedIn) {
      await updateQuantityMutation({
        variables: { input: { items: [{ key: item.key, quantity }] } },
      });
      refetch();
    } else {
      const cart = await getGuestCart();
      const idx = cart.findIndex((c: any) => c.id === item.id && c.variationId === (item.variationId || null));
      if (idx > -1) {
        cart[idx].quantity = quantity;
        await setGuestCart(cart);
      }
    }
  }, [isLoggedIn, updateQuantityMutation, refetch]);

  // Get cart items
  const getCart = useCallback(async () => {
    if (isLoggedIn) {
      return data?.cart?.contents?.nodes || [];
    } else {
      return await getGuestCart();
    }
  }, [isLoggedIn, data]);

  return {
    isLoggedIn,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCart,
    loading,
    cart: isLoggedIn ? data?.cart : undefined,
    refetch,
  };
} 