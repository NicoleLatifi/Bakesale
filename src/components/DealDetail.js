import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PropTypes from "prop-types";

import ajax from "../ajax";
import { displayPrice } from "../utils";

const DealDetail = ({ initialDealData, onBack }) => {
  const width = Dimensions.get("window").width;
  const imageXPos = useRef(new Animated.Value(0)).current;

  const imagePanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gs) => {
      imageXPos.setValue(gs.dx);
    },
    onPanResponderRelease: (evt, gs) => {
      if (Math.abs(gs.dx) > width * 0.4) {
        const direction = Math.sign(gs.dx);
        Animated.timing(imageXPos, {
          toValue: direction * width,
          duration: 250,
          useNativeDriver: false,
        }).start(() => handleSwipe(-1 * direction));
      } else {
        Animated.spring(imageXPos, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  const handleSwipe = (indexDirection) => {
    if (!deal.media[imageIndex + indexDirection]) {
      Animated.spring(imageXPos, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
      return;
    }

    setImageIndex(imageIndex + indexDirection);
    imageXPos.setValue(indexDirection * width);
    Animated.spring(imageXPos, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  const [deal, setDeal] = useState(initialDealData);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const fetchDealDetailData = async () => {
      const data = await ajax.fetchDealDetail(deal.key);
      setDeal(data);
    };
    fetchDealDetailData();
  }, []);

  return (
    <>
      <TouchableOpacity onPress={onBack}>
        <Text style={styles.backLink}>Back</Text>
      </TouchableOpacity>
      <Animated.Image
        {...imagePanResponder.panHandlers}
        source={{ uri: deal.media[imageIndex] }}
        style={[{ left: imageXPos }, styles.image]}
      />
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
    </>
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
