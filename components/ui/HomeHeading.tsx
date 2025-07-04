
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


const HomeHeading = () => (
 
  <View style={styles.header}>
  <View>
    <Text style={styles.title}>
      Welcome to Our Store
    </Text>
    <Text style={styles.subtitle}>
      Discover the latest trends and styles
    </Text>
  </View>
</View>
);

export default HomeHeading;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingHorizontal:10,
        paddingVertical: 10,
      },
      title: {
        fontSize: 28,
        fontFamily:"Sagita",
        fontWeight: '500',
        color: '#4F0007',
      },
      subtitle: {
        fontSize: 16,
        color: '#666',
        fontFamily:"Sagita",
        fontWeight: '400',
        marginTop: 4,
      },
    });

