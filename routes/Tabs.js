import 'react-native-gesture-handler';
import * as React from 'react';
import HomeRoutes from './HomeRoutes';
import MoreRoutes from './MoreRoutes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, AntDesign, MaterialIcons, Feather } from '@expo/vector-icons';
import Home from '../screen/Home';
import { translate } from '../languages/utils';

const Tab = createBottomTabNavigator();


export default function Tabs() {
    return (

        <Tab.Navigator
            tabBarOptions={{
                backgroundColor:'black',
                activeTintColor:'white',
                style:{
                    backgroundColor:'#1a1718',
                    borderTopColor:'transparent'
                }
            }}
        >

            <Tab.Screen
                name='Home'
                component={HomeRoutes}
                options={{
                    tabBarLabel: translate('home'),
                    tabBarIcon: ({ color, size }) => <Entypo name='home' size={size} color={color} />
                }}
            />

            <Tab.Screen
                name='Busca'
                component={Home}
                options={{
                    tabBarLabel: translate('search'),
                    tabBarIcon: ({ color, size }) => <AntDesign name='search1' size={size} color={color} />
                }}
            />

            <Tab.Screen
                name='Em breve'
                component={Home}
                options={{
                    tabBarLabel:translate('soon'),
                    tabBarIcon: ({ color, size }) => <MaterialIcons name='perm-media' size={size} color={color} />
                }}
            />

            <Tab.Screen
                name='Downloads'
                component={Home}
                options={{
                    tabBarLabel:translate('downloads'),
                    tabBarIcon: ({ color, size }) => <Feather name='download' size={size} color={color} />
                }}
            />

            <Tab.Screen
                name='Mais'
                component={MoreRoutes}
                options={{
                    tabBarLabel:translate('more'),
                    tabBarIcon: ({ color, size }) => <Feather name='menu' size={size} color={color} />
                }}
            />


        </Tab.Navigator>

    )
}