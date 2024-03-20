import * as React from 'react';
import { View, StyleSheet, SafeAreaView, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Text, TextInput, RadioButton } from 'react-native-paper';

const Separator = () => <View style={styles.separator} />;
const CreateAccount = ({ navigation }) => {
  const [name_text, setTextName] = React.useState('');
  const [email_text, setTextEmail] = React.useState('');
  const [phone_text, setTextPhone] = React.useState('');
  const [zip_text, setTextZip] = React.useState('');
  const [user_text, setTextUser] = React.useState('');
  const [pass_text, setTextPass] = React.useState('');

  const [value, setValue] = React.useState('first');

  return (
    <SafeAreaView style={styles.form}>
      <View style={styles.textinput}>
        <Text style={styles.titleText}>Account Creation</Text>
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
            onChangeText={(user_text) => setTextUser(namuser_texte_text)}
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
            onValueChange={(newValue) => setValue(newValue)}
            value={value}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton value="first" />
              <Text style={styles.bodytext}>Customer</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton value="second" />
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
          onPress={() => navigation.navigate('List')}
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

export default CreateAccount;
