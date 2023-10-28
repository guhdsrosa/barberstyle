import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import React, {useEffect, useState} from 'react';
import CalendarModal from '../../../Schedule/components/calendar';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './styles';
import LoadingGif from '../../../../assets/images/loading/loading.gif';


const ScheduleDaily = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [reserveLoading, setReserveLoading] = useState(false)
  const [userId, setUserId] = useState([])
  const [horario, setHorario] = useState('')
  const [value, setValue] = useState('do dia')
  const [dataHour, setDataHour] = useState([])
  const [selected, setSelected] = useState('')
  const [barber, setBarber] = useState(null)


  useEffect(() => {
    setLoading(false);
    //     getUserId()
  }, []);

  const setCalendar = date => {
    setSelected(date);
  };

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
          <View style={{marginTop: 10, marginHorizontal: 10}} />

          <ScrollView style={{flex: 1}}>
            <View style={style.container}>
              <Text style={style.title}>Agenda</Text>
            </View>
            <CalendarModal setCalendar={setCalendar} date={selected} />

            {selected && (
              <View style={styles.hourContainer}>
                <>
                  {dataHour.map(
                    res =>
                      res.disabled == null && (
                        <TouchableOpacity
                          style={styles.hourContent}
                          onPress={() => setHorario(res)}>
                          <Text
                            style={[
                              styles.hourText,
                              {
                                backgroundColor:
                                  horario.value === res.value
                                    ? '#0db2aa'
                                    : '#141414',
                              },
                            ]}>
                            {res.value}
                          </Text>
                        </TouchableOpacity>
                      ),
                  )}
                  {horario && (
                    <TouchableOpacity style={styles.buttomAccept}>
                      {!reserveLoading ? (
                        <Text style={styles.buttomAcceptText}>
                          Reservar Horário
                        </Text>
                      ) : (
                        <Text style={styles.buttomAcceptText}>
                          <ActivityIndicator size={20} color={'#fff'} />
                        </Text>
                      )}
                    </TouchableOpacity>
                  )}
                </>
              </View>
            )}
          </ScrollView>
        </>
      )}
    </LinearGradient>
  );
};

export default ScheduleDaily;
