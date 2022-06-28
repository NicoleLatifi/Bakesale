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
      <Text style={styles.title}>{deal.title}</Text>
      <View style={styles.detail}>
        <View style={styles.footer}>
          <View>
            <Text style={styles.price}>{displayPrice(deal.price)}</Text>
            <Text>{deal.cause.name}</Text>
          </View>
          {deal.user && (
            <View>
              <Image source={{ uri: deal.user.avatar }} style={styles.avatar} />
              <Text>{deal.user.name}</Text>
            </View>
          )}
        </View>
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
    alignSelf: "center",
    borderRadius: 30,
    height: 40,
    margin: 8,
    width: 40,
  },
  backLink: {
    color: "#22f",
    marginBottom: 8,
    marginLeft: 8,
  },
  deal: {
    // borderColor: "#dad7cd",
    // borderWidth: 1,
    // marginHorizontal: 12,
  },
  detail: {
    backgroundColor: "#fff",
    padding: 8,
  },
  footer: {
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  image: {
    backgroundColor: "#ccc",
    height: 150,
    width: "100%",
  },
  title: {
    backgroundColor: "#fbc4ab",
    fontSize: 16,
    fontWeight: "bold",
    padding: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
});

DealDetail.propTypes = {
  initialDealData: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
};
