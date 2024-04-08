import * as React from 'react';
import { useEffect } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Alert,
  Pressable,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Text, TextInput, RadioButton } from 'react-native-paper';
import { REACT_APP_ADDRESS } from '@env';
import Auth from '../Persist';
const Separator = () => <View style={styles.separator} />;
const SellerLocationProfile = ({ navigation, route }) => {
  //=========================
  // USER AUTH AND PAGE TYPE
  const pagetype = 'seller';
  const [userdata, setUserData] = React.useState('');

  const [profiledata, setProfileData] = React.useState({});
  const [locationdata, setLocationData] = React.useState(
    '',
    // name: '',
    // address: '',
    // city: '',
    // state: '',
    // zip: '',
    // phone_number: '',
    // email: '',
    // website: '',
  );
  const [user_name, setUserName] = React.useState('');
  useEffect(() => {
    Auth(route.params.data.user_name).then((resp) => {
      try {
        r = JSON.parse(resp);
        if (r.status != 'Accepted' || route.params.data.user_type != pagetype) {
          navigation.navigate('Splash');
        }

        GetProfileInfo();
      } catch (err) {
        console.log(err);
      }
    });

    const GetProfileInfo = async () => {
      try {
        const response = await fetch(
          `${REACT_APP_ADDRESS}/users/${route.params.data.user_name}`,
        );
        const json = await response.json();

        results = Object.values(json.users);

        setProfileData(results[0]);
      } catch (error) {
        console.error(error);
      }
    };

    setUserData({
      user_name: route.params.data.user_name,
      user_type: route.params.data.user_type,
      user_id: route.params.data.user_id,
    });
  }, []);

  const GetLocationInfo = async () => {
    try {
      const response = await fetch(
        `${REACT_APP_ADDRESS}/userlocation/${profiledata.userID}`,
      );
      const json = await response.json();
      // console.log(json);
      results = Object.values(json.location);

      setLocationData(results[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (Object.keys(profiledata).length === 0) {
      return;
    } else {
      setUserName(profiledata.name);
      GetLocationInfo();
    }
  }, [profiledata]);

  useEffect(() => {
    if (Object.keys(locationdata).length === 0) {
      return;
    } else {
      setTextName(locationdata.name);
      setTextAddress(locationdata.address);
      setTextCity(locationdata.city);
      setTextState(locationdata.state);
      setTextZip(locationdata.zip);
      setTextPhone(locationdata.phone_number);
      setTextEmail(locationdata.email);
      setTextWebsite(locationdata.website);
    }
  }, [locationdata]);

  //=========================

  const [name_text, setTextName] = React.useState('');
  const [address_text, setTextAddress] = React.useState('');
  const [city_text, setTextCity] = React.useState('');
  const [state_text, setTextState] = React.useState('');
  const [zip_text, setTextZip] = React.useState('');
  const [phone_text, setTextPhone] = React.useState('');
  const [email_text, setTextEmail] = React.useState('');
  const [website_text, setTextWebsite] = React.useState('');
  const [usertype_text, setUserType] = React.useState('seller');

  let errormessage = '';

  const ErrorAlert = () =>
    Alert.alert(
      'Form Error',
      'You have the following error in the form data:\n' + errormessage,
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
    );

  return (
    <SafeAreaView style={styles.form}>
      <ScrollView>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.textinput}>
            <Text style={styles.titleText}>{locationdata.name},</Text>
            <Text style={styles.loctext}>{profiledata.name},</Text>
            <View style={{ padding: 10 }}></View>
            <Text style={styles.bodytext}>
              Update your location information here!
              {'\n'}
              {'\n'}
            </Text>
          </View>
          <View
            style={{
              flex: 0.2,
              alignItems: 'flex-end',
            }}
          >
            <Image
              source={require('../../../assets/BB-logo.png')}
              style={{
                width: 140,
                height: 140,
              }}
            />
          </View>
        </View>
        <View>
          <View>
            <View
              style={{
                padding: 10,
              }}
            >
              <TextInput
                label="Location Name"
                value={name_text}
                onChangeText={(name_text) => setTextName(name_text)}
                style={styles.textinput}
              />
              <TextInput
                label="Address"
                value={address_text}
                onChangeText={(address_text) => setTextAddress(address_text)}
                style={styles.textinput}
              />
              <View style={{ flexDirection: 'row' }}>
                <TextInput
                  label="City"
                  value={city_text}
                  onChangeText={(city_text) => setTextCity(city_text)}
                  style={[styles.textinput, { flex: 1 }]}
                />

                <TextInput
                  label="State"
                  value={state_text}
                  onChangeText={(state_text) => setTextState(state_text)}
                  style={[styles.textinput, { flex: 1 }]}
                />
              </View>
              <TextInput
                label="Zip Code"
                value={zip_text}
                onChangeText={(zip_text) => setTextZip(zip_text)}
                style={styles.textinput}
                keyboardType="number-pad"
                maxLength={5}
              />
              <TextInput
                label="Website"
                value={website_text}
                onChangeText={(website_text) => setTextWebsite(website_text)}
                style={styles.textinput}
              />
              <TextInput
                label="Phone Number"
                value={phone_text}
                onChangeText={(phone_text) => setTextPhone(phone_text)}
                style={styles.textinput}
                textContentType="telephoneNumber"
                keyboardType="number-pad"
                maxLength={12}
              />
              <TextInput
                label="Email"
                value={email_text}
                onChangeText={(email_text) => setTextEmail(email_text)}
                style={styles.textinput}
              />
            </View>
          </View>

          <View>
            <Button
              mode="contained"
              title="Submit"
              buttonColor="#eb6b34"
              onPress={() => {
                //NEED INPUT CLEANING AND PASSWORD HASHING
                errormessage = '';

                let params = {};
                if (name_text != locationdata.name) {
                  params = { ...params, name: name_text };
                }
                if (address_text != locationdata.address) {
                  params = { ...params, address: address_text };
                }
                if (city_text != locationdata.city) {
                  params = { ...params, city: city_text };
                }
                if (state_text != locationdata.state) {
                  params = { ...params, state: state_text };
                }
                if (zip_text != locationdata.zip) {
                  params = { ...params, zip: zip_text };
                }
                if (phone_text != locationdata.phone_number) {
                  params = { ...params, phone_number: phone_text };
                }
                if (email_text != locationdata.email) {
                  params = { ...params, email: email_text };
                }
                if (website_text != locationdata.website) {
                  params = { ...params, website: website_text };
                }

                fetch(
                  `${REACT_APP_ADDRESS}/userlocation/${profiledata.userID}`,
                  {
                    method: 'PATCH',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(params),
                  },
                );
                navigation.goBack();
              }}
            >
              Submit
            </Button>
          </View>
        </View>
      </ScrollView>
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
  loctext: {
    fontSize: 20,
    textAlign: 'left',
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    paddingHorizontal: 20,
    textDecorationLine: 'underline',
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
    flex: 1,
    margin: 5,
    height: 48,
  },
  bodytext: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  locationlink: {
    fontSize: 20,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: '#e85617',
    shadowColor: 'black',
    textShadowOffset: {
      height: 2,
      width: 2,
    },
    textShadowRadius: 2,
  },
});

export default SellerLocationProfile;
