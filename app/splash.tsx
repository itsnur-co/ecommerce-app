import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import styles from './splash.styles';

const { width } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('../assets/images/Splash-background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.centerContent}>
        <Text style={styles.title}>HAQIQAT</Text>
        <Text style={styles.tagline}>Discover your signature style</Text>
      </View>
      <TouchableOpacity
        style={styles.buttonContainer}
        activeOpacity={0.8}
        onPress={() => router.replace('/home')}
      >
        <View style={styles.button}>
          <Text style={styles.buttonText}>Get Started</Text>
          <Ionicons name="chevron-forward" size={32} color="#fff" style={styles.arrow} />
        </View>
      </TouchableOpacity>
    </ImageBackground>
  );
} 