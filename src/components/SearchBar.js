import React, { useState } from "react";
import PropTypes from "prop-types";
import { TextInput, StyleSheet } from "react-native";
import debounce from "lodash.debounce";

const SearchBar = ({ searchDeals }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchDeals = debounce(
    (searchTerm) => searchDeals(searchTerm),
    300
  );

  const handleOnChangeText = (searchTerm) => {
    setSearchTerm(searchTerm);
    debouncedSearchDeals(searchTerm);
  };

  return (
    <TextInput
      onChangeText={handleOnChangeText}
      placeholder="Search All Deals"
      style={styles.input}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginHorizontal: 12,
  },
});

export default SearchBar;

SearchBar.propTypes = {
  searchDeals: PropTypes.func.isRequired,
};
