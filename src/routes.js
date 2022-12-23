import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import AntDesing from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";

import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MyTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor='#4f076a'
            inactiveColor='#8c8c8c'
            barStyle={{
                backgroundColor: '#f2f2f2',
                marginVertical: -10
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: 'Início',
                    tabBarIcon: ({ color }) => <AntDesing name="home" color={color} size={26} />
                }}
            />

            <Tab.Screen
                name="Explore"
                component={Home}
                options={{
                    tabBarLabel: 'Explorar',
                    tabBarIcon: ({ color }) => <Entypo name="magnifying-glass" color={color} size={26} />
                }}
            />

            <Tab.Screen
                name="Perfil"
                component={Home}
                options={{
                    tabBarLabel: 'Perfil',
                    tabBarIcon: ({ color }) => <AntDesing name="user" color={color} size={26} />
                }}
            />
        </Tab.Navigator>
    );
}

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={MyTabs} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;