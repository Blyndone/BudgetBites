import {
  Alert,
  Modal,
  View,
  Pressable,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  StatusBar,
} from 'react-native';

import React, { useEffect, useState } from 'react';
import { Searchbar, Icon, Button, Surface, Checkbox } from 'react-native-paper';
import images from '../../../assets/testimages/ImageIndex.js';
import { REACT_APP_ADDRESS } from '@env';
import Auth from '.././Persist';
import ProfileButton from '../Components/ProfleButton.js';
import ListItem from '../Components/ListItem.js';
import { useFocusEffect } from '@react-navigation/native';
const SellerMainView = ({ navigation, route }) => {
  //=========================
  // USER AUTH AND PAGE TYPE
  const pagetype = 'seller';
  const [userdata, setUserData] = React.useState('');
  useEffect(() => {
    Auth(route.params.data.user_name).then((resp) => {
      try {
        r = JSON.parse(resp);
        // if (r.status != 'Accepted' || route.params.data.user_type != pagetype) {
        //   navigation.navigate('Splash');
        // }
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
            user_id: route.params.data.user_id,
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
  const [itemDuration, setDuration] = useState(0);
  const [itemstatus, setItemStatus] = useState(0);

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const [checked, setChecked] = React.useState({});
  const [showDeleteCheckbox, setShowCheckbox] = React.useState(false);

  const GetItems = async () => {
    try {
      const response = await fetch(
        `${REACT_APP_ADDRESS}/listing/${route.params.data.user_name}`,
      );
      const json = await response.json();

      setData(json.items);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      GetItems();
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{itemName}</Text>
            <Text style={itemDuration > 10 ? styles.explong : styles.expshort}>
              {itemDuration + 1} Days Remaining!{' '}
            </Text>
            <View style={{ padding: 10 }}></View>
            <View>
              <Image
                source={require('../../../assets/testimages/0.png')}
                style={{
                  width: 150,
                  height: 150,
                  position: 'absolute',
                  zIndex: 0,
                }}
              />
              <Image
                source={images[itemImage]}
                style={{
                  width: 150,
                  height: 150,
                }}
              />
            </View>
            <View style={{ padding: 10 }}></View>
            <Text style={styles.modalText}>{itemDescripton}</Text>
            <View style={{ padding: 10 }}></View>
            <Text style={styles.modalPrice}>${itemPrice}</Text>
            <View style={{ padding: 10 }}></View>
            <View style={{ flexDirection: 'row' }}>
              {itemstatus != 'Available' ? (
                <View>
                  <Button
                    mode="contained"
                    title="Delete Reservation"
                    buttonColor="#eb6b34"
                    labelStyle={{ fontSize: 16, color: 'black' }}
                    onPress={() => {
                      fetch(`${REACT_APP_ADDRESS}/reservation/${itemID}`, {
                        method: 'DELETE',
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
                  >
                    Delete Reservation
                  </Button>
                </View>
              ) : (
                ''
              )}
              {itemstatus != 'Available' ? (
                <View style={{ padding: 10 }}></View>
              ) : (
                ''
              )}
              <View>
                <Button
                  mode="contained"
                  title="Delete Listing"
                  buttonColor="#eb6b34"
                  labelStyle={{ fontSize: 16, color: 'black' }}
                  onPress={() => {
                    fetch(`${REACT_APP_ADDRESS}/items/${itemID}`, {
                      method: 'DELETE',
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
                >
                  Delete Listing
                </Button>
              </View>
            </View>
            <View style={{ padding: 5 }}></View>
            <View>
              <Button
                mode="contained"
                title="Close"
                buttonColor="#eb6b34"
                labelStyle={{ fontSize: 16, color: 'black' }}
                onPress={() => setModalVisible(!modalVisible)}
              >
                Close
              </Button>
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
        SELLER List of Items
      </Text>
      <FlatList
        data={data}
        // keyExtractor={(item) => item.itemID}
        ListFooterComponent={<View style={{ padding: 25 }}></View>}
        renderItem={({ item }) => {
          const ID = item.itemID;
          return (
            <View>
              {showDeleteCheckbox ? (
                <View style={styles.checkbox}>
                  <Checkbox
                    color="black"
                    uncheckedColor="black"
                    backgroundColor="#eb6b34"
                    status={checked[ID] ? 'checked' : 'unchecked'}
                    onPress={() => {
                      pending = true;
                      setChecked({
                        ...checked,
                        [ID]: !checked[ID],
                      });
                    }}
                  />
                </View>
              ) : (
                <View></View>
              )}
              <Pressable
                onPress={() => {
                  const exp = new Date(item.expiration);
                  const cur = new Date();
                  setItemName(item.name);
                  setItemImage(item.img);
                  setItemID(item.itemID);
                  setItemDescription(item.description);
                  setItemPrice(item.price);
                  setDuration(parseInt((exp - cur) / 86400000));
                  setItemStatus(item.status);

                  setModalVisible(true);
                }}
              >
                <ListItem item={item} overlay={checked[ID]} />
              </Pressable>
            </View>
          );
        }}
      />
      <Surface elevation={5} style={[styles.bottomContaier]}>
        <Button
          mode="contained"
          title="Create Listing"
          buttonColor="#eb6b34"
          labelStyle={{ fontSize: 16, color: 'black' }}
          onPress={() => {
            navigation.navigate({
              name: 'Seller Create Listing',
              params: { data: userdata },
            });
          }}
        >
          Create Listing
        </Button>
      </Surface>
      <Surface elevation={5} style={[styles.bottomContaierLeft]}>
        <Button
          mode="contained"
          title="Mass Delete"
          buttonColor={showDeleteCheckbox ? '#ff2200' : '#eb6b34'}
          labelStyle={{ fontSize: 16, color: 'black' }}
          onPress={() => {
            setShowCheckbox(!showDeleteCheckbox);
            if (showDeleteCheckbox) {
              var keys = Object.keys(checked);

              var filtered = keys.filter(function (key) {
                return checked[key];
              });

              console.log(filtered);

              fetch(`${REACT_APP_ADDRESS}/items/${filtered}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  buyerID: userdata.user_id,
                  itemID: itemID,
                }),
              }).then(() => {
                console.log(checked);
                setChecked({});
                GetItems();
              });
            }
          }}
        >
          Mass Delete{' '}
          {showDeleteCheckbox
            ? '(' +
              Object.values(checked).reduce((a, item) => a + item, 0) +
              ')'
            : ''}
        </Button>
      </Surface>
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
    borderRadius: 20,
  },
  bottomContaierLeft: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    borderRadius: 20,
  },
  checkbox: {
    position: 'absolute',
    top: 38,
    borderRadius: 20,
    zIndex: 1,
  },
  explong: {
    textAlign: 'center',
    // flexBasis: 120,

    textDecorationStyle: 'solid',
    fontWeight: 'bold',
    color: 'green',
    fontSize: 20,
  },
  expshort: {
    textAlign: 'center',
    // flexBasis: 120,

    textDecorationStyle: 'solid',
    fontWeight: 'bold',
    color: 'red',
    fontSize: 20,
  },
  bottomButton: {},
});

export default SellerMainView;
