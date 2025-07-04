import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

interface SearchBarProps {
  search: string;
  setSearch: (v: string) => void;
  onFilterPress?: () => void;
  showFilterIcon?: boolean;
}

const SearchBar = ({ search, setSearch, onFilterPress, showFilterIcon }: SearchBarProps) => {
  return (
    <View style={styles.searchBarRow}>
      <View style={styles.searchBarContainer}>
        <Feather name="search" size={28} color="white" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          placeholderTextColor="#fff"
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')} style={styles.clearButton}>
            <AntDesign name="closecircleo" size={24} color="white" />
          </TouchableOpacity>
        )}
      </View>
      {showFilterIcon && (
        <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
          <Feather name="sliders" size={24} color="#222" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginHorizontal: 10,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 8,
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
    color: '#222',
    backgroundColor: 'transparent',
  },
  clearButton: {
    padding: 4,
  },
  filterButton: {
    marginLeft: 8,
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchBar;