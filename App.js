import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ajax from './src/ajax';
import DealList from './src/components/DealList';
import DealDetail from './src/components/DealDetail';

export default function App() {
  const [deals, setDeals] = useState([]);
  const [currentDealId, setCurrentDealId] = useState(null);

  useEffect(() => {
    const fetchDeals = async () => {
      const data = await ajax.fetchInitialDeals();
      setDeals(data);
    }
    fetchDeals();
  }, [])

  const currentDeal = () => {
    return deals.find(deal => deal.key === currentDealId)
  }

  if (currentDealId) {
    return <DealDetail deal={currentDeal()} />
  }
  if (deals.length > 0) {
    return <DealList deals={deals} onItemPress={setCurrentDealId} />;
  }

  return (
    <View style={styles.container}>
        <Text style={styles.header}>Bakesale</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 40,
  }
});
