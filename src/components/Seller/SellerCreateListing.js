import * as React from 'react';
import { useEffect, useState } from 'react';
import { Modal, FlatList, Pressable, ScrollView } from 'react-native';
import { View, StyleSheet, SafeAreaView, Image, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, TextInput, Button, RadioButton } from 'react-native-paper';
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
  var [img_select, setImage] = React.useState(1);
  const [open, setOpen] = useState(false);
  const [category_text, setCategory] = useState(null);
  const [items, setItems] = useState([
    { label: 'Beef', value: 'Beef' },
    { label: 'Poultry', value: 'Poultry' },
    { label: 'Fish', value: 'Fish' },
    { label: 'Veggies', value: 'Veggies' },
    { label: 'Dairy', value: 'Dairy' },
  ]);
  const [expiration_text, setExpiration] = useState('');
  const [discount_text, setDiscount] = useState('');
  const [discount_calc, setDiscountCalc] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  const SingleImage = ({ image, size }) => {
    return (
      <Image
        source={images[image]}
        style={{
          width: size,
          height: size,
          margin: 2,
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.form}>
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
            <Text style={styles.modalTitle}>Select an Icon!</Text>
            <View style={{ padding: 10 }}></View>
            <View style={{ flex: 1 }}>
              <FlatList
                data={[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]}
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
              <View style={{ padding: 10 }}></View>
              <Button
                mode="contained"
                title="Delete Listing"
                buttonColor="#eb6b34"
                labelStyle={{ fontSize: 16, color: 'black' }}
                onPress={() => setModalVisible(!modalVisible)}
              >
                Delete Listing
              </Button>
            </View>
          </View>
        </View>
      </Modal>
      <ScrollView style={{ flex: 1 }}>
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
              {'\n'}
            </Text>
          </View>
          <View>
            <View>
              <TextInput
                label="Item Name"
                value={name_text}
                onChangeText={(name_text) => setName(name_text)}
                style={styles.textinput}
              />
            </View>
            <View>
              <TextInput
                label="Description"
                value={desc_text}
                onChangeText={(desc_text) => setDescription(desc_text)}
                style={styles.textinput}
              />
            </View>

            <View style={[styles.pricerow]}>
              <TextInput
                label="Price"
                value={price_text}
                onChangeText={(price_text) => {
                  setPrice(price_text);

                  if (price_text == 0 || discount_text == 0) {
                    setDiscountCalc('');
                  } else {
                    setDiscountCalc(
                      (
                        parseFloat(price_text) *
                        (1 - parseFloat(discount_text) / 100)
                      ).toFixed(2),
                    );
                  }
                  2;
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
                  if (price_text == 0 || discount_text == 0) {
                    setDiscountCalc('');
                  } else {
                    setDiscountCalc(
                      (
                        parseFloat(price_text) *
                        (1 - parseFloat(discount_text) / 100)
                      ).toFixed(2),
                    );
                  }
                }}
                style={styles.discount}
                keyboardType="number-pad"
                maxLength={10}
              />
            </View>
            <View>
              <TextInput
                label="# of Days Until Expiration"
                value={expiration_text}
                style={styles.textinput}
                onChangeText={(expiration_text) =>
                  setExpiration(expiration_text)
                }
                keyboardType="number-pad"
              />
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <SingleImage image={img_select} size={80}></SingleImage>
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
                      backgroundColor: '#E7E0EC',
                      borderColor: '#00000000',
                      borderTopEndRadius: 5,
                      borderTopStartRadius: 5,
                      borderRadius: 0,
                      width: '70%',
                      alignItems: 'center',
                      margin: 5,
                      height: 45,
                    }}
                    dropDownContainerStyle={{
                      backgroundColor: '#decceb',
                      borderColor: '#00000000',
                      borderTopColor: 'black',
                      width: '73%',
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

        <View>
          <Button
            mode="contained"
            title="Submit"
            buttonColor="#eb6b34"
            labelStyle={{ fontSize: 20 }}
            onPress={() => {
              const price_discounted = (
                parseFloat(price_text) *
                (1 - parseFloat(discount_text) / 100)
              ).toFixed(2);

              console.log(price_discounted);
              if (
                name_text.length == 0 ||
                desc_text.length == 0 ||
                price_text.length == 0 ||
                discount_text == 0
              ) {
                alert('Please Input an Item');
                return;
              } else {
                try {
                  // price_text = parseFloat(price_text).toFixed(2);
                } catch (e) {
                  price_text = '00.00';
                }
              }

              fetch(`${REACT_APP_ADDRESS}/additem`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  name_text: name_text,
                  desc_text: desc_text,
                  price_text: price_discounted,
                  msrp: price_text,
                  user_id: userdata.user_id,
                  img_select: img_select,
                  category_text: category_text,
                  expiration_text: expiration_text,
                }),
              });

              navigation.navigate({
                name: 'Seller Main View',
                params: { userdata },
              });
            }}
          >
            Submit
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
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
    margin: 10,
    height: 45,
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
  },
  modalView: {
    margin: 20,
    maxHeight: 400,
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
  // itemContainer: {
  //   width: '100%',
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  // },
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
});

export default SellerCreateListing;
