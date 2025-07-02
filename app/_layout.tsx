import { ApolloClient, ApolloProvider, InMemoryCache, useMutation } from '@apollo/client';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SIGNIN } from '../mutation/signin';
import { SIGNUP } from '../mutation/signup';
import HomeScreen from './home';
import ProductDetails from './productDetails';

const client = new ApolloClient({
  uri: 'https://app.metadroip.com/graphql', 
  cache: new InMemoryCache(),
});

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function AccountScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);

  const [signin, { loading: loginLoading }] = useMutation(SIGNIN, {
    onCompleted: (data) => {
      setSuccess('Login successful!');
      setError('');
      setUser(data.login.user);
      // TODO: Save authToken, refreshToken as needed
    },
    onError: (err) => {
      setError(err.message);
      setSuccess('');
    },
  });

  const [signup, { loading: signupLoading }] = useMutation(SIGNUP, {
    onCompleted: (data) => {
      setSuccess('Signup successful! Please log in.');
      setError('');
      setIsLogin(true);
    },
    onError: (err) => {
      setError(err.message);
      setSuccess('');
    },
  });

  const handleInput = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleLogin = () => {
    setError('');
    setSuccess('');
    if (!form.username || !form.password) {
      setError('Username and password are required.');
      return;
    }
    signin({ variables: { username: form.username, password: form.password } });
  };

  const handleSignup = () => {
    setError('');
    setSuccess('');
    if (!form.name || !form.username || !form.email || !form.password) {
      setError('All fields are required.');
      return;
    }
    signup({ variables: { name: form.name, username: form.username, email: form.email, password: form.password } });
  };

  const handleLogout = () => {
    setUser(null);
    setForm({ name: '', username: '', email: '', password: '' });
    setIsLogin(true);
    setError('');
    setSuccess('');
  };

  if (user) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: '#f8f8f8' }}>
        <View style={{ width: '100%', maxWidth: 400, backgroundColor: '#fff', borderRadius: 16, padding: 24, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center', color: '#222' }}>Dashboard</Text>
          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8, color: '#222' }}>Welcome, {user.name}</Text>
          <Text style={{ fontSize: 15, color: '#888', marginBottom: 16 }}>{user.email}</Text>
          <View style={{ marginVertical: 16 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>Your Orders</Text>
            <Text style={{ color: '#888' }}>(Order list coming soon...)</Text>
          </View>
          <TouchableOpacity onPress={handleLogout} style={{ backgroundColor: '#e74c3c', borderRadius: 8, paddingVertical: 12, marginTop: 16 }}>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: '#f8f8f8' }}>
      <View style={{ width: '100%', maxWidth: 400, backgroundColor: '#fff', borderRadius: 16, padding: 24, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center', color: '#222' }}>{isLogin ? 'Login' : 'Sign Up'}</Text>
        {!isLogin && (
          <TextInput
            placeholder="Name"
            value={form.name}
            onChangeText={(v) => handleInput('name', v)}
            style={inputStyle}
            autoCapitalize="words"
          />
        )}
        <TextInput
          placeholder="Username"
          value={form.username}
          onChangeText={(v) => handleInput('username', v)}
          style={inputStyle}
          autoCapitalize="none"
        />
        {!isLogin && (
          <TextInput
            placeholder="Email"
            value={form.email}
            onChangeText={(v) => handleInput('email', v)}
            style={inputStyle}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        )}
        <TextInput
          placeholder="Password"
          value={form.password}
          onChangeText={(v) => handleInput('password', v)}
          style={inputStyle}
          secureTextEntry
        />
        {error ? <Text style={{ color: 'red', marginTop: 8, textAlign: 'center' }}>{error}</Text> : null}
        {success ? <Text style={{ color: 'green', marginTop: 8, textAlign: 'center' }}>{success}</Text> : null}
        <TouchableOpacity
          onPress={isLogin ? handleLogin : handleSignup}
          style={{ backgroundColor: '#222', borderRadius: 8, paddingVertical: 12, marginTop: 16 }}
          disabled={loginLoading || signupLoading}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>
            {isLogin ? (loginLoading ? 'Logging in...' : 'Login') : (signupLoading ? 'Signing up...' : 'Sign Up')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setIsLogin(!isLogin); setError(''); setSuccess(''); }} style={{ marginTop: 16 }}>
          <Text style={{ color: '#1a8c4a', textAlign: 'center' }}>
            {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const inputStyle = {
  flex: 1,
  borderWidth: 1,
  borderColor: '#ddd',
  borderRadius: 8,
  padding: 12,
  marginTop: 12,
  fontSize: 16,
  backgroundColor: '#fafafa',
};

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
      <NavigationIndependentTree>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name='productDetails' component={ProductDetails as any}   />
        </Stack.Navigator>
      </NavigationContainer>
      </NavigationIndependentTree>
    </ApolloProvider>
  );
}

function MainTabs() {
  return (
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
  );
}
