import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  MainTabs: undefined;
  ProductDetails: { slug: string };
  Shop: { slug: string };
};

export type ProductDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ProductDetails"
>;

export type ProductDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  "ProductDetails"
>;

export type ShopScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Shop"
>;

export type ShopScreenRouteProp = RouteProp<RootStackParamList, "Shop">;

export type MainTabsNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MainTabs"
>;

export type TabParamList = {
  Home: undefined;
  Account: undefined;
  Shop: undefined;
  Cart: undefined;
};
