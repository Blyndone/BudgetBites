
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';

const ServerPing = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch('http://10.0.2.2:5000/testtable');
      const json = await response.json();
      setData(json.testtable);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <View>
        <Text>Users</Text>


    <View style={{flex: 1, padding: 24}}>
      {isLoading ? (
          <ActivityIndicator />
          ) : (
              <FlatList
              data={data}
              keyExtractor={({id}) => id}
              renderItem={({item}) => (
                  <Text>
              {item.Name}, {item.Age}
            </Text>
          )}
          />
          )}
    </View>
          </View>
  );
};

export default ServerPing;