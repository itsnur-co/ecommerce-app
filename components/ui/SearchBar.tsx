import { BORDER_RADIUS, COLORS } from "@/constants/theme";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

interface SearchBarProps {
  search: string;
  setSearch: (v: string) => void;
  onFilterPress?: () => void;
  showFilterIcon?: boolean;
}

const SearchBar = ({
  search,
  setSearch,
  onFilterPress,
  showFilterIcon,
}: SearchBarProps) => {
  return (
    <View style={styles.searchBarRow}>
      <View style={styles.searchBarContainer}>
        <Feather name="search" size={28} color={COLORS.black} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          placeholderTextColor={COLORS.textGray}
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity
            onPress={() => setSearch("")}
            style={styles.clearButton}
          >
            <AntDesign name="closecircleo" size={24} color="white" />
          </TouchableOpacity>
        )}
      </View>
      {showFilterIcon && (
        <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
          <Feather name="sliders" size={24} color={COLORS.white} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    marginHorizontal: 10,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.black,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.white,
    paddingVertical: 6,
    height: 55,
    paddingHorizontal: 10,
    flex: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    color: "#222",
    backgroundColor: "transparent",
  },
  clearButton: {
    padding: 4,
  },
  filterButton: {
    marginLeft: 8,
    backgroundColor: COLORS.black,
    height: 55,
    width: 55,
    borderRadius: BORDER_RADIUS.md,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SearchBar;
