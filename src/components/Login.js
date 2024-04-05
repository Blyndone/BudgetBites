import * as React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Text, TextInput, RadioButton } from 'react-native-paper';
import { REACT_APP_ADDRESS } from '@env';
import * as SecureStore from 'expo-secure-store';
import Auth from './Persist';
import { useEffect } from 'react';

const Separator = () => <View style={styles.separator} />;
const Login = ({ navigation }) => {
  //=================
  const [userdata, setUserData] = React.useState('');
  useEffect(() => {
    setUserData({
      user_name: 'NAME',
      role: 'Buyer',
    });
  }, []);
  //===================

  const [user_text, setTextUser] = React.useState('');
  const [pass_text, setTextPass] = React.useState('');

  const [key, onChangeKey] = React.useState('');
  const [value, onChangeValue] = React.useState('');

  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  return (
    <SafeAreaView style={styles.form}>
      <ScrollView>
        <View
          style={{
            alignContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            source={require('../../assets/BB-logo.png')}
            style={{
              width: 250,
              height: 250,
            }}
          />
        </View>
        <View style={styles.textinput}>
          <Text style={styles.titleText}>Login</Text>

          <Text style={styles.bodytext}>
            Enter details to login.
            {'\n'}
            Seller: User: seller | Pass: seller
            {'\n'}
            Buyer: User: customer | Pass: customer
          </Text>
          <View>
            {/* AUTH TEST */}
            {/* <Button
            mode="contained"
            title="List"
            buttonColor="#eb6b34"
            onPress={() => {
              Auth(user_text).then((resp) => {
                try {
                  r = JSON.parse(resp);
                  console.log(r.status);
                  console.log(resp);
                } catch (err) {
                  console.log(err);
                }
              });
            }}
            >
            auth
          </Button> */}
          </View>

          <View
            style={{
              padding: 10,
            }}
          >
            <TextInput
              label="User Name"
              value={user_text}
              onChangeText={(user_text) => setTextUser(user_text)}
              style={styles.textinput}
            />

            <TextInput
              label="Password"
              value={pass_text}
              onChangeText={(pass_text) => setTextPass(pass_text)}
              style={styles.textinput}
              textContentType="password"
              secureTextEntry={true}
            />
          </View>
        </View>

        <View>
          <View style={styles.buttoncontainer}>
            <Button
              mode="contained"
              title="List"
              buttonColor="#eb6b34"
              labelStyle={{ fontSize: 18, color: 'black' }}
              onPress={() => {
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
                        console.log(data);
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
              }}
            >
              Submit
            </Button>
          </View>
          <View style={styles.buttoncontainer}>
            <Button
              mode="contained"
              title="CreateAccount"
              buttonColor="#eb6b34"
              labelStyle={{ fontSize: 16, color: 'black' }}
              onPress={() => navigation.navigate('Account Creation')}
            >
              Create Account
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
  button: {
    color: '#f194ff',
    backgroundColor: '#f194ff',
  },
  buttoncontainer: {
    margin: 10,
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

export default Login;
