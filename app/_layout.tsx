import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Font from 'expo-font';
import React from 'react';
import { Text, View } from 'react-native';
import HomeScreen from './home';

const client = new ApolloClient({
  uri: 'https://app.metadroip.com/graphql', 
  cache: new InMemoryCache(),
});

const Tab = createBottomTabNavigator();

function AccountScreen() {
  return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text>Account</Text></View>;
}
function ShopScreen() {
  return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text>Shop</Text></View>;
}
function CartScreen() {
  return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text>Cart</Text></View>;
}

export default function RootLayout() {
  const [fontsLoaded] = Font.useFonts({
    Sagita: require('../assets/fonts/Sagita.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName: any = 'home';
            if (route.name === 'Home') iconName = 'home';
            else if (route.name === 'Account') iconName = 'person';
            else if (route.name === 'Shop') iconName = 'pricetags';
            else if (route.name === 'Cart') iconName = 'cart';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#222',
          tabBarInactiveTintColor: '#888',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Shop" component={ShopScreen} />
        <Tab.Screen name="Cart" component={CartScreen} />
        <Tab.Screen name="Account" component={AccountScreen} />
      </Tab.Navigator>
    </ApolloProvider>
  );
}
