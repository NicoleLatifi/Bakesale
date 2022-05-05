import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types'

import DealItem from './DealItem'

const DealList = ({ deals }) => {
  return (
    <View style={styles.list}>
      <FlatList 
        data={deals} 
        renderItem={({item}) => <DealItem deal={item} />}
      />
    </View>
  )
}

export default DealList;

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#eee',
    flex: 1,
    width: '100%',
    paddingTop: 50,
  }
})

DealList.propTypes = {
  deals: PropTypes.array.isRequired
}