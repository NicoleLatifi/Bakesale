import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";

import ajax from "../ajax";
import { displayPrice } from "../utils";

const DealDetail = ({ initialDealData, onBack }) => {
  const [deal, setDeal] = useState(initialDealData);

  useEffect(() => {
    const fetchDealDetailData = async () => {
      const data = await ajax.fetchDealDetail(deal.key);
      setDeal(data);
    };
    fetchDealDetailData();
  }, []);

  return (
    <View style={styles.deal}>
      <TouchableOpacity onPress={onBack}>
        <Text style={styles.backLink}>Back</Text>
      </TouchableOpacity>
      <Image source={{ uri: deal.media[0] }} style={styles.image} />
      <View style={styles.detail}>
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
};

export default DealDetail;

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 30,
    height: 60,
    width: 60,
  },
  backLink: {
    color: "#22f",
    marginBottom: 5,
  },
  cause: {
    flex: 2,
  },
  deal: {
    marginHorizontal: 12,
  },
  footer: {
    flexDirection: "row",
  },
  image: {
    backgroundColor: "#ccc",
    height: 150,
    width: "100%",
  },
  detail: {
    backgroundColor: "#fff",
    borderColor: "#bbb",
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

DealDetail.propTypes = {
  initialDealData: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
};
