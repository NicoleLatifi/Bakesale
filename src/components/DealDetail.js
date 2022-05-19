import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types'

const DealDetail = ({deal}) => {
  console.log(deal)
  return (
    <View>
      <Text>{deal.title}</Text>
      <Text>{deal.description}</Text>
    </View>
  );
}

export default DealDetail;

const propTypes = {
  deal: PropTypes.object.isRequired,
}