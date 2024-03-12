import * as React from "react";
import { View,  StyleSheet, SafeAreaView, Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Text, TextInput, RadioButton
 } from 'react-native-paper';


const Separator = () => <View style={styles.separator} />;
const CreateListing = ({navigation}) => {
  const [name_text, setName] = React.useState("");
  const [desc_text, setDescription] = React.useState("");
  const [price_text, setPrice] = React.useState("");
  

  


    return (
        <SafeAreaView style={ styles.form}>
          <Text>CREATE LISTING</Text>
            
            <View style = { styles.textinput}>
            <Text style={styles.titleText}>
                Account Creation
            </Text>
            <Separator />
            <Text style = { styles.bodytext}>
                Get started with an account. 
                {"\n"}
                {"\n"}
                * indicates a required field. 
                {"\n"}
            </Text>




        <View 
        style= {{  
            padding: 10
        }}>
        
        
        <TextInput
      label="Item Name"
      value={name_text}
      onChangeText={name_text => setName(name_text)}
      style={styles.textinput}
      />


      
        <TextInput
      label="Description"
      value={desc_text}
      onChangeText={desc_text => setDescription(desc_text)}
      style={styles.textinput}

      />


      <TextInput
      label="Price"
      value={price_text}
      onChangeText={price_text => setPrice(price_text)}
      style={styles.textinput}
      textContentType="telephoneNumber"
      keyboardType = 'number-pad'
      maxLength={10}
      />

      </View>



      </View>

            <View>

                    <Separator />
                    <Button mode = "contained"
                    title="List"
                    buttonColor="#eb6b34"
                    onPress={() => {

                      fetch('http://10.0.2.2:5000/additem', {
                        method: 'POST',
                        headers: {
                          "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                          name_text: name_text,
                          desc_text: desc_text,
                          price_text: price_text
                        })
                      });
                      
                      navigation.navigate('List')
                      
                      
                    }
                    
                    }> Submit </Button>

                    <Separator />
                  

            </View>
        

        </SafeAreaView>
        
    )

}


const styles = StyleSheet.create({
    form: {
        flex: 1,
        backgroundColor: 'teal',
        justifyContent: 'top',
        padding: 20
    },
    titleText:{
        fontSize: 30,
        textAlign: 'left',
        color: 'black',
        fontWeight: 'bold',
        fontFamily: 'Helvetica'
    },
    button:{
        color:'#f194ff',
        backgroundColor: '#f194ff'
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
      textinput:{
        margin:5,


      },
      bodytext:{
        fontSize: 15,
        fontWeight: 'bold'
      },




})



export default CreateListing



