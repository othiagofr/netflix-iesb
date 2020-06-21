import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import Tabs from './routes/Tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Camera from './screen/Camera';
import ChooseIcon from './screen/ChooseIcon';
import ProfileToEdit from './screen/ProfileToEdit';
import AppContext from './AppContext'
import messaging, { firebase } from '@react-native-firebase/messaging';

const Stack = createStackNavigator();

export default function App() {

  const PROFILES_AVAILABlES = [
    {
        icon: require('./assets/avatars/avatar1.png'),
        name: 'José',
        uri: null,
    },
    {
        icon: require('./assets/avatars/avatar2.png'),
        name: 'Luiz',
        uri: null,
    },
    {
        icon: require('./assets/avatars/avatar3.png'),
        name: 'João',
        uri: null,
    },
    {
        icon: require('./assets/avatars/avatar4.png'),
        name: 'Maria',
        uri: null,
    },
    {
        icon: require('./assets/avatars/avatar5.png'),
        name: 'Pedro',
        uri: null,
    },
];

  const [profilesAvailables, setProfilesAvailables] = useState(PROFILES_AVAILABlES)

  const editProfileIcon = (nameProfile, uri) => {

    const newProfiles = profilesAvailables.map(p => {
      if(p.name === nameProfile) {
        return { 
          name: nameProfile,
          icon: p.icon,
          uri: uri
         }
      }
      return p
    })

    console.log("newProfiles", newProfiles)

    setProfilesAvailables(newProfiles)

  }

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log("Notificação recebida", remoteMessage);
  });
  

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      
      const { notification } = remoteMessage;

      Alert.alert(notification.title, notification.body);
    });

    return unsubscribe;
  }, []);

  return (
    <AppContext.Provider
      value={{
        profilesAvailables,
        editProfileIcon: editProfileIcon
      }}
    >
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
    </AppContext.Provider>
  )

}