import React, {useEffect, useState} from 'react';
import {SelectList} from 'react-native-dropdown-select-list';
import {StyleSheet, ScrollView, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './styles';
import LoadingGif from '../../assets/images/loading/loading.gif';
import Entypo from 'react-native-vector-icons/Entypo';
import PieChart from 'react-native-pie-chart';

const Statistics = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState([]);
 
  const data = [
    {key: '1', value: 'do dia'},
    {key: '2', value: '3 dias'},
    {key: '3', value: '5 dias', disabled: true},
    {key: '4', value: '15 dias', disabled: true},
    {key: '5', value: '20 dias'},
  ];
  const [value, setValue] = useState('do dia');
  const valueGraphic = [100, 30, 50];
  const colorGraphic = ['#2eb830', '#0066ff', '#DCDCDC'];
  const style = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      margin: 10,
    },
  });

  useEffect(() => {
    setLoading(false);
    //     getUserId()
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
          <View style={{marginTop: 10, marginHorizontal: 10}}>
            <SelectList
              setSelected={setValue}
              data={data}
              save="value"
              d
              search={false}
              dropdownTextStyles={{color: '#181818'}}
              disabledTextStyles={{color: '#DCDCDC'}}
              placeholder="Selecione o Período"
              fontFamily="Quicksand-Medium"
              boxStyles={{backgroundColor: '#141414'}}
              inputStyles={{color: '#fff'}}
              arrowicon={
                <Entypo name="chevron-small-down" color={'#fff'} size={20} />
              }
            />
          </View>
          <ScrollView style={{flex: 1}}>
            <View style={style.container}>
              <Text style={style.title}>Estatisticas</Text>
              <PieChart
                widthAndHeight={250}
                series={valueGraphic}
                sliceColor={colorGraphic}
                //coverRadius={0.70}
              />
              <View style={{height: 200}} />
              <View
                style={{
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  flexDirection: 'row',
                  height: 100,
                  width: '100%',
                  display: 'flex',
                }}>
                <View >
                  <Text>Produção</Text>
                  <Text />
                  <PieChart
                    widthAndHeight={30}
                    series={[1]}
                    sliceColor={['#2eb830']}
                    coverFill={'#FFF'}
                  />
                  <Text>{value}</Text>
                </View>
                <View>
                  <Text>Tempo </Text>
                  <Text>considerados</Text>
                  <PieChart
                    widthAndHeight={30}
                    series={[1]}
                    sliceColor={['#0066ff']}
                    coverFill={'#FFF'}
                  />
                  <Text>{value}</Text>
                </View>
                <View>
                  <Text>Dias</Text>
                  <Text>restantes</Text>
                  <PieChart
                    widthAndHeight={30}
                    series={[1]}
                    sliceColor={['#DCDCDC',]}
                    coverFill={'#FFF'}
                  />
                  <Text>{value}</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </>
      )}
    </LinearGradient>
  );
};

export default Statistics;
