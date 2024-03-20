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
import images from '../../assets/testimages/ImageIndex.js';

console.log(images[5], 'test');
// const Item = (props) => {
//     // const { img, name, desc, price } = props

//     return (

//         <View style={styles.item}>
//         <Image
//                 source={require('../../assets/OIG1.png')}
//                 style={{
//                     width: 50,
//                     height: 50,
//                 }} />

//         <Text style={styles.instance}>{name}</Text>
//         <Text style={styles.instance}>{desc}</Text>
//         <Text style={styles.instance}>{price}</Text>

//     </View>

//     )
// }

const List = () => {
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
      const response = await fetch('http://10.0.2.2:5000/items');
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

  // const renderItem = ({item}) => (
  //     <Item
  //     img = 'xxx'
  //     name = {item.name}
  //     desc = {item.desc}
  //     price = {item.price}
  //     />
  //     )

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
                width: 50,
                height: 50,
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
                onPress={() => setModalVisible(!modalVisible)}
              ></Button>
            </View>
            {/* <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable> */}
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
        List of Items
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
        renderItem={({ item }) => (
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
            <View style={styles.item}>
              <Image
                source={images[item.itemID]}
                style={{
                  width: 50,
                  height: 50,
                }}
              />

              {/* <ImageView index={item.itemID} /> */}

              <Text style={styles.instance}>{item.name}</Text>
              <Text style={styles.instance}>{item.description}</Text>
              <Text style={styles.instance}>{item.price}</Text>
            </View>
          </Pressable>
        )}
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
    marginTop: StatusBar.currentHeight || 0,
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
});

export default List;

// const DATA = [
// {
//     img: "img location",
//     name: "Name",
//     desc: "Description",
//     price: "Price"
// },
// {
//     "img": "img/burger.jpg",
//     "name": "Classic Burger",
//     "desc": "Juicy beef patty with lettuce, tomato, and special sauce in a sesame seed bun.",
//     "price": "$8.99"
// },
// {
//     "img": "img/pizza.jpg",
//     "name": "Margherita Pizza",
//     "desc": "Thin crust pizza topped with fresh mozzarella, tomatoes, and basil.",
//     "price": "$12.99"
// },
// {
//     "img": "img/sushi.jpg",
//     "name": "Sushi Platter",
//     "desc": "Assorted sushi rolls with fresh fish, avocado, and soy sauce.",
//     "price": "$16.99"
// },
// {
//     "img": "img/pasta.jpg",
//     "name": "Spaghetti Bolognese",
//     "desc": "Al dente spaghetti with hearty meat sauce and grated Parmesan cheese.",
//     "price": "$10.99"
// },
// {
//     "img": "img/salad.jpg",
//     "name": "Greek Salad",
//     "desc": "Crisp lettuce, tomatoes, cucumbers, olives, and feta cheese with Greek dressing.",
//     "price": "$7.99"
// },
// {
//     "img": "img/tacos.jpg",
//     "name": "Street Tacos",
//     "desc": "Soft corn tortillas filled with seasoned grilled meat, onions, and cilantro.",
//     "price": "$9.99"
// },
// {
//     "img": "img/pancakes.jpg",
//     "name": "Blueberry Pancakes",
//     "desc": "Fluffy pancakes filled with blueberries and drizzled with maple syrup.",
//     "price": "$6.99"
// },
// {
//     "img": "img/ramen.jpg",
//     "name": "Shoyu Ramen",
//     "desc": "Japanese noodle soup with soy-flavored broth, ramen noodles, and toppings.",
//     "price": "$11.99"
// }
// ]
