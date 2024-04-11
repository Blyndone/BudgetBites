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
import {
  Button,
  Text,
  TextInput,
  RadioButton,
  Surface,
} from 'react-native-paper';
import { REACT_APP_ADDRESS } from '@env';
import Auth from '../Persist';
const Separator = () => <View style={styles.separator} />;
const BuyerProfile = ({ navigation, route }) => {
  //=========================
  // USER AUTH AND PAGE TYPE
  const pagetype = 'buyer';
  const [userdata, setUserData] = React.useState('');
  const [profiledata, setProfileData] = React.useState({});
  useEffect(() => {
    Auth(route.params.data.user_name).then((resp) => {
      try {
        // r = JSON.parse(resp);
        // if (r.status != 'Accepted' || route.params.data.user_type != pagetype) {
        //   navigation.navigate('Splash');
        // }
        // console.log(r.status);
        // console.log(resp);
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

  useEffect(() => {
    // if(profiledata.length >0)
    if (Object.keys(profiledata).length === 0) {
      return;
    } else {
      setTextName(profiledata.name);
      setTextEmail(profiledata.email);
      setTextPhone(String(profiledata.phone));
      setTextZip(String(profiledata.zip));
      setTextUser(profiledata.username);
      setUserType(profiledata.user_type);
      setUserID(profiledata.userID);
    }
  }, [profiledata]);
  //=========================

  const [name_text, setTextName] = React.useState('');
  const [email_text, setTextEmail] = React.useState('');
  const [phone_text, setTextPhone] = React.useState('');
  const [zip_text, setTextZip] = React.useState('');
  const [user_text, setTextUser] = React.useState('');
  const [pass_text, setTextPass] = React.useState('');
  const [userID, setUserID] = React.useState('');
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
        <Surface style={styles.surface} elevation={4}>
          <View>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.textinput}>
                <Text style={styles.titleText}>Hello {profiledata.name},</Text>
                <View style={{ padding: 10 }}></View>
                <Text style={styles.bodytext}>
                  Update your account here!
                  {'\n'}
                  {'\n'}
                </Text>
              </View>
              <View
                style={{
                  flex: 0.4,
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
            <View
              style={{
                padding: 10,
              }}
            >
              <TextInput
                label="Name"
                dense="true"
                mode="outlined"
                value={name_text}
                onChangeText={(name_text) => setTextName(name_text)}
                style={styles.textinput}
              />
              <TextInput
                label="Password"
                dense="true"
                mode="outlined"
                value={pass_text}
                onChangeText={(pass_text) => setTextPass(pass_text)}
                style={styles.textinput}
                textContentType="password"
                secureTextEntry={true}
              />

              <TextInput
                label="Retype Password"
                dense="true"
                mode="outlined"
                value={pass_text_verify}
                onChangeText={(pass_text_verify) =>
                  setTextPassVerify(pass_text_verify)
                }
                style={styles.textinput}
                textContentType="password"
                secureTextEntry={true}
              />

              <TextInput
                label="Email"
                dense="true"
                mode="outlined"
                value={email_text}
                onChangeText={(email_text) => setTextEmail(email_text)}
                style={styles.textinput}
              />

              <TextInput
                label="Phone Number"
                dense="true"
                mode="outlined"
                value={phone_text}
                onChangeText={(phone_text) => setTextPhone(phone_text)}
                style={styles.textinput}
                textContentType="telephoneNumber"
                keyboardType="number-pad"
                maxLength={10}
              />

              <TextInput
                label="Zip Code"
                dense="true"
                mode="outlined"
                value={zip_text}
                onChangeText={(zip_text) => setTextZip(zip_text)}
                style={styles.textinput}
                keyboardType="number-pad"
                maxLength={5}
              />
            </View>

            <View style={styles.buttonview}>
              <Button
                mode="contained"
                title="Submit"
                buttonColor="#eb6b34"
                onPress={() => {
                  //NEED INPUT CLEANING AND PASSWORD HASHING
                  errormessage = '';

                  if (user_text.length <= 5) {
                    errormessage +=
                      'User name must be longer than 5 characters.\n';
                  }
                  if (pass_text != pass_text_verify) {
                    errormessage += 'Password must match\n';
                  }
                  if (pass_text)
                    if (errormessage.length != 0) {
                      ErrorAlert();
                      return;
                    }

                  let params = {};
                  if (name_text != profiledata.name) {
                    params = { ...params, name: name_text };
                  }

                  if (email_text != profiledata.email) {
                    params = { ...params, email: email_text };
                  }
                  if (phone_text != profiledata.phone) {
                    params = { ...params, phone: phone_text };
                  }
                  if (zip_text != profiledata.zip) {
                    params = { ...params, zip: zip_text };
                  }
                  if (pass_text && pass_text.length > 0) {
                    params = { ...params, password: pass_text };
                  }

                  fetch(`${REACT_APP_ADDRESS}/users/${userID}`, {
                    method: 'PATCH',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(params),
                  });

                  navigation.navigate('Login');
                }}
              >
                {' '}
                Submit{' '}
              </Button>
            </View>
          </View>
        </Surface>
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

  textinput: {
    flex: 1,
    margin: 5,
  },
  bodytext: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  surface: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#00b3b3',
    marginVertical: 10,
  },
  buttonview: {
    padding: 10,
    margin: 5,
  },
});

export default BuyerProfile;
