import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CalendarModal from '../../../Schedule/components/calendar';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './styles';
import LoadingGif from '../../../../assets/images/loading/loading.gif';
import AntDesign from 'react-native-vector-icons/AntDesign';
import callApi from '../../../../server/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ScheduleDaily = ({route}) => {
  const {IdEstabelecimento} = route?.params
  const navigation = useNavigation();
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(false);
  const [reservation, setReservation] = useState(true);
  const [userHorario, setUserHorario] = useState(' ');
  const [selected, setSelected] = useState('');
  const [barber, setBarber] = useState(null);

  const GetHorarios = async () => {
    try {
      var config = {
        method: 'post',
        url: 'Funcionario/horarioAgenda',
        data: {
          IdFuncionario: user.IdUsuario,
          IdEstabelecimento: user.IdEstabelecimento,
          DataFront: selected,
        },
      };
      console.log(config);
      callApi(config)
        .then(function (response) {
          if (response.status == 200) {
            console.log(response.data.horarios);
          }
        })
        .catch(function (error) {
          Alert.alert('', 'Erro');
        });
    } catch (err) {
      //console.log('[ERROR]', err);
    }
  };

  useEffect(() => {
    setLoading(false);
    //     getUserId()
  }, []);
  useEffect(() => {
    GetHorarios();
  }, [!selected]);

  const setCalendar = date => {
    setSelected(date);
  };
  const hidePass = () => {
    setHide(!hide);
  };
  const userGet = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userInfo');
      setUser(JSON.parse(jsonValue));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    userGet();
  }, []);

  return (
    <LinearGradient colors={['#ffffff', '#fafafa']} style={styles.container}>
      {loading && (
        <View style={styles.loading}>
          <FastImage
            style={{height: 200, width: 200}}
            source={LoadingGif}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text style={styles.loadingText}>Carregando</Text>
        </View>
      )}
      {!loading && (
        <>
          <View style={{marginTop: 20, marginHorizontal: 10}} />
          <ScrollView style={{flex: 1}}>
            <View style={styles.container}>
              {selected === ' ' ? (
                <>
                  <Text style={styles.title}>Selecione uma data</Text>
                  <CalendarModal setCalendar={setCalendar} date={selected} />
                </>
              ) : (
                <View>
                  <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifySelf: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => setSelected(' ')}
                      style={styles.backButton}>
                      <AntDesign
                        name="left"
                        size={30}
                        color={'#fff'}
                        style={{
                          height: 50,
                          alignSelf: 'center',
                          color: '#000',
                        }}
                      />
                    </TouchableOpacity>
                    <Text style={styles.dateTitle}>{selected}</Text>
                  </View>
                  <View style={styles.hourContainer}>
                    <View style={styles.viewFlex}>
                      <Text style={styles.contentHoursDays}>Horario</Text>
                      <Text style={styles.contentHoursDays}>Cliente</Text>
                    </View>
                    <View style={styles.viewFlex}>
                      <Text style={styles.contentHoursDays}>16:21</Text>
                      <Text style={styles.contentHoursDays}>Gilmarzinho</Text>
                    </View>
                  </View>
                </View>
              )}
            </View>
          </ScrollView>
        </>
      )}
    </LinearGradient>
  );
};

export default ScheduleDaily;
