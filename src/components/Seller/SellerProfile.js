import * as React from 'react';
import { useEffect } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Text, TextInput, RadioButton } from 'react-native-paper';
import { REACT_APP_ADDRESS } from '@env';
import Auth from '../Persist';
const Separator = () => <View style={styles.separator} />;
const SellerProfile = ({ navigation, route }) => {
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
    });
  }, []);
  //=========================

  const [name_text, setTextName] = React.useState('');
  const [email_text, setTextEmail] = React.useState('');
  const [phone_text, setTextPhone] = React.useState('');
  const [zip_text, setTextZip] = React.useState('');
  const [user_text, setTextUser] = React.useState('');
  const [pass_text, setTextPass] = React.useState('');
  const [pass_text_verify, setTextPassVerify] = React.useState('');
  const [usertype_text, setUserType] = React.useState('customer');
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
        <View style={styles.textinput}>
          <Text style={styles.titleText}>Seller Profile</Text>
          <Separator />
          <Text style={styles.bodytext}>
            Get started with an account.
            {'\n'}
            {'\n'}* indicates a required field.
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
              style={styles.textinput}
              onChangeText={(user_text) => setTextUser(user_text)}
            />

            <TextInput
              label="Password"
              value={pass_text}
              onChangeText={(pass_text) => setTextPass(pass_text)}
              style={styles.textinput}
              textContentType="password"
              secureTextEntry={true}
            />

            <TextInput
              label="Retype Password"
              value={pass_text_verify}
              onChangeText={(pass_text_verify) =>
                setTextPassVerify(pass_text_verify)
              }
              style={styles.textinput}
              textContentType="password"
              secureTextEntry={true}
            />

            <TextInput
              label="Name"
              value={name_text}
              onChangeText={(name_text) => setTextName(name_text)}
              style={styles.textinput}
            />

            <TextInput
              label="Email"
              value={email_text}
              onChangeText={(email_text) => setTextEmail(email_text)}
              style={styles.textinput}
            />

            <TextInput
              label="Phone Number"
              value={phone_text}
              onChangeText={(phone_text) => setTextPhone(phone_text)}
              style={styles.textinput}
              textContentType="telephoneNumber"
              keyboardType="number-pad"
              maxLength={10}
            />

            <TextInput
              label="Zip Code"
              value={zip_text}
              onChangeText={(zip_text) => setTextZip(zip_text)}
              style={styles.textinput}
              keyboardType="number-pad"
              maxLength={5}
            />
          </View>

          <View>
            <RadioButton.Group
              onValueChange={(usertype_text) => setUserType(usertype_text)}
              value={usertype_text}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton value="buyer" />
                <Text style={styles.bodytext}>Customer</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton value="seller" />
                <Text style={styles.bodytext}>Seller</Text>
              </View>
            </RadioButton.Group>
          </View>
        </View>

        <View>
          <Separator />
          <Button
            mode="contained"
            title="List"
            buttonColor="#eb6b34"
            onPress={() => {
              //NEED INPUT CLEANING AND PASSWORD HASHING
              errormessage = '';

              if (user_text.length <= 5) {
                errormessage += 'User name must be longer than 5 characters.\n';
              }
              if (pass_text != pass_text_verify) {
                errormessage += 'Password must match\n';
              }
              if (errormessage.length != 0) {
                ErrorAlert();
                return;
              }

              const joindate_text = new Date()
                .toISOString()
                .substr(0, 19)
                .replace('T', ' ');
              fetch(`${REACT_APP_ADDRESS}/adduser`, {
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

              navigation.navigate('Guest Main View');
            }}
          >
            {' '}
            Submit{' '}
          </Button>

          <Separator />
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

export default SellerProfile;
