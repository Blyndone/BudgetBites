import {
  Alert,
  Modal,
  View,
  Pressable,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Button,
  FlatList,
  StatusBar,
} from 'react-native';

import React, { useEffect, useState } from 'react';
import { Searchbar, Icon } from 'react-native-paper';
import images from '../../../assets/testimages/ImageIndex.js';
import { REACT_APP_ADDRESS } from '@env';
import Auth from '.././Persist';
import ProfileButton from '../Components/ProfleButton.js';
import ListItem from '../Components/ListItem.js';
import { getItem } from 'expo-secure-store';

const BuyerMainView = ({ navigation, route }) => {
  //=========================
  // USER AUTH AND PAGE TYPE
  const pagetype = 'buyer';
  const [userdata, setUserData] = React.useState('');
  useEffect(() => {
    Auth(route.params.data.user_name).then((resp) => {
      try {
        r = JSON.parse(resp);
        if (r.status != 'Accepted' || route.params.data.user_type != pagetype) {
          navigation.navigate('Splash');
        }
        // console.log(r.status);
        // console.log(resp);
      } catch (err) {
        console.log(err);
      }
    });

    setUserData({
      user_name: route.params.data.user_name,
      user_type: route.params.data.user_type,
      user_id: route.params.data.user_id,
    });
    navigation.setOptions({
      headerRight: () => (
        <ProfileButton
          navigation={navigation}
          data={{
            user_name: route.params.data.user_name,
            user_type: route.params.data.user_type,
          }}
        />
      ),
    });
  }, []);
  //=========================

  const [modalVisible, setModalVisible] = useState(false);
  const [itemName, setItemName] = useState(0);
  const [itemDescripton, setItemDescription] = useState(0);
  const [itemImage, setItemImage] = useState(0);
  const [itemPrice, setItemPrice] = useState(0);
  const [itemID, setItemID] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const [searchQuery, setSearchQuery] = React.useState('');

  const GetItems = async () => {
    try {
      const response = await fetch(`${REACT_APP_ADDRESS}/items`);
      const json = await response.json();
      console.log(searchQuery);
      console.log(searchQuery.length);

      if (!(searchQuery.length === 0)) {
        let results = Object.values(json.items).filter(
          (item) =>
            String(item.name)
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            String(item.description)
              .toLowerCase()
              .includes(searchQuery.toLowerCase()),
        );
        setData(results);
      } else {
        setData(json.items);
      }
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
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{itemName}</Text>

            <View style={{ padding: 10 }}></View>
            <Image
              source={images[itemID]}
              style={{
                width: 150,
                height: 150,
              }}
            />
            <View style={{ padding: 10 }}></View>
            <Text style={styles.modalText}>{itemDescripton}</Text>
            <View style={{ padding: 10 }}></View>
            <Text style={styles.modalPrice}>${itemPrice}</Text>
            <View style={{ padding: 10 }}></View>
            <View style={{ flexDirection: 'row' }}>
              <Button
                mode="contained"
                title="Close"
                color="#eb6b34"
                onPress={() => setModalVisible(!modalVisible)}
              ></Button>
              <View style={{ padding: 10 }}></View>
              <Button
                mode="contained"
                title="Reserve"
                color="#eb6b34"
                onPress={() => {
                  console.log('PRESS');

                  fetch(`${REACT_APP_ADDRESS}/reservation`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      buyerID: userdata.user_id,
                      itemID: itemID,
                    }),
                  }).then(() => {
                    GetItems();
                  });
                  setModalVisible(!modalVisible);
                }}
              ></Button>
            </View>
          </View>
        </View>
      </Modal>

      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 20,
          color: 'black',
        }}
      >
        {' '}
        BUYER List of Items
      </Text>

      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        onIconPress={GetItems}
        onSubmitEditing={GetItems}
        icon="camera"
      />
      <FlatList
        data={data}
        keyExtractor={({ itemID }) => itemID}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() => {
                setItemName(item.name);
                setItemImage(item.img);
                setItemID(item.itemID);
                setItemDescription(item.description);
                setItemPrice(item.price);
                setModalVisible(true);
              }}
            >
              <ListItem item={item} />
            </Pressable>
          );
        }}
      />

      <View style={[styles.bottomContaier]}>
        <Button
          mode="contained"
          title="My Reservations"
          color="#eb6b34"
          style={[styles.bottomButton]}
          onPress={() => {
            console.log('Button Press');
            navigation.navigate({
              name: 'Buyer Reservations',
              params: { data: userdata },
            });
          }}
        ></Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'teal',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    flex: 1,
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 16,
    height: 100,
    width: 360,
    flexDirection: 'row',
    // justifyContent: 'flex-end',
    alignItems: 'center',
    borderWidth: 5,
    backgroundColor: '#fca503',
  },
  itemreserved: {
    flex: 1,
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 16,
    height: 100,
    width: 360,
    flexDirection: 'row',
    // justifyContent: 'flex-end',
    alignItems: 'center',
    borderWidth: 5,
    backgroundColor: '#fc6f03',
  },
  titleText: {
    fontSize: 50,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
  },
  button: {
    color: '#f194ff',
    backgroundColor: '#f194ff',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  instance: {
    textAlign: 'auto',
    flexBasis: 120,
    flexGrow: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'mediumturquoise',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
  },
  modalText: {
    fontSize: 15,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'normal',
    fontFamily: 'Helvetica',
  },
  modalPrice: {
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
  },
  button: {
    color: '#f194ff',
    backgroundColor: '#f194ff',
  },
  bottomContaier: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  bottomButton: {},
});

export default BuyerMainView;
