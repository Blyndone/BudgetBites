import {
  Modal,
  View,
  Pressable,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';

import React, { useEffect, useState } from 'react';
import { Searchbar, Button, Switch } from 'react-native-paper';
import images from '../../assets/testimages/ImageIndex.js';
import { REACT_APP_ADDRESS } from '@env';
import ListItem from './Components/ListItem.js';
import DropDownPicker from 'react-native-dropdown-picker';
import PageSelector from './Components/PageSelector.js';

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
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);

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
    setLocationData(results);
  };

  const filterSoon = (results) => {
    setPage(0);
    const cur = new Date();
    results = results.filter((item) => {
      const exp = new Date(item.expiration);
      return parseInt((exp - cur) / 86400000) < 10;
    });
    return results;
  };

  const filterNear = (results) => {
    setPage(0);
    return results;
  };

  const filterCategory = (results) => {
    setPage(0);
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
        <View style={{ padding: 47 }}>
          {/* <Text style={styles.searchconfigtext}>Nearby Me</Text>
          <Switch color="#eb6b34" value={isNear} onValueChange={onToggleNear} /> */}
        </View>
        <View style={styles.searchconfigswitch}>
          <Text style={styles.searchconfigtext}>Expiring Soon</Text>
          <Switch color="#eb6b34" value={isSoon} onValueChange={onToggleSoon} />
        </View>
        <View style={styles.searchconfigdropdown}>
          <DropDownPicker
            style={{
              backgroundColor: 'white',
              borderColor: '#00000000',
              borderTopEndRadius: 5,
              borderTopStartRadius: 5,
              minHeight: 35,

              borderRadius: 0,
            }}
            dropDownContainerStyle={{
              backgroundColor: '#fff6e6',
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
        ListHeaderComponent={
          <PageSelector
            page={page}
            setPage={setPage}
            numItems={data.length}
            pageSize={pageSize}
          />
        }
        ListFooterComponent={
          <View>
            <PageSelector
              page={page}
              setPage={setPage}
              numItems={data.length}
              pageSize={pageSize}
            />
            <View style={{ padding: 25 }}></View>
          </View>
        }
        renderItem={({ item, index }) => {
          return index >= pageSize * page && index < pageSize * (page + 1) ? (
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
          ) : (
            <View></View>
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
    width: 350,
    margin: 20,
    backgroundColor: '#00b3b3',
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
    width: 300,
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
    color: 'black',
  },
  modalText: {
    fontSize: 15,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'normal',
    fontFamily: 'Helvetica',
    color: 'black',
  },
  modalPrice: {
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
  },
  button: {
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
    height: 30,
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginVertical: 8,
  },
  searchconfigswitch: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchconfigtext: {
    fontWeight: '900',
    fontSize: 14,
  },
  searchconfigdropdown: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationdetails: {},
  locationdetailstext: {
    textAlign: 'left',
    fontWeight: '700',
    fontSize: 15,
    color: 'black',
  },
  locationphonetext: {
    textAlign: 'left',
    fontWeight: '700',
    fontSize: 15,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    color: 'black',
  },
  pagefooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
  },
  footertitle: {
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    marginHorizontal: 30,
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
          <View>
            <Image
              source={require('../../assets/testimages/0.png')}
              style={{
                width: 150,
                height: 150,
                position: 'absolute',
                zIndex: 0,
              }}
            />
            <Image
              source={images[itemData.itemImage]}
              style={{
                width: 150,
                height: 150,
              }}
            />
          </View>
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
  return (
    <Modal
      // animationType="fade"
      transparent={true}
      animationType="fade"
      visible={locationModalVisible}
      onRequestClose={() => {
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
