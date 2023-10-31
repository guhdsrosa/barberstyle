import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import CalendarModal from '../../../Schedule/components/calendar';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import callApi from '../../../../server/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ScheduleDaily = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState('');
  const [estab, setEstab] = useState(null);
  const [horarios, setHorarios] = useState([]);

  const userGet = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userInfo');
      const params = JSON.parse(jsonValue);
      setUser(params);
    } catch (e) {
      // error reading value
    }
  };

  const GetHorarios = async () => {
    setHorarios([])
    if (user.IdUsuario) {
      try {
        var config = {
          method: 'post',
          url: 'Funcionario/horarioAgenda',
          data: {
            IdUsuario: user.IdUsuario,
            IdEstabelecimento: estab.IdEstabelecimento,
            DataFront: selected,
          },
        };
        callApi(config)
          .then(function (response) {
            if (response.status == 200) {
              setHorarios(response.data.horarios);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } catch (err) {
        console.log('[ERROR]', err);
      }
    };
  }

  const GetEstablish = async () => {
    if (user.IdUsuario) {
      try {
        var config = {
          method: 'post',
          url: 'Estabelecimento/returnDono',
          data: {
            IdUsuario: user.IdUsuario,
          },
        };
        callApi('Estabelecimento/returnDono', config)
          .then(function (response) {
            if (response.status == 200) {
              setEstab(response.data.query[0]);
              setLoading(false)
            }
          })
          .catch(function (error) {
            console.log('Erro');
          });
      } catch (err) {
        console.log('[ERROR]', err);
      }
    }
  };

  useEffect(() => {
    GetEstablish()
  }, [user])

  useEffect(() => {
    userGet()
  }, [])

  useEffect(() => {
    GetHorarios()
  }, [selected])

  return (
    <LinearGradient colors={['#ffffff', '#fff']} style={styles.container}>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size={30} color={'#36cbc5'} />
          <Text style={styles.loadingText}>Carregando</Text>
        </View>
      )}

      {!loading && (
        <ScrollView style={{ marginTop: 20 }}>
          <View style={styles.container}>
            <Text style={styles.title}>Selecione uma data</Text>
            <CalendarModal
              setCalendar={setSelected} date={selected}
            />

            {horarios.length > 0 && horarios.map((res, index) => (
              <View key={index} style={styles.hourContainer}>
                <View style={styles.viewFlex}>
                  <Text style={styles.contentHoursDays}>Cliente: {res.Cliente}</Text>
                  <Text style={styles.contentHoursDays}>Horario: {res.Horario.substring(11, 16)}</Text>
                  <Text style={styles.contentHoursDays}>Data: {res.Data}</Text>
                  <Text style={styles.contentHoursDays}>Servicos: {res.Servicos}</Text>
                  <Text style={styles.contentHoursDays}>Valor: {res.Valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </LinearGradient>
  );
};

export default ScheduleDaily;
