import React, {useState, useEffect} from 'react';
import {Text, ScrollView, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import callApi from '../../server/api';

//Screens
import Geral from './components/geral';
import Horario from './components/horario';
import Profissionais from './components/profissionais';
import ScheduleDaily from './components/scheduleDaily';

import styles from './styles';

const Establishment = () => {
  const [option, setOption] = useState('Agenda');
  const [user, setUser] = useState('');
  const [estab, setEstab] = useState(null);
  const [services, setServices] = useState(null);

  const [optionsSelect, setOptionsSelect] = useState([
    {name: 'Agenda'},
    {name: 'Horarios'},
  ]);

  const userGet = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userInfo');
      const params = JSON.parse(jsonValue);
      setUser(params);

      if (params.TipoUsuario === 'Dono') {
        setOptionsSelect([
          {name: 'Agenda'},
          {name: 'Estabelecimento'},
          {name: 'Horarios'},
          {name: 'Profissionais'}
        ]);
      }
    } catch (e) {
      // error reading value
    }
  };

  const GetEstablish = async () => {
    try {
      var config = {
        method: 'post',
        url: 'Estabelecimento/returnDono',
        data: {
          IdUsuario: user.IdUsuario,
        },
      };
      //console.log("Config", config);
      callApi(config)
        .then(function (response) {
          if (response.status == 200) {
            //console.log(response.data.query)
            setEstab(response.data.query[0]);
          }
        })
        .catch(function (error) {
          Alert.alert('', 'Erro');
        });
    } catch (err) {
      console.log('[ERROR]', err);
    }
  };

  const optionSelect = ({opt}) => {
    setOption(opt);
  };

  useEffect(() => {
    if (user)
     GetEstablish();
  }, [user]);

  useEffect(() => {
    userGet();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <ScrollView style={styles.scrollContent} horizontal={true}>
        {optionsSelect.map((result, index) => (
          <TouchableOpacity
            onPress={() => {
              optionSelect({opt: result.name});
            }}
            style={styles.touchOption}
            key={index}>
            <Text
              style={[
                styles.textOption,
                {color: option == result.name ? '#0fcbc2' : '#fff'},
              ]}>
              {result.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {option == 'Agenda' && <ScheduleDaily item={[user]} />}

      {option == 'Estabelecimento' && <Geral establishment={estab} />}

      {option == 'Horarios' && <Horario establishment={estab} />}

      {option == 'Profissionais' && <Profissionais establishment={estab} />
      }
    </ScrollView>
  );
};

export default Establishment;
