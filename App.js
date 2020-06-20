import React from 'react';
import Tabs from './routes/Tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Camera from './screen/Camera';
import ChooseIcon from './screen/ChooseIcon';
import ProfileToEdit from './screen/ProfileToEdit';

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Camera"
          component={Camera}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ChooseIcon"
          component={ChooseIcon}
          options={{ headerShown: true }}
        />

        <Stack.Screen
          name="ProfileToEdit"
          component={ProfileToEdit}
          options={{ headerShown: true }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  )

}