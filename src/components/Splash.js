import * as React from 'react';
import { View, StyleSheet, SafeAreaView, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Text } from 'react-native-paper';

const Splash = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../assets/BB-logo.png')}
        style={{
          width: 300,
          height: 300,
        }}
      />
      <Text style={styles.titleText}>Welcome to Budget Bites!</Text>
      <View>
        <View style={styles.buttoncontainer}>
          <Button
            mode="contained"
            title="Login"
            buttonColor="#eb6b34"
            labelStyle={{ fontSize: 16, color: 'black' }}
            onPress={() => navigation.navigate('Login')}
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
        <View style={styles.buttoncontainer}>
          <Button
            mode="contained"
            title="Guest Login"
            buttonColor="#eb6b34"
            labelStyle={{ fontSize: 16, color: 'black' }}
            onPress={() => navigation.navigate('Guest Main View')}
          >
            Guest Login
          </Button>
        </View>
        {/* <View style={styles.buttoncontainer}>
          <Button
            mode="contained"
            title="Guest Login"
            buttonColor="#eb6b34"
            labelStyle={{ fontSize: 16, color: 'black' }}
            onPress={() => {
              data = { user_id: 1, user_name: 'customer', user_zip: 12345 };
              navigation.navigate({
                name: 'Buyer Main View',
                params: { data },
              });
            }}
          >
            customer
          </Button>
        </View>
        <View style={styles.buttoncontainer}>
          <Button
            mode="contained"
            title="Guest Login"
            buttonColor="#eb6b34"
            labelStyle={{ fontSize: 16, color: 'black' }}
            onPress={() => {
              data = { user_id: 1, user_name: 'customer' };
              navigation.navigate({
                name: 'Seller Main View',
                params: { data },
              });
            }}
          >
            Seller
          </Button>
        </View> */}
        {/* <Button
          mode="contained"
          title="Create Listing"
          buttonColor="#eb6b34"
          onPress={() => navigation.navigate('Seller Create Listing')}
        >
          Create Listing
        </Button> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'teal',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttoncontainer: { margin: 10 },
  titleText: {
    fontSize: 50,
    textAlign: 'center',
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
});

export default Splash;
