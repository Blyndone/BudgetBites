import * as React from 'react';
import { View, StyleSheet, SafeAreaView, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Text } from 'react-native-paper';
import ItemsList from './ItemsList';

const Separator = () => <View style={styles.separator} />;
const Splash = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../assets/OIG1.png')}
        style={{
          width: 300,
          height: 300,
        }}
      />
      <Text style={styles.titleText}>Welcome to Budget Bites!</Text>
      <View>
        {/* <ItemsList /> */}

        <Separator />
        <Button
          mode="contained"
          title="Login"
          buttonColor="#eb6b34"
          onPress={() => navigation.navigate('Login')}
        >
          {' '}
          Login{' '}
        </Button>

        <Separator />
        <Button
          mode="contained"
          title="CreateAccount"
          buttonColor="#eb6b34"
          onPress={() => navigation.navigate('Account Creation')}
        >
          Create Account
        </Button>
        <Separator />
        <Button
          mode="contained"
          title="Guest Login"
          buttonColor="#eb6b34"
          onPress={() => navigation.navigate('List')}
        >
          Guest Login
        </Button>
        <Separator />
        <Button
          mode="contained"
          title="Create Listing"
          buttonColor="#eb6b34"
          onPress={() => navigation.navigate('Create Listing')}
        >
          Create Listing
        </Button>
        <Separator />
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
