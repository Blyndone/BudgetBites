import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

const ItemsList = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const GetItems = async () => {
    try {
      const response = await fetch('http://10.0.2.2:5000/items');
      const json = await response.json();
      setData(json.items);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetItems();
  }, []);

  return (
    <View>
      <Text>Items</Text>

      <View style={{ flex: 1, padding: 24 }}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({ itemID }) => itemID}
            renderItem={({ item }) => (
              <Text>
                {item.name}: {item.description}
              </Text>
            )}
          />
        )}
      </View>
    </View>
  );
};

export default ItemsList;
