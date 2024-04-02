import { Pressable, Text, StyleSheet, View, Image } from 'react-native';
import images from '../../../assets/testimages/ImageIndex';

const ListItem = ({ item }) => {
  return (
    <View
      style={item.status === 'Available' ? styles.item : styles.itemreserved}
    >
      <View style={styles.imgview}>
        <Image source={images[item.img]} style={styles.img} />
      </View>
      <View style={styles.titleview}>
        <Text style={styles.title}>{item.name}</Text>

        {/* <View style={{ padding: 10 }}></View> */}
        <Text style={styles.location}>{item.location}</Text>
      </View>
      <View style={styles.descview}>
        <Text style={styles.description}>
          {item.description.length > 45
            ? item.description.slice(0, 45) + '...'
            : item.description}
        </Text>
        <Text style={styles.category}>{item.category}</Text>
      </View>
      <View style={styles.priceview}>
        <View>
          <Text style={styles.msrp}>MSRP</Text>
          <Text style={styles.msrp}>${item.price}</Text>
        </View>
        <View>
          {/* <View style={{ padding: 10 }}></View> */}
          <Text style={styles.price}> Price</Text>
          <Text style={styles.price}>${item.price}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 16,
    height: 100,
    width: 360,
    flexDirection: 'row',
    // justifyContent: 'flex-end',
    // alignItems: 'center',
    borderWidth: 4,
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
  imgview: {
    flex: 0.5,
    alignContent: 'center',
    alignSelf: 'center',
  },
  titleview: {
    flex: 0.8,
    // borderColor: 'black',
    // borderWidth: 1,
    alignContent: 'center',
  },
  descview: {
    flex: 1,
    alignContent: 'center',
  },
  priceview: {
    flex: 0.4,
    height: '100%',
    alignContent: 'center',
    alignSelf: 'flex-end',
    paddingRight: 5,
  },

  img: {
    width: 50,
    height: 50,
  },
  title: {
    textAlign: 'left',
    // flexBasis: 120,
    flexGrow: 1,
    fontWeight: 'bold',
  },
  location: {
    textAlign: 'left',
    // flexBasis: 120,
    flexGrow: 0.7,
  },
  description: {
    paddingLeft: 10,
    textAlign: 'left',
    // flexBasis: 120,
    flexGrow: 1,
  },
  category: {
    paddingLeft: 10,
    textAlign: 'left',
    // flexBasis: 120,
    flexGrow: 0.3,
    fontWeight: 'bold',
  },
  // instance: {
  //   textAlign: 'auto',
  //   flexBasis: 120,
  //   flexGrow: 1,
  //   fontWeight: 'bold',
  // },
  msrp: {
    textAlign: 'right',
    // flexBasis: 120,
    flexGrow: 1,

    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: 'red',
  },
  price: {
    textAlign: 'right',
    // flexBasis: 120,
    flexGrow: 1,
    fontWeight: 'bold',
  },
});

export default ListItem;
