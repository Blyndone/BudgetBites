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
import { Searchbar, Icon, Button, Switch } from 'react-native-paper';
import images from '../../assets/testimages/ImageIndex.js';
import { REACT_APP_ADDRESS } from '@env';
import * as SecureStore from 'expo-secure-store';
import ListItem from './Components/ListItem.js';
import DropDownPicker from 'react-native-dropdown-picker';
const GuestMainView = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [itemName, setItemName] = useState(0);
  const [itemDescripton, setItemDescription] = useState(0);
  const [itemImage, setItemImage] = useState(0);
  const [itemPrice, setItemPrice] = useState(0);
  const [itemID, setItemID] = useState(0);
  const [itemLocation, setItemLocation] = useState('');
  const [itemDuration, setDuration] = useState(0);

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const [searchQuery, setSearchQuery] = React.useState('');
  // Search config
  // ==================
  const [isNear, setIsNear] = React.useState(false);
  const [isSoon, setIsSoon] = React.useState(false);

  const onToggleNear = () => {
    setIsNear(!isNear);
  };
  const onToggleSoon = () => {
    setIsSoon(!isSoon);
  };

  const [open, setOpen] = useState(false);

  const [category_text, setCategory] = useState(null);
  const [items, setItems] = useState([
    { label: 'All', value: 'All' },
    { label: 'Beef', value: 'Beef' },
    { label: 'Poultry', value: 'Poultry' },
    { label: 'Pork', value: 'Pork' },
    { label: 'Fish', value: 'Fish' },
    { label: 'Veggies', value: 'Veggies' },
    { label: 'Dairy', value: 'Dairy' },
  ]);
  // ============
  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      alert("🔐 Here's your value 🔐 \n" + result);
    } else {
      alert('No values stored under that key.');
    }
  }

  const GetItems = async () => {
    try {
      const response = await fetch(`${REACT_APP_ADDRESS}/items`);
      const json = await response.json();
      console.log(searchQuery);
      console.log(searchQuery.length);
      let results = Object.values(json.items);

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

      setData(results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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

  useEffect(() => {
    GetItems();
  }, []);
  useEffect(() => {
    GetItems();
  }, [isNear]);

  useEffect(() => {
    GetItems();
  }, [isSoon]);

  return (
    <SafeAreaView style={styles.container}>
      <ItemModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        itemName={itemName}
        itemImage={itemImage}
        itemDescripton={itemDescripton}
        itemPrice={itemPrice}
        itemID={itemID}
        itemLocation={itemLocation}
        itemDuration={itemDuration}
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

                setItemName(item.name);
                setItemImage(item.img);
                setItemID(item.itemID);
                setItemDescription(item.description);
                setItemPrice(item.price);
                setItemLocation(item.location);
                setDuration(parseInt((exp - cur) / 86400000));
                setModalVisible(true);
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
});

const ItemModal = ({
  modalVisible,
  setModalVisible,
  itemName,
  itemImage,
  itemDescripton,
  itemPrice,
  itemID,
  itemLocation,
  itemDuration,
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
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>{itemName}</Text>
          <Text style={styles.modalTitle}>{itemLocation}</Text>
          <Text style={itemDuration > 10 ? styles.explong : styles.expshort}>
            {itemDuration + 1} Days Remaining!
          </Text>

          <View style={{ padding: 10 }}></View>
          <Image
            source={images[itemImage]}
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
  );
};

export default GuestMainView;
