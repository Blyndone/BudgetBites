import { Pressable, Text, StyleSheet, View, Image } from 'react-native';
import images from '../../../assets/testimages/ImageIndex';

const ListItem = ({ item }) => {
  return (
    <View
      style={item.status === 'Available' ? styles.item : styles.itemreserved}
    >
      <Image
        source={images[item.itemID]}
        style={{
          width: 50,
          height: 50,
        }}
      />

      <Text style={styles.instance}>{item.name}</Text>
      <Text style={styles.instance}>{item.description}</Text>
      <Text style={styles.instance}>{item.price}</Text>
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
  instance: {
    textAlign: 'auto',
    flexBasis: 120,
    flexGrow: 1,
  },
});

export default ListItem;
