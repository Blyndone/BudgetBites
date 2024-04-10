import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  Modal,
  FlatList,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { View, StyleSheet, SafeAreaView, Image } from 'react-native';
import {
  Text,
  TextInput,
  Button,
  IconButton,
  Surface,
} from 'react-native-paper';
import { REACT_APP_ADDRESS } from '@env';
import Auth from '../Persist';
import ProfileButton from '../Components/ProfleButton';
import images from '../../../assets/testimages/ImageIndex';
import DropDownPicker from 'react-native-dropdown-picker';

// import { Keyboard, TouchableWithoutFeedback } from 'react-native';

const SellerCreateListing = ({ navigation, route }) => {
  //=========================
  // USER AUTH AND PAGE TYPE
  const pagetype = 'seller';
  const [userdata, setUserData] = React.useState('');

  useEffect(() => {
    Auth(route.params.data.user_name).then((resp) => {
      try {
        r = JSON.parse(resp);
        if (r.status != 'Accepted' || route.params.data.user_type != pagetype) {
          navigation.navigate('Splash');
        }
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
  var [name_text, setName] = React.useState('');
  var [desc_text, setDescription] = React.useState('');
  var [price_text, setPrice] = React.useState('');
  var [img_select, setImage] = React.useState('0');
  const [open, setOpen] = useState(false);
  const [category_text, setCategory] = useState(null);
  const [items, setItems] = useState([
    { label: 'Beef', value: 'Beef' },
    { label: 'Poultry', value: 'Poultry' },
    { label: 'Pork', value: 'Pork' },
    { label: 'Seafood', value: 'Seafood' },
    { label: 'Veggies', value: 'Veggies' },
    { label: 'Dairy', value: 'Dairy' },
    { label: 'Baked Goods', value: 'Baked Goods' },
  ]);
  const [expiration_text, setExpiration] = useState('');
  const [discount_text, setDiscount] = useState('');
  const [discount_calc, setDiscountCalc] = useState('');
  const [count, setCount] = useState('1');
  const [imageindexes, setImageIndex] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
  ]);

  const [modalVisible, setModalVisible] = useState(false);

  const SingleImage = ({ image, size }) => {
    try {
      return (
        <View>
          <Image
            source={require('../../../assets/testimages/0.png')}
            style={{
              width: size,
              height: size,
              position: 'absolute',
              margin: 2,
              zIndex: 0,
            }}
          />
          <Image
            source={images[image]}
            style={{
              width: size,
              height: size,
              margin: 2,
            }}
          />
        </View>
      );
    } catch (err) {
      return;
    }
  };

  return (
    <SafeAreaView style={styles.form}>
      <ScrollView style={styles.form2}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
          <Surface style={styles.surface} elevation={4}>
            <View style={styles.textcontainer}>
              <View>
                <Text style={styles.titleText}>Food Listing</Text>
              </View>

              <View>
                <Text style={styles.bodytext}>
                  Create a new food listing.
                  {'\n'}
                  {'\n'}
                  Input the item name, a short description, and the price below!
                </Text>
              </View>
            </View>

            <View style={styles.textcontainer}>
              <View>
                <View style={[styles.pricerow]}>
                  <TextInput
                    label="Item Name"
                    value={name_text}
                    onChangeText={(name_text) => setName(name_text)}
                    style={styles.textinput}
                  />
                </View>
                <View style={[styles.pricerow]}>
                  <TextInput
                    label="Description"
                    value={desc_text}
                    onChangeText={(desc_text) => setDescription(desc_text)}
                    style={styles.textinput}
                  />
                </View>

                <View style={[styles.pricerow]}>
                  <TextInput
                    label="MSRP Price"
                    value={price_text}
                    onChangeText={(price_text) => {
                      setPrice(price_text);
                      setDiscountCalc(checkDiscount(price_text, discount_text));
                    }}
                    style={styles.price}
                    keyboardType="number-pad"
                    maxLength={10}
                  />
                  <TextInput
                    label="Discount %"
                    value={discount_text}
                    onChangeText={(discount_text) => {
                      setDiscount(discount_text);
                      setDiscountCalc(checkDiscount(price_text, discount_text));
                    }}
                    style={styles.discount}
                    keyboardType="number-pad"
                    maxLength={10}
                  />
                </View>
                <View style={[styles.pricerow]}>
                  <TextInput
                    label="Days Before Exp."
                    value={expiration_text}
                    style={styles.textinput}
                    onChangeText={(expiration_text) =>
                      setExpiration(expiration_text)
                    }
                    keyboardType="number-pad"
                  />
                  <TextInput
                    label="Count"
                    value={count}
                    style={styles.textinput}
                    onChangeText={(count) => setCount(count)}
                    keyboardType="number-pad"
                  />
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <View
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                  >
                    <Pressable onPress={() => setModalVisible(!modalVisible)}>
                      <SingleImage image={img_select} size={80}></SingleImage>
                    </Pressable>
                    <View
                      style={{ justifyContent: 'center', alignItems: 'center' }}
                    >
                      <Button
                        mode="contained"
                        title="Select an Image"
                        buttonColor="#eb6b34"
                        labelStyle={{ fontSize: 15 }}
                        onPress={() => setModalVisible(!modalVisible)}
                      >
                        Select an Image
                      </Button>
                    </View>
                  </View>
                  <View style={{ padding: 10 }}></View>
                  <View>
                    <View>
                      <DropDownPicker
                        style={{
                          backgroundColor: 'white',
                          borderColor: '#00000000',
                          borderTopEndRadius: 5,
                          borderTopStartRadius: 5,
                          minHeight: 35,
                          borderRadius: 0,
                          width: '70%',
                          alignItems: 'center',
                          margin: 5,
                          height: 45,
                        }}
                        dropDownContainerStyle={{
                          backgroundColor: 'white',
                          borderColor: '#00000000',
                          borderTopColor: 'black',
                          width: '70%',
                        }}
                        open={open}
                        value={category_text}
                        items={items}
                        setOpen={setOpen}
                        setValue={setCategory}
                        setItems={setItems}
                        listMode="SCROLLVIEW"
                        dropDownDirection="TOP"
                        placeholder={'Choose a Category'}
                      />
                    </View>
                    <View style={styles.discountrow}>
                      <Text style={styles.discounttext}>Discount Price</Text>
                      <Text style={styles.discounttext}>{discount_calc}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ flex: 1 }}>
              <Button
                mode="contained"
                title="Submit"
                buttonColor="#eb6b34"
                labelStyle={{ fontSize: 20 }}
                onPress={() => {
                  const listingData = checkListingData(
                    {
                      name_text: name_text,
                      desc_text: desc_text,
                      msrp: price_text,
                      user_id: userdata.user_id,
                      img_select: img_select,
                      category_text: category_text,
                      expiration_text: expiration_text,
                      count: count,
                    },
                    discount_text,
                  );
                  if (typeof listingData == undefined) {
                    return;
                  }

                  fetch(`${REACT_APP_ADDRESS}/additem`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(listingData),
                  });

                  navigation.navigate({
                    name: 'Seller Main View',
                    params: { data: userdata },
                  });
                }}
              >
                Submit
              </Button>
            </View>
          </Surface>
        </KeyboardAvoidingView>
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
              <View style={[styles.modaltitlebar]}>
                <IconButton
                  icon="arrow-left-bold"
                  iconColor={imageindexes[0] > 5 ? 'black' : '#00000000'}
                  size={30}
                  onPress={() => {
                    if (imageindexes[0] > 5) {
                      setImageIndex(imageindexes.map((index) => index - 16));
                    }
                  }}
                />
                <Text style={styles.modalTitle}>Select an Icon!</Text>
                <IconButton
                  icon="arrow-right-bold"
                  iconColor={imageindexes[0] < 146 ? 'black' : '#00000000'}
                  size={30}
                  onPress={() => {
                    console.log(imageindexes[0]);
                    if (imageindexes[0] < 146) {
                      setImageIndex(imageindexes.map((index) => index + 16));
                    }
                  }}
                />
              </View>

              <View style={{ flex: 1 }}>
                <FlatList
                  data={imageindexes}
                  // style={[styles.itemContainer]}
                  numColumns={4}
                  columnWrapperStyle={styles.row}
                  // keyExtractor={({ imgID }) => imgID}
                  renderItem={({ item }) => {
                    return (
                      <Pressable
                        onPress={() => {
                          setModalVisible(false);
                          setImage(item, 60);
                        }}
                      >
                        {/* <Text>img:{item}</Text> */}
                        <SingleImage image={item} size={60}></SingleImage>
                      </Pressable>
                    );
                  }}
                />
              </View>
              <View style={{ margin: 10 }}>
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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
  },
  form2: {
    backgroundColor: 'teal',

    padding: 25,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  titleText: {
    fontSize: 30,
    textAlign: 'left',
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
  },
  button: {
    color: '#f194ff',
    backgroundColor: '#f194ff',
  },

  textinput: {
    margin: 5,
    height: 45,
    flex: 1,
  },
  textcontainer: {
    margin: 5,
    flex: 1,
  },
  bodytext: {
    fontSize: 15,
    fontWeight: 'bold',
    margin: 10,
  },
  pricerow: {
    justifyContent: 'left',
    flexDirection: 'row',
    flex: 1,
  },
  namerow: {
    justifyContent: 'left',

    flexDirection: 'row',
  },
  price: {
    flex: 1,
    margin: 5,
    height: 45,
  },
  discount: {
    flex: 1,
    margin: 5,
    height: 45,
  },
  discountrow: {
    flex: 1,
    justifyContent: 'center',
  },
  discounttext: {
    margin: 5,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#eb6b34',
    textDecorationLine: 'underline',
    shadowColor: 'black',
    textShadowOffset: {
      height: 2,
      width: 2,
    },
    textShadowRadius: 2,
  },
  modalView: {
    margin: 20,
    maxHeight: 440,
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
  modalTitle: {
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    flex: 0.8,
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
  // itemContainer: {
  //   width: '100%',
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  // },
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
  modaltitlebar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  surface: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#00b3b3',
    marginVertical: 10,
  },
});

export function checkListingData(listingData, discount_text) {
  if (
    listingData.name_text.length <= 0 ||
    listingData.desc_text.length <= 0 ||
    listingData.name_text.length > 100 ||
    listingData.desc_text.length > 100 ||
    listingData.msrp <= 0 ||
    discount_text <= 0 ||
    listingData.count < 1
  ) {
    alert('Please Input an Item');
    return;
  }
  const price_discounted = (
    parseFloat(listingData.msrp) *
    (1 - parseFloat(discount_text) / 100)
  ).toFixed(2);
  listingData = { ...listingData, price_text: price_discounted };

  if (listingData.count > 5) {
    alert('Maximum of 5 Listing at a time.');
    return;
  } else {
    try {
      // price_text = parseFloat(price_text).toFixed(2);
    } catch (e) {
      listingData.price_text = '00.00';
    }
  }

  return listingData;
}

export function checkDiscount(price_text, discount_text) {
  if (price_text == 0 || discount_text == 0) {
    return '';
  } else if (price_text < 0 || discount_text < 0 || discount_text > 99) {
    return '';
  } else {
    return (
      parseFloat(price_text) *
      (1 - parseFloat(discount_text) / 100)
    ).toFixed(2);
  }
}

export default SellerCreateListing;
