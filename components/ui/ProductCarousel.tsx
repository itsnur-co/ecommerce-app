import React from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';

const { width } = Dimensions.get('window');

interface ProductCarouselProps<T> {
  data: T[];
  renderItem: ({ item, index }: { item: T; index: number }) => React.ReactElement;
  itemWidth?: number;
}

const ProductCarousel = <T extends unknown>({ data, renderItem, itemWidth = 170 }: ProductCarouselProps<T>) => {
  return (
    <View style={styles.carouselContainer}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carousel}
        snapToInterval={itemWidth}
        decelerationRate="fast"
        getItemLayout={(_, index) => ({ length: itemWidth, offset: itemWidth * index, index })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    marginVertical: 8,
  },
  carousel: {
    paddingLeft: 8,
  },
});

export default ProductCarousel; 