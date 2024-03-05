import * as React from "react";
import { View, Text, StyleSheet, SafeAreaView, Image, Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Separator = () => <View style={styles.separator} />;
const Login = ({navigation}) => {


    return (
        <SafeAreaView style={ styles.container}>
            <Image  
                source={require('../../assets/OIG1.png')}
                style={{
                width: 300, 
                height: 300,
                }}         
            />
            <Text style={styles.titleText}>
                Welcome to Budget Bites!
            </Text>
            <View>

                    <Separator />
                    <Button
                    title="List"
                    color="#eb6b34"
                    onPress={() => navigation.navigate('List')}
                />
                    <Separator />
                    <Button
                    title="Create Account"
                    color="#eb6b34"
                />
                <Separator />
                    <Button
                    title="Guest Login"
                    color="#eb6b34"
                />
                    <Separator />
            </View>
        

        </SafeAreaView>
        
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'teal',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText:{
        fontSize: 50,
        textAlign: 'center',
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



})



export default Login
