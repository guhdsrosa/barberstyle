import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import callApi from '../../server/api';

import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

const AgendHistoric = () => {
  const [user, setUser] = useState();
  const [cortes, setCortes] = useState([]);

  const userGet = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userInfo');
      const params = JSON.parse(jsonValue);
      setUser(params);
    } catch (e) {
      // error reading value
    }
  };

  const userHistoric = () => {
    try {
      var config = {
        method: 'post',
        url: 'Usuario/horariosUsuarioHistory',
        data: {
          IdUsuario: user.IdUsuario,
        },
      };
      callApi(config)
        .then(function (response) {
          if (response.status === 200) {
            setCortes(response.data.query);
          }
        })
        .catch(function (error) {
          console.log('[error]', error);
        });
    } catch (err) {
      console.log('[error]', err);
    }
  };

  useEffect(() => {
    userGet();
  }, []);

  useEffect(() => {
    if (user?.IdUsuario) {
      userHistoric();
    }
  }, [user]);

  // {"DataMarcada": "28/10/2023", "Funcionario": "Guilherme Caliari", "Horario": "1970-01-01T09:45:00.000Z", "Servicos": "Corte Simples ", "Valor": 45}

  return (
    <LinearGradient colors={['#191919', '#000d0c']} style={styles.container}>
      {cortes.map((res, index) => (
        <View key={index}>
          <Text style={{color: '#fff'}}>{res.DataMarcada}</Text>
        </View>
      ))}
    </LinearGradient>
  );
};

export default AgendHistoric;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
