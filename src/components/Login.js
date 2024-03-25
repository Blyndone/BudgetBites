import * as React from 'react';
import { View, StyleSheet, SafeAreaView, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Text, TextInput, RadioButton } from 'react-native-paper';
import { REACT_APP_ADDRESS } from '@env';
const Separator = () => <View style={styles.separator} />;
const Login = ({ navigation }) => {
  const [user_text, setTextUser] = React.useState('');
  const [pass_text, setTextPass] = React.useState('');

  const [value, setValue] = React.useState('first');

  return (
    <SafeAreaView style={styles.form}>
      <View style={styles.textinput}>
        <Text style={styles.titleText}>Login</Text>
        <Separator />
        <Text style={styles.bodytext}>
          Enter details to login.
          {'\n'}
        </Text>

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

              fetch(`${REACT_APP_ADDRESS}/auth`, requestOptions)
                .then((response) => response.text())
                .then((result) => console.log(result))
                .catch((error) => console.error(error));
            } catch (e) {
              console.log(e);
            }

            navigation.navigate('Guest List View');
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
