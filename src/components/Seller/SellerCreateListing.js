import * as React from 'react';
import { useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Image, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Text, TextInput, RadioButton } from 'react-native-paper';
import { REACT_APP_ADDRESS } from '@env';
import Auth from '../Persist';
import ProfileButton from '../Components/ProfleButton';
const Separator = () => <View style={styles.separator} />;
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

  return (
    <SafeAreaView style={styles.form}>
      <View style={styles.textinput}>
        <Text style={styles.titleText}>Food Listing</Text>
        <Separator />
        <Text style={styles.bodytext}>
          Create a new food listing.
          {'\n'}
          {'\n'}
          Input the item name, a short description, and the price below!
          {'\n'}
        </Text>

        <View
          style={{
            padding: 10,
          }}
        >
          <TextInput
            label="Item Name"
            value={name_text}
            onChangeText={(name_text) => setName(name_text)}
            style={styles.textinput}
          />

          <TextInput
            label="Description"
            value={desc_text}
            onChangeText={(desc_text) => setDescription(desc_text)}
            style={styles.textinput}
          />

          <TextInput
            label="Price"
            value={price_text}
            onChangeText={(price_text) => setPrice(price_text)}
            style={styles.textinput}
            keyboardType="number-pad"
            maxLength={10}
          />
        </View>
      </View>

      <View>
        <Separator />
        <Button
          mode="contained"
          title="List"
          buttonColor="#eb6b34"
          onPress={() => {
            if (
              name_text.length == 0 ||
              desc_text.length == 0 ||
              price_text.length == 0
            ) {
              alert('Please Input an Item');
              return;
            } else {
              try {
                price_text = parseFloat(price_text).toFixed(2);
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
                price_text: price_text,
              }),
            });

            navigation.navigate({
              name: 'Seller Main View',
              params: { userdata },
            });
          }}
        >
          {' '}
          Submit{' '}
        </Button>

        <Separator />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    backgroundColor: 'teal',
    justifyContent: 'top',
    padding: 20,
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
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  textinput: {
    margin: 5,
  },
  bodytext: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default SellerCreateListing;
