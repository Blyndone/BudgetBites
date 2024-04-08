/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Pressable,
} from 'react-native';
// import Logo from './testimage.js';

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
//Import Pages
import Splash from './src/components/Splash.js';
import GuestMainView from './src/components/GuestMainView.js';
import CreateAccount from './src/components/CreateAccount.js';
import Login from './src/components/Login.js';
import BuyerMainView from './src/components/Buyer/BuyerMainView.js';
import SellerMainView from './src/components/Seller/SellerMainView.js';
import SellerCreateListing from './src/components/Seller/SellerCreateListing.js';
import BuyerReservations from './src/components/Buyer/BuyerReservations.js';
import BuyerProfile from './src/components/Buyer/BuyerProfile.js';
import SellerProfile from './src/components/Seller/SellerProfile.js';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({ children, title }: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}
      >
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
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{
              title: '',
              headerStyle: {
                backgroundColor: '#eb6b34',
              },
            }}
          />
          <Stack.Screen
            name="Guest Main View"
            component={GuestMainView}
            options={{
              title: 'Guest Food Listings',
              headerStyle: {
                backgroundColor: '#eb6b34',
              },
            }}
          />
          <Stack.Screen
            name="Buyer Main View"
            component={BuyerMainView}
            options={{
              title: 'Item Listings',
              headerStyle: {
                backgroundColor: '#eb6b34',
              },
              headerLeft: () => <View style={{ paddingHorizontal: 17 }}></View>,
              headerRight: () => <BuyerProfileButton />,
            }}
          />
          <Stack.Screen
            name="Seller Main View"
            component={SellerMainView}
            options={{
              title: 'Manage Listings',
              headerStyle: {
                backgroundColor: '#eb6b34',
              },

              headerLeft: () => <View style={{ paddingHorizontal: 17 }}></View>,
              headerRight: () => <SellerProfileButton />,
            }}
          />
          <Stack.Screen
            name="Account Creation"
            component={CreateAccount}
            options={{
              headerStyle: {
                backgroundColor: '#eb6b34',
              },
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerStyle: {
                backgroundColor: '#eb6b34',
              },
            }}
          />
          <Stack.Screen
            name="Seller Create Listing"
            component={SellerCreateListing}
            options={{
              title: 'Add a Food Listing',
              headerStyle: {
                backgroundColor: '#eb6b34',
              },
              headerRight: () => <SellerProfileButton />,
            }}
          />
          <Stack.Screen
            name="Buyer Reservations"
            component={BuyerReservations}
            options={{
              title: 'Manage Reservations',
              headerStyle: {
                backgroundColor: '#eb6b34',
              },
              headerRight: () => <BuyerProfileButton />,
            }}
          />
          <Stack.Screen
            name="Buyer Profile"
            component={BuyerProfile}
            options={{
              title: 'My Profile',
              headerStyle: {
                backgroundColor: '#eb6b34',
              },
            }}
          />
          <Stack.Screen
            name="Seller Profile"
            component={SellerProfile}
            options={{
              title: 'My Profile',
              headerStyle: {
                backgroundColor: '#eb6b34',
              },
            }}
          />
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

const BuyerProfileButton = () => {
  return (
    <Pressable
      onPress={() => {
        console.log('press');
      }}
    >
      <Text style={[styles.headerButton]}>Profile</Text>
    </Pressable>

    //   <Button
    //     onPress={() => {
    //       console.log('PRESS');
    //     }}
    //     title="Account"
    //     color="##faa543"
    //     styles = {}
    //   />
  );
};

const SellerProfileButton = () => {
  return (
    <Pressable
      onPress={() => {
        console.log('press');
      }}
    >
      <Text style={[styles.headerButton]}>Profile</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  headerButton: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
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
