import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CalendarModal from '../../../Schedule/components/calendar';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './styles';
import LoadingGif from '../../../../assets/images/loading/loading.gif';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ScheduleDaily = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [reservation, setReservation] = useState(true);
  const [userId, setUserId] = useState([]);
  const [selected, setSelected] = useState(' ');
  const [barber, setBarber] = useState(null);

  useEffect(() => {
    setLoading(false);
    //     getUserId()
  }, []);

  const horario = [
    {nome: 'Agenda', horario: '10:00'},
    {nome: 'aaaaaa', horario: '13:00'},
    {nome: 'bbbbbb', horario: '15:00'},
    {nome: 'cccccc', horario: '16:00'},
  ];

  const setCalendar = date => {
    setSelected(date);
  };
  const hidePass = () => {
    setHide(!hide);
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
          <View style={{marginTop: 20, marginHorizontal: 10}} />
          <ScrollView style={{flex: 1}}>
            <View style={styles.container}>
              {selected === ' ' ? (
                <Text style={styles.title}>Selecione uma data</Text>
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
                    <Text style={styles.title}>{selected}</Text>
                  </View>
                </View>
              )}
            </View>
            {selected === ' ' && (
              <CalendarModal setCalendar={setCalendar} date={selected} />
            )}
          </ScrollView>
        </>
      )}
      {selected !== ' ' && !loading && (
        <>
          <View style={styles.hourContainer}>
            <View style={styles.viewFlex}>
              <View style={styles.viewFlex}>
                <Text style={styles.contentHoursDays}>Horario</Text>
                <Text style={styles.contentHoursDays}>Cliente</Text>
              </View>
              <View style={styles.viewFlex}>
                <Text style={styles.contentHoursDays}>10:00</Text>
                <Text style={styles.contentHoursDays}>GUILMARZINHO</Text>
              </View>
            </View>
          </View>
        </>
      )}
    </LinearGradient>
  );
};

export default ScheduleDaily;
