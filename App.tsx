/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
// import Logo from './testimage.js';
import Splash  from './src/components/Splash.js';
import List from './src/components/List.js';
import CreateAccount from './src/components/CreateAccount.js';
import Login from './src/components/Login.js';
import CreateListing from './src/components/CreateListing.js';

import { NavigationContainer, StackRouter } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { PaperProvider } from 'react-native-paper';

type SectionProps = PropsWithChildren<{
  title: string;
}>;








function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
      <PaperProvider>

        <NavigationContainer>
          <Stack.Navigator initialRouteName='Splash'>
            
            
            <Stack.Screen name="Budget Bytes" component={Splash}
                  options={{
                    headerStyle:{
                      backgroundColor: '#eb6b34',
                    }
                  }} />
            <Stack.Screen name="List" component={List} 
            
            options={{
              headerStyle:{
                backgroundColor: '#eb6b34',
              }
            }}/>

            <Stack.Screen name="Account Creation" component={CreateAccount} 
            
            options={{
              headerStyle:{
                backgroundColor: '#eb6b34',
              }
            }}/>
      
      <Stack.Screen name="Login" component={Login} 
            
            options={{
              headerStyle:{
                backgroundColor: '#eb6b34',
              }
            }}/>

      <Stack.Screen name="Create Listing" component={CreateListing} 
            
            options={{
              headerStyle:{
                backgroundColor: '#eb6b34',
              }
            }}/>



          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
   
   
   
    // <SafeAreaView style={backgroundStyle}>
    //   <StatusBar
    //     barStyle={isDarkMode ? 'light-content' : 'dark-content'}
    //     backgroundColor={backgroundStyle.backgroundColor}
    //   />
    //   <ScrollView
    //     contentInsetAdjustmentBehavior="automatic"
    //     style={backgroundStyle}>
    //     <Header />
    //     <View
    //       style={{
    //         backgroundColor: isDarkMode ? Colors.black : Colors.white,
    //       }}>
    //       <Section title="Step One">
    //         Edit <Text style={styles.highlight}>App.tsx</Text> THIS IS A TRIUMPH.
    //       </Section>
    //       <Logo />
    //       <Section title="See Your Changes">
    //         <ReloadInstructions />
    //       </Section>
    //       <Section title="Debug">
    //         <DebugInstructions />
    //       </Section>
    //       <Section title="Learn More">
    //         Read the docs to discover what to do next:
    //       </Section>
    //       <LearnMoreLinks />
    //     </View>
    //   </ScrollView>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
