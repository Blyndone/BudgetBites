import * as React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

import { Button, Text, TextInput, Surface } from 'react-native-paper';
import { REACT_APP_ADDRESS } from '@env';
import * as SecureStore from 'expo-secure-store';

import { useEffect } from 'react';

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
      <ScrollView
        keyboardShouldPersistTaps="never"
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <Image
            source={require('../../assets/BB-logo.png')}
            style={{
              width: 300,
              height: 300,
            }}
          />
        </View>
      </ScrollView>
      <KeyboardAvoidingView behavior="padding">
        <Surface style={styles.surface} elevation={4}>
          <View style={styles.textinput}>
            <Text style={styles.titleText}>Login</Text>

            <Text style={styles.bodytext}>
              Enter details to login.
              {'\n'}
              {/* Seller: User: seller | Pass: seller
              {'\n'}
              Buyer: User: customer | Pass: customer */}
            </Text>
            <View></View>

            <View
              style={{
                padding: 10,
              }}
            >
              <TextInput
                label="User Name"
                mode="outlined"
                value={user_text}
                onChangeText={(user_text) => setTextUser(user_text)}
                style={styles.textinput}
              />

              <TextInput
                label="Password"
                mode="outlined"
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
                title="Login"
                buttonColor="#eb6b34"
                labelStyle={{ fontSize: 18, color: 'black' }}
                onPress={() => {
                  username = user_text.toLowerCase().trim();
                  password = pass_text.toLowerCase().trim();
                  try {
                    const myHeaders = new Headers();
                    myHeaders.append('Content-Type', 'application/json');

                    const raw = JSON.stringify({
                      username: username,
                      password: password,
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
                        if (res.status == 500) {
                          alert(
                            'User not found.  Please check username and try again.',
                          );

                          return;
                        } else if (res.status == 401) {
                          alert(
                            'Password does not match.  Please check password and try again.',
                          );

                          return;
                        } else {
                          const token = JSON.parse(response).token;
                          const data = JSON.parse(response).data;

                          save(user_text.toLowerCase(), token);
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
                Login
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
        </Surface>
      </KeyboardAvoidingView>
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
  surface: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#00b3b3',
    marginVertical: 10,
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

function blah(a, b) {
  return a + b;
}

export default Login;
export { blah, Login };
