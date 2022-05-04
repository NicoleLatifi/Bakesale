import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ajax from './src/ajax';
import DealList from './src/components/DealList';

export default function App() {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    const fetchDeals = async () => {
      const data = await ajax.fetchInitialDeals();
      setDeals(data);
    }
    fetchDeals();
  }, [])

  return (
    <View style={styles.container}>
      {deals.length > 0 ? (
        <DealList deals={deals} />
      ) : (
        <Text style={styles.header}>Bakesale</Text>
      )}
      <StatusBar style="auto" />
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
