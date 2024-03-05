import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
  },
});

const Greeting = props => {
  return (
    <View style={styles.center}>
      <Text>Hello {props.name}!</Text>
    </View>
  );
};

const LotsOfGreetings = () => {
  return (
    <View style={[styles.center, {top: 50}]}>
      <Greeting name="Rexxar" />
      <Greeting name="Jaina" />
      <Greeting name="Valeera" />
    </View>
  );
};

const Logo = () => {
    return(
        <Image  
        source={require('./data/OIG1.jpg')}
        style={{width: 300, height: 300}}
        stretch= {{width: 50,height: 200,resizeMode: 'stretch',   }}
        
        />
    );

};


export default Logo;