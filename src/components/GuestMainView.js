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
  Linking,
  TouchableOpacity,
  Platform,
} from 'react-native';

import React, { useEffect, useState } from 'react';
import { Searchbar, Icon, Button, Switch } from 'react-native-paper';
import images from '../../assets/testimages/ImageIndex.js';
import { REACT_APP_ADDRESS } from '@env';
import * as SecureStore from 'expo-secure-store';
import ListItem from './Components/ListItem.js';
import DropDownPicker from 'react-native-dropdown-picker';
const GuestMainView = ({ navigation, route }) => {
  const [itemModalVisible, setItemModalVisible] = useState(false);
  const [locationModalVisible, setLocationModalVisible] = useState(false);

  const [itemData, setItemData] = useState({
    itemName: '',
    itemDescripton: '',
    itemImage: '',
    itemPrice: '',
    itemID: '',
    itemLocation: '',
    itemDuration: '',
  });

  const [locationData, setLocationData] = useState([
    {
      name: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      phone_number: '',
      email: '',
      website: '',
    },
  ]);

  // Search config
  // ==================
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isNear, setIsNear] = React.useState(false);
  const [isSoon, setIsSoon] = React.useState(false);

  const onToggleNear = () => {
    setIsNear(!isNear);
  };
  const onToggleSoon = () => {
    setIsSoon(!isSoon);
  };

  const [open, setOpen] = useState(false);

  const [category_text, setCategory] = useState('Any');
  const [items, setItems] = useState([
    { label: 'Any', value: 'Any' },
    { label: 'Beef', value: 'Beef' },
    { label: 'Poultry', value: 'Poultry' },
    { label: 'Pork', value: 'Pork' },
    { label: 'Fish', value: 'Fish' },
    { label: 'Veggies', value: 'Veggies' },
    { label: 'Dairy', value: 'Dairy' },
  ]);

  // ============

  //=============
  //Get Items Block
  const [saveddata, setSavedData] = useState('');
  const [data, setData] = useState([]);

  const GetItems = async () => {
    try {
      let results;
      if (saveddata.length == 0) {
        const response = await fetch(`${REACT_APP_ADDRESS}/items`);
        const json = await response.json();
        results = Object.values(json.items);
        setSavedData(results);
      } else {
        results = saveddata;
      }

      if (!(searchQuery.length === 0)) {
        results = results.filter(
          (item) =>
            String(item.name)
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            String(item.description)
              .toLowerCase()
              .includes(searchQuery.toLowerCase()),
        );
      }

      if (isSoon) {
        results = filterSoon(results);
      }
      if (isNear) {
        console.log('NEAR');
      }
      if (category_text != 'Any') {
        results = filterCategory(results);
      }

      setData(results);
    } catch (error) {
      console.error(error);
    }
  };

  const GetLocation = async (itemID) => {
    const response = await fetch(`${REACT_APP_ADDRESS}/location/${itemID}`);
    const json = await response.json();
    results = Object.values(json.items);
    console.log(results);
    setLocationData(results);
  };

  const filterSoon = (results) => {
    const cur = new Date();
    results = results.filter((item) => {
      const exp = new Date(item.expiration);
      return parseInt((exp - cur) / 86400000) < 10;
    });
    return results;
  };

  const filterNear = (results) => {
    return results;
  };

  const filterCategory = (results) => {
    results = results.filter((item) => {
      return category_text == item.category;
    });
    return results;
  };

  useEffect(() => {
    GetItems();
  }, [isNear]);

  useEffect(() => {
    GetItems();
  }, [isSoon]);

  //================

  useEffect(() => {
    GetItems();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ItemModal
        modalVisible={itemModalVisible}
        setModalVisible={setItemModalVisible}
        itemData={itemData}
        setLocationModalVisible={setLocationModalVisible}
        locationModalVisible={locationModalVisible}
        locationData={locationData}
      />
      <LocationModal
        modalVisible={itemModalVisible}
        setModalVisible={setItemModalVisible}
        locationData={locationData[0]}
        setLocationModalVisible={setLocationModalVisible}
        locationModalVisible={locationModalVisible}
        itemData={itemData}
      />

      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 20,
          color: 'black',
        }}
      >
        List of Items {route.params?.user}
      </Text>

      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        onIconPress={GetItems}
        onSubmitEditing={GetItems}
        icon="magnify"
        contain
        style={{
          height: 38,
          borderColor: 'teal',
          borderWidth: 1,
          backgroundColor: 'white',
          margin: 6,
        }}
        inputStyle={{
          minHeight: 0, // Add this
        }}
      />
      <View style={styles.searchconfigcontainer}>
        <View style={styles.searchconfigswitch}>
          <Switch color="#eb6b34" value={isNear} onValueChange={onToggleNear} />
          <Text style={styles.searchconfigtext}>Nearby Me</Text>
        </View>
        <View style={styles.searchconfigswitch}>
          <Switch color="#eb6b34" value={isSoon} onValueChange={onToggleSoon} />
          <Text style={styles.searchconfigtext}>Expiring Soon</Text>
        </View>
        <View style={styles.searchconfigdropdown}>
          <DropDownPicker
            style={{
              backgroundColor: '#E7E0EC',
              borderColor: '#00000000',
              borderTopEndRadius: 5,
              borderTopStartRadius: 5,
              borderRadius: 0,
            }}
            dropDownContainerStyle={{
              backgroundColor: '#decceb',
              borderColor: '#00000000',
              borderTopColor: 'black',
            }}
            open={open}
            value={category_text}
            items={items}
            setOpen={setOpen}
            setValue={setCategory}
            setItems={setItems}
            listMode="SCROLLVIEW"
            dropDownDirection="BOTTOM"
            placeholder={'Category'}
            onChangeValue={(value) => {
              GetItems();
            }}
          />
        </View>
      </View>
      <FlatList
        data={data}
        keyExtractor={({ itemID }) => itemID}
        ListFooterComponent={<View style={{ padding: 25 }}></View>}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() => {
                const exp = new Date(item.expiration);
                const cur = new Date();

                setItemData({
                  itemName: item.name,
                  itemDescripton: item.description,
                  itemImage: item.img,
                  itemPrice: item.price,
                  itemID: item.itemID,
                  itemLocation: item.location,
                  itemDuration: parseInt((exp - cur) / 86400000),
                });
                GetLocation(item.itemID);
                setItemModalVisible(true);
              }}
            >
              <ListItem item={item} />
            </Pressable>
          );
        }}
      />
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
  itemmodalView: {
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
  locationmodalView: {
    margin: 20,
    backgroundColor: '#fca503',
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
  searchconfigcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  searchconfigswitch: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchconfigtext: {
    fontWeight: 'bold',
  },
  searchconfigdropdown: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
  },
  locationdetails: {},
  locationdetailstext: {
    textAlign: 'left',
    fontWeight: '700',
    fontSize: 15,
  },
  locationphonetext: {
    textAlign: 'left',
    fontWeight: '700',
    fontSize: 15,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});

const ItemModal = ({
  modalVisible,
  setModalVisible,
  itemData,
  setLocationModalVisible,
  locationModalVisible,
  locationData,
}) => {
  return (
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
        <View style={styles.itemmodalView}>
          <Text style={styles.modalTitle}>{itemData.itemName}</Text>
          <Text
            style={
              itemData.itemDuration > 10 ? styles.explong : styles.expshort
            }
          >
            {itemData.itemDuration + 1} Days Remaining!
          </Text>

          <View style={{ padding: 10 }}></View>
          <Image
            source={images[itemData.itemImage]}
            style={{
              width: 150,
              height: 150,
            }}
          />
          <View style={{ padding: 10 }}></View>
          <Text style={styles.modalText}>{itemData.itemDescripton}</Text>
          <View style={{ padding: 10 }}></View>
          <Text style={styles.modalPrice}>${itemData.itemPrice}</Text>
          <View style={{ padding: 10 }}></View>
          <View>
            <View>
              <Button
                mode="contained"
                title="Close"
                buttonColor="#eb6b34"
                labelStyle={{ fontSize: 16, color: 'black' }}
                onPress={() => {
                  setLocationModalVisible(!locationModalVisible);
                }}
              >
                Location Information
              </Button>
            </View>
            <View style={{ margin: 5 }}>
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
      </View>
    </Modal>
  );
};
const LocationModal = ({
  locationModalVisible,
  setLocationModalVisible,
  locationData: locationData,
  itemData,
}) => {
  if (!locationData) {
    console.log(locationData);
    console.log(itemData);
    return;
  }
  console.log(locationData);
  return (
    <Modal
      // animationType="fade"
      transparent={true}
      animationType="fade"
      visible={locationModalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!locationModalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.locationmodalView}>
          <Text style={styles.modalTitle}>
            {locationData.name} {'\n'}
          </Text>

          <View style={styles.locationdetails}>
            <View>
              <Text style={styles.locationdetailstext}>{'Address: '}</Text>
              <TouchableOpacity
                onPress={() => {
                  adr =
                    'http://maps.google.com/?q=' +
                    locationData.address +
                    '+' +
                    locationData.city +
                    '+' +
                    locationData.state +
                    '+' +
                    locationData.zip;
                  Linking.openURL(adr);
                }}
              >
                <Text style={styles.locationphonetext}>
                  {locationData.address} {'\n'}
                  {locationData.city}, {locationData.state} {locationData.zip}{' '}
                  {'\n'}
                </Text>
              </TouchableOpacity>
            </View>

            <View>
              <Text style={styles.locationdetailstext}>{'Phone: '}</Text>
              <TouchableOpacity
                onPress={() => {
                  this.dialCall(locationData.phone_number);
                }}
              >
                <Text style={styles.locationphonetext}>
                  {locationData.phone_number}
                  {'\n'}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.locationdetailstext}>Website:</Text>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(locationData.website);
                }}
              >
                <Text style={styles.locationphonetext}>
                  {locationData.website}
                  {'\n'}
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.locationdetailstext}>
              Email: {'\n'}
              {locationData.email}
            </Text>
          </View>
          <View style={{ padding: 10 }}></View>
          <View style={{ flexDirection: 'row' }}>
            <Button
              mode="contained"
              title="Close"
              buttonColor="#eb6b34"
              labelStyle={{ fontSize: 16, color: 'black' }}
              onPress={() => setLocationModalVisible(!locationModalVisible)}
            >
              Close
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};
dialCall = (number) => {
  let phoneNumber = '';
  if (Platform.OS === 'android') {
    phoneNumber = `tel:${number}`;
  } else {
    phoneNumber = `telprompt:${number}`;
  }
  Linking.openURL(phoneNumber);
};
export default GuestMainView;
