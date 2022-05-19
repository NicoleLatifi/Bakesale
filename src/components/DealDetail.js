import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types'

import ajax from '../ajax'
import { displayPrice } from "../utils";

const DealDetail = ({initialDealData}) => {
  const [deal, setDeal] = useState(initialDealData)

  useEffect(() => {
    const fetchDealDetailData = async () => {
      const data = await ajax.fetchDealDetail(deal.key);
      setDeal(data);
    };
    fetchDealDetailData();
  }, [])

  return (
    <View style={styles.deal}>
      <Image source={{ uri: deal.media[0] }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{deal.title}</Text>
        <View style={styles.footer}>
          <Text style={styles.cause}>{deal.cause.name}</Text>
          <Text style={styles.price}>{displayPrice(deal.price)}</Text>
        </View>
        {deal.user && (
          <View>
            <Image source={{ uri: deal.user.avatar }} style={styles.avatar} />
            <Text>{deal.user.name}</Text>
          </View>
        )}
        <View>
          <Text>{deal.description}</Text>
        </View>
      </View>
    </View>
  );
}

export default DealDetail;

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 30,
    height: 60,
    width: 60,
  },
  cause: {
    flex: 2,
  },
  deal: {
    marginHorizontal: 12,
    marginTop: 50,
  },
  footer: {
    flexDirection: "row",
  },
  image: {
    backgroundColor: "#ccc",
    height: 150,
    width: "100%",
  },
  info: {
    backgroundColor: "#fff",
    borderColor: "#bbb",
    borderTopWidth: 0,
    borderWidth: 1,
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  price: {
    flex: 1,
    textAlign: "right",
  },
});

const propTypes = {
  initialDealData: PropTypes.object.isRequired,
}