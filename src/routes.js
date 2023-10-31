import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';
import {NavigationContainer, useTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';

//SCREENS
import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';
import OptionRegister from './screens/OptionRegister';
import Perfil from './screens/Pefil';
import Store from './screens/Store';
import Explore from './screens/Explore';
import Establishment from './screens/Establishment';
import Statistics from './screens/Statistics';
import Schedule from './screens/Schedule';
import AgendHistoric from './screens/AgendHistoric';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MyTabs = () => {
  const theme = useTheme();
  theme.colors.secondaryContainer = 'transperent';

  const [user, setUser] = useState({});
  const foto =
    'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745';

  const userGet = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userInfo');
      const params = JSON.parse(jsonValue);
      setUser(params);
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    userGet();
  }, []);

  return (
    <Tab.Navigator
      initialRouteName={
        user.TipoUsuario === 'Cliente' ? 'home' : 'Establishment'
      }
      activeColor="#14fef3"
      inactiveColor="#03302e"
      shifting={true}
      sceneAnimationEnabled={true}
      labeled={false}
      barStyle={{
        backgroundColor: '#000000',
      }}>
      {user.TipoUsuario === 'Cliente' && (
        <Tab.Screen
          name="home"
          component={Home}
          options={{
            tabBarLabel: 'Início',
            tabBarIcon: ({color}) => (
              <Entypo name="home" color={color} size={30} />
            ),
            headerShown: false,
          }}
        />
      )}

      {user.TipoUsuario === 'Cliente' && (
        <Tab.Screen
          name="Explore"
          component={Explore}
          options={{
            tabBarLabel: 'Explorar',
            tabBarIcon: ({color}) => (
              <Entypo name="magnifying-glass" color={color} size={30} />
            ),
            headerShown: false,
          }}
        />
      )}

      {user.TipoUsuario == 'Dono' && (
        <Tab.Screen
          name="Estabelecimento"
          component={Establishment}
          options={{
            tabBarLabel: 'Estabelecimento',
            tabBarIcon: ({color}) => (
              <Entypo name="shop" color={color} size={30} />
            ),
            headerShown: false,
          }}
        />
      )}

      {user.TipoUsuario == 'Funcionario' && (
        <Tab.Screen
          name="Estabelecimento"
          component={Establishment}
          options={{
            tabBarLabel: 'Estabelecimento',
            tabBarIcon: ({color}) => (
              <Entypo name="shop" color={color} size={30} />
            ),
            headerShown: false,
          }}
        />
      )}

      {user.TipoUsuario == 'Dono' && (
        <Tab.Screen
          name="Relatório"
          component={Statistics}
          options={{
            tabBarLabel: 'Relatório',
            tabBarIcon: ({color}) => (
              <Entypo name="bar-graph" color={color} size={30} />
            ),
            headerShown: false,
          }}
        />
      )}

      {user.TipoUsuario == 'Funcionario' && (
        <Tab.Screen
          name="Relatório"
          component={Statistics}
          options={{
            tabBarLabel: 'Relatório',
            tabBarIcon: ({color}) => (
              <Entypo name="bar-graph" color={color} size={30} />
            ),
            headerShown: false,
          }}
        />
      )}

      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: () => (
            <Image
              source={{uri: user.Foto ? user.Foto : foto}}
              style={{width: 30, height: 30, borderRadius: 100}}
              resizeMode={'contain'}
            />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={MyTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OptionRegister"
          component={OptionRegister}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Perfil"
          component={MyTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Store"
          component={Store}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Explore"
          component={MyTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Establishment"
          component={MyTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Schedule"
          component={Schedule}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AgendHistoric"
          component={AgendHistoric}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
