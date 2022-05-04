import React from 'react';
import PropTypes from 'prop-types'

import { StyleSheet, Text, View } from 'react-native';

export default function DealList({ deals }) {
  return (
    <View style={styles.list}>
      {deals.map((deal) => {
        return <Text key={deal.key}>{deal.title}</Text>
      })}
    </View>
  )
}

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