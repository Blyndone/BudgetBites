import * as React from 'react';
import { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Text, TextInput, RadioButton } from 'react-native-paper';
import { REACT_APP_ADDRESS } from '@env';
import * as SecureStore from 'expo-secure-store';

const Separator = () => <View style={styles.separator} />;
const CreateAccount = ({ navigation, route }) => {
  const [name_text, setTextName] = useState('');
  const [email_text, setTextEmail] = useState('');
  const [phone_text, setTextPhone] = useState('');
  const [zip_text, setTextZip] = useState('');
  const [user_text, setTextUser] = useState('');
  const [pass_text, setTextPass] = useState('');
  const [pass_text_verify, setTextPassVerify] = useState('');
  const [usertype_text, setUserType] = useState('buyer');
  const [userdata, setUserData] = useState({
    user_name: '',
    user_type: '',
    user_id: '',
  });

  const [locationData, setLocationData] = useState({
    locationName: '',
    locationAddresss: '',
    locationCity: '',
    locationState: '',
    locationZip: '',
    locationPhone: '',
    locationEmail: '',
    locationWebsite: '',
  });

  let errormessage = '';

  const ErrorAlert = () =>
    Alert.alert(
      'Form Error',
      'You have the following error in the form data:\n' + errormessage,
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
    );

  const SubmitAccount = async () => {
    const joindate_text = new Date()
      .toISOString()
      .substr(0, 19)
      .replace('T', ' ');
    try {
      const response = await fetch(`${REACT_APP_ADDRESS}/adduser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name_text: name_text,
          email_text: email_text,
          phone_text: phone_text,
          zip_text: zip_text,
          user_text: user_text,
          pass_text: pass_text,
          usertype_text: usertype_text,
          joindate_text: joindate_text,
        }),
      });
      const res = await response.json();
      console.log(res.user_id);
      if (usertype_text == 'seller') {
        const locResponse = await fetch(`${REACT_APP_ADDRESS}/location`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...locationData, userID: res.user_id }),
        });
      }

      AuthNav();
      return res.user_id;
    } catch (err) {
      console.log(err);
    }
  };
  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }
  const AuthNav = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      const raw = JSON.stringify({
        username: user_text,
        password: pass_text,
      });

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      fetch(`${REACT_APP_ADDRESS}/authenticate`, requestOptions)
        .then((response) => {
          res = response;
          return response.text();
        })
        .then((response) => {
          console.log(res.status);
          if (res.status == 500) {
            alert('USER NOT FOUND');
            console.log(res.status);
            return;
          } else if (res.status == 401) {
            alert('INVALID PASSWORD');
            console.log(res.status);
            return;
          } else {
            // console.log(response);
            const token = JSON.parse(response).token;
            const data = JSON.parse(response).data;
            // console.log(data);
            // console.log(user_text, token);
            save(user_text, token);
            if (data.user_type == 'seller') {
              navigation.navigate({
                name: 'Seller Main View',
                params: { data },
              });
            } else if (data.user_type == 'buyer') {
              navigation.navigate({
                name: 'Buyer Main View',
                params: { data },
              });
            } else {
              navigation.navigate({
                name: 'Guest Main View',
                params: { data },
              });
            }
          }
        })

        .catch((error) => console.error(error));
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <SafeAreaView style={styles.form}>
      <ScrollView automaticallyAdjustKeyboardInsets={true}>
        <View>
          <KeyboardAvoidingView>
            <Text style={styles.titleText}>Account Creation</Text>

            <Text style={styles.bodytext}>
              Get started with an account.
              {'\n'}
              {'\n     '} * indicates a required field.
              {'\n'}
            </Text>
            <View>
              <RadioButton.Group
                onValueChange={(usertype_text) => {
                  setUserType(usertype_text);
                }}
                value={usertype_text}
              >
                <View style={styles.radiobutton}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton value="buyer" />
                    <Text style={styles.bodytext}>Customer</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton value="seller" />
                    <Text style={styles.bodytext}>Seller</Text>
                  </View>
                </View>
              </RadioButton.Group>
            </View>
            <View style={styles.textcontainer}>
              <View style={styles.textinput}>
                <TextInput
                  label="User Name"
                  dense="true"
                  value={user_text}
                  style={styles.textinput}
                  onChangeText={(user_text) => setTextUser(user_text)}
                />
              </View>
              <View style={styles.textinput}>
                <TextInput
                  label="Password"
                  dense="true"
                  value={pass_text}
                  onChangeText={(pass_text) => setTextPass(pass_text)}
                  style={styles.textinput}
                  textContentType="password"
                  secureTextEntry={true}
                />
              </View>
              <View style={styles.textinput}>
                <TextInput
                  label="Retype Password"
                  dense="true"
                  value={pass_text_verify}
                  onChangeText={(pass_text_verify) =>
                    setTextPassVerify(pass_text_verify)
                  }
                  style={styles.textinput}
                  textContentType="password"
                  secureTextEntry={true}
                />
              </View>
              <View style={styles.textinput}>
                <TextInput
                  label="Name"
                  dense="true"
                  value={name_text}
                  onChangeText={(name_text) => setTextName(name_text)}
                  style={styles.textinput}
                />
              </View>
              <View style={styles.textinput}>
                <TextInput
                  label="Email"
                  dense="true"
                  value={email_text}
                  onChangeText={(email_text) => setTextEmail(email_text)}
                  style={styles.textinput}
                />
              </View>
              <View style={styles.textinput}>
                <TextInput
                  label="Phone Number"
                  dense="true"
                  value={phone_text}
                  onChangeText={(phone_text) => setTextPhone(phone_text)}
                  style={styles.textinput}
                  textContentType="telephoneNumber"
                  keyboardType="number-pad"
                  maxLength={10}
                />
              </View>
              <View style={styles.textinput}>
                <TextInput
                  label="Zip Code"
                  dense="true"
                  value={zip_text}
                  onChangeText={(zip_text) => setTextZip(zip_text)}
                  style={styles.textinput}
                  keyboardType="number-pad"
                  maxLength={5}
                />
              </View>
            </View>

            <View>
              {usertype_text == 'seller' ? (
                <View>
                  <View>
                    <Text style={styles.titleText}>Business Information</Text>

                    <Text style={styles.bodytext}>
                      Please input your Business Location information below.
                    </Text>
                  </View>
                  <View style={styles.textinput}>
                    <TextInput
                      label="Business Name"
                      dense="true"
                      value={locationData.locationName}
                      onChangeText={(val) =>
                        setLocationData({ ...locationData, locationName: val })
                      }
                      style={styles.textinput}
                    />
                  </View>
                  <View style={styles.textinput}>
                    <TextInput
                      label="Address"
                      dense="true"
                      value={locationData.locationAddress}
                      onChangeText={(val) =>
                        setLocationData({
                          ...locationData,
                          locationAddress: val,
                        })
                      }
                      style={styles.textinput}
                    />
                  </View>
                  <View style={styles.textinput}>
                    <TextInput
                      label="City"
                      dense="true"
                      value={locationData.locationCity}
                      onChangeText={(val) =>
                        setLocationData({ ...locationData, locationCity: val })
                      }
                      style={styles.textinput}
                    />
                  </View>
                  <View style={styles.textinput}>
                    <TextInput
                      label="Location State"
                      dense="true"
                      value={locationData.locationState}
                      onChangeText={(val) =>
                        setLocationData({ ...locationData, locationState: val })
                      }
                      style={styles.textinput}
                    />
                  </View>
                  <View style={styles.textinput}>
                    <TextInput
                      label="Zip Code"
                      dense="true"
                      value={locationData.locationZip}
                      onChangeText={(val) =>
                        setLocationData({ ...locationData, locationZip: val })
                      }
                      style={styles.textinput}
                      keyboardType="number-pad"
                      maxLength={5}
                    />
                  </View>
                  <View style={styles.textinput}>
                    <TextInput
                      label="Phone Number"
                      dense="true"
                      value={locationData.locationPhone}
                      onChangeText={(val) =>
                        setLocationData({ ...locationData, locationPhone: val })
                      }
                      style={styles.textinput}
                      textContentType="telephoneNumber"
                      keyboardType="number-pad"
                      maxLength={10}
                    />
                  </View>
                  <View style={styles.textinput}>
                    <TextInput
                      label="Email"
                      dense="true"
                      value={locationData.locationEmail}
                      onChangeText={(val) =>
                        setLocationData({ ...locationData, locationEmail: val })
                      }
                      style={styles.textinput}
                    />
                  </View>
                  <View style={styles.textinput}>
                    <TextInput
                      label="Website"
                      value={locationData.locationWebsite}
                      onChangeText={(val) =>
                        setLocationData({
                          ...locationData,
                          locationWebsite: val,
                        })
                      }
                      style={styles.textinput}
                    />
                  </View>
                </View>
              ) : (
                <View></View>
              )}
            </View>
            <View>
              <View style={styles.buttoncontainer}>
                <Button
                  mode="contained"
                  title="List"
                  buttonColor="#eb6b34"
                  labelStyle={{ fontSize: 18, color: 'black' }}
                  onPress={() => {
                    errormessage = '';

                    const trimmedUserText = user_text.trim();
                    const trimmedEmailText = email_text.trim();

                    if (trimmedUserText.length <= 5) {
                      errormessage +=
                        'User name must be longer than 5 characters.\n';
                    }
                    if (pass_text !== pass_text_verify) {
                      errormessage += 'Password must match\n';
                    }

                    // Add input cleaning checks here, using the trimmed values
                    const emailRegex = /\S+@\S+\.\S+/;
                    if (!emailRegex.test(trimmedEmailText)) {
                      errormessage += 'Email format is invalid.\n';
                    }

                    // If there's an error, show it and stop the function
                    if (errormessage.length !== 0) {
                      ErrorAlert(errormessage);
                      return;
                    }

                    // If everything is okay, proceed to submit the account
                    SubmitAccount({
                      username: trimmedUserText,
                      password: pass_text,
                      email: trimmedEmailText,
                    });
                  }}
                >
                  Submit
                </Button>
              </View>
            </View>
          </KeyboardAvoidingView>
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
  radiobutton: {
    flexDirection: 'row',
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
  textcontainer: {
    margin: 5,
  },
  buttoncontainer: {
    margin: 5,
  },
  textinput: { margin: 2, height: 42 },
  bodytext: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default CreateAccount;
