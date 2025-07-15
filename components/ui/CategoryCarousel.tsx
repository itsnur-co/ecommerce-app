import { COLORS } from "@/constants/theme";
import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";

interface Category {
  id: string;
  name: string;
}

interface Props {
  categories: Category[];
  selectedId: string;
  onSelect: (id: string) => void;
}

const ITEM_WIDTH = 80;

const CategoryCarousel: React.FC<Props> = ({
  categories,
  selectedId,
  onSelect,
}) => {
  return (
    <FlatList
      data={categories}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.carousel}
      renderItem={({ item }) => {
        const isSelected = selectedId === item.id;
        return (
          <TouchableOpacity
            style={[styles.item, isSelected && styles.selected]}
            onPress={() => onSelect(item.id)}
          >
            <Text style={[styles.label, isSelected && styles.selectedLabel]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      }}
      getItemLayout={(_, index) => ({
        length: ITEM_WIDTH,
        offset: ITEM_WIDTH * index,
        index,
      })}
    />
  );
};

const styles = StyleSheet.create({
  carousel: {
    marginVertical: 8,
    gap: 5,
    paddingLeft: 8,
  },
  item: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 7,
    alignItems: "center",
    padding: 3,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#222",
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    marginHorizontal: 4,
    width: ITEM_WIDTH + 30,
  },
  selected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
  label: {
    fontSize: 16,
    color: "#222",
    fontWeight: "500",
  },
  selectedLabel: {
    color: "#fff",
  },
});

export default CategoryCarousel;
