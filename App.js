import React from 'react';
import { View, Text } from 'react-native-web';
import { MapScreen } from './assets/screens/';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {AllShopsList} from './assets/components/allShopsList'



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home"
          component={MapScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="Details"
          component={AllShopsList}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
