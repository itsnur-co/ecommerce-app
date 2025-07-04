import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

const SearchBar = ({ search, setSearch }: { search: string; setSearch: (v: string) => void }) => {
  return (
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
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 8,
    marginBottom: 12,
    paddingVertical: 6,
    marginHorizontal:10,
    height: 55,
    paddingHorizontal:10,

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
});

export default SearchBar;