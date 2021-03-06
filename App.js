import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ajax from "./src/ajax";
import DealList from "./src/components/DealList";
import DealDetail from "./src/components/DealDetail";
import SearchBar from "./src/components/SearchBar";

export default function App() {
  const [currentDealId, setCurrentDealId] = useState(null);
  const [deals, setDeals] = useState([]);
  const [dealsFromSearch, setDealsFromSearch] = useState([]);

  const titleXPos = useRef(new Animated.Value(0)).current;

  const dealsToDisplay = dealsFromSearch.length > 0 ? dealsFromSearch : deals;

  const unsetCurrentDeal = () => setCurrentDealId(null);

  const searchDeals = async (searchTerm) => {
    let dealsFromSearch = [];
    if (searchTerm) {
      dealsFromSearch = await ajax.fetchDealsSearchResults(searchTerm);
    }
    setDealsFromSearch(dealsFromSearch);
  };

  const animatedTitle = (direction = 1) => {
    const width = Dimensions.get("window").width;
    Animated.timing(titleXPos, {
      toValue: (direction * (width - 150)) / 2,
      duration: 2000,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        animatedTitle(-1 * direction);
      }
    });
  };

  useEffect(() => {
    animatedTitle();
    const fetchDeals = async () => {
      const data = await ajax.fetchInitialDeals();
      setDeals(data);
    };
    fetchDeals();
  }, []);

  const currentDeal = () => {
    return deals.find((deal) => deal.key === currentDealId);
  };

  if (currentDealId) {
    return (
      <View style={styles.main}>
        <DealDetail initialDealData={currentDeal()} onBack={unsetCurrentDeal} />
      </View>
    );
  }
  if (dealsToDisplay.length > 0) {
    return (
      <View style={styles.main}>
        <SearchBar searchDeals={searchDeals} />
        <DealList deals={dealsToDisplay} onItemPress={setCurrentDealId} />
      </View>
    );
  }

  return (
    <Animated.View style={[{ left: titleXPos }, styles.container]}>
      <Text style={styles.header}>Bakesale</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 40,
  },
  main: {
    marginTop: 50,
  },
});
