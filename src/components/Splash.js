import * as React from 'react';
import { View, StyleSheet, SafeAreaView, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Text, Surface } from 'react-native-paper';

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

      <Surface style={styles.surface} elevation={4}>
        <View>
          <View>
            <Text style={styles.titleText}>
              Welcome to{'\n'} Budget Bites!{' '}
            </Text>
          </View>
          <View style={styles.buttoncontainer}>
            <Button
              style={styles.button}
              mode="contained"
              title="Login"
              buttonColor="#eb6b34"
              labelStyle={{ fontSize: 16, color: 'black' }}
              onPress={() => navigation.navigate('Login')}
            >
              Login
            </Button>

            <Button
              style={styles.button}
              mode="contained"
              title="CreateAccount"
              buttonColor="#eb6b34"
              labelStyle={{ fontSize: 16, color: 'black' }}
              onPress={() => navigation.navigate('Account Creation')}
            >
              Create Account
            </Button>

            <Button
              style={styles.button}
              mode="contained"
              title="Guest Login"
              buttonColor="#eb6b34"
              labelStyle={{ fontSize: 16, color: 'black' }}
              onPress={() => navigation.navigate('Guest Main View')}
            >
              Guest Login
            </Button>
          </View>
        </View>
      </Surface>
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
  buttoncontainer: {
    margin: 10,

    alignItems: 'center',
  },
  titleText: {
    fontSize: 55,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    fontStyle: 'italic',
    marginBottom: 30,
  },
  button: { width: '50%', margin: 5 },

  surface: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#00b3b3',
    marginVertical: 10,
    width: '90%',
  },
});

export default Splash;
