import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types'

import DealItem from './DealItem'

const DealList = ({ deals, onItemPress }) => {
  return (
    <View style={styles.list}>
      <FlatList 
        data={deals} 
        renderItem={({item}) => <DealItem deal={item} onPress={onItemPress} />}
      />
    </View>
  )
}

export default DealList;

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#eee',
    width: '100%',
  }
})

DealList.propTypes = {
  deals: PropTypes.array.isRequired,
  onItemPress: PropTypes.func.isRequired,
}