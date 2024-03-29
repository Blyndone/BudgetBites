import * as React from 'react';
import { View, StyleSheet, SafeAreaView, Image, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Text, TextInput, RadioButton } from 'react-native-paper';
import { REACT_APP_ADDRESS } from '@env';
import * as SecureStore from 'expo-secure-store';

const Separator = () => <View style={styles.separator} />;
const Login = ({ navigation }) => {
  const [user_text, setTextUser] = React.useState('');
  const [pass_text, setTextPass] = React.useState('');

  // const [value, setValue] = React.useState('first');
  const [key, onChangeKey] = React.useState('');
  const [value, onChangeValue] = React.useState('');

  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  // async function getValueFor(key) {
  //   let result = await SecureStore.getItemAsync(key);
  //   if (result) {
  //     alert("🔐 Here's your value 🔐 \n" + result);
  //     return result;
  //   } else {
  //     alert('No values stored under that key.');
  //   }
  // }

  return (
    <SafeAreaView style={styles.form}>
      <View style={styles.textinput}>
        <Text style={styles.titleText}>Login</Text>
        <Separator />
        <Text style={styles.bodytext}>
          Enter details to login. {key} {value}
          {'\n'}
        </Text>
        <View>
          {/* <Button
            mode="contained"
            title="List"
            buttonColor="#eb6b34"
            onPress={() => {
              save(key, value);
              onChangeKey('K1');
              onChangeValue('V2');
            }}
          >
            TEST
          </Button> */}

          {/* <Button
            mode="contained"
            title="List"
            buttonColor="#eb6b34"
            onPress={() => {
              getValueFor('blyndone');
            }}
          >
            TEST
          </Button> */}
          <Button
            mode="contained"
            title="List"
            buttonColor="#eb6b34"
            onPress={() => {
              (async () => {
                await SecureStore.getItemAsync('blyndone').then((response) => {
                  const myHeaders = new Headers();
                  myHeaders.append('Content-Type', 'application/json');

                  const raw = JSON.stringify({
                    user_text: 'blyndone',
                    token: response,
                  });

                  const requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow',
                  };

                  fetch(`${REACT_APP_ADDRESS}/auth`, requestOptions)
                    .then((response) => response.text())
                    .then((result) => console.log(result))
                    .catch((error) => console.error(error));
                });
              })();
            }}
          >
            auth
          </Button>
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
                    // console.log(user_text, token);
                    save(user_text, token);
                    navigation.navigate({
                      name: 'Guest List View',
                      params: { user: user_text },
                    });
                  }
                })

                .catch((error) => console.error(error));
            } catch (e) {
              console.log(e);
            }
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

export default Login;
