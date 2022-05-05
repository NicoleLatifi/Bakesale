import React from 'react';
import {Image, Text, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import { displayPrice } from '../utils';
import { borderLeftColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

const DealItem = ({ deal }) => {
  return (
    <View style={styles.deal}>
      <Image source={{ uri: deal.media[0] }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{deal.title}</Text>
        <View style={styles.footer}>
          <Text style={styles.cause}>{deal.cause.name}</Text>
          <Text style={styles.price}>{displayPrice(deal.price)}</Text>
        </View>
      </View>
    </View>
  );
}

export default DealItem;

const styles = StyleSheet.create({
  cause: {
    flex: 2,
  },
  deal: {
    marginHorizontal: 12,
    marginTop: 12,
  },
  footer: {
    flexDirection: 'row',
  },
  image: {
    backgroundColor: "#ccc",
    height: 150,
    width: '100%',
  },
  info: {
    backgroundColor: "#fff",
    borderColor: '#bbb',
    borderTopWidth: 0,
    borderWidth: 1,
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    flex: 1,
    textAlign: 'right',
  }
})

DealItem.propTypes = {
  deal: PropTypes.object.isRequired,
}