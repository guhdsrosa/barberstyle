import React, {useEffect, useState} from 'react';
import {SelectList} from 'react-native-dropdown-select-list';
import {StyleSheet, ScrollView, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingGif from '../../assets/images/loading/loading.gif';
import Entypo from 'react-native-vector-icons/Entypo';
import PieChart from 'react-native-pie-chart';
import callApi from '../../server/api';

const Statistics = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [estab, setEstab] = useState(null);
  const [dataInitial, setDataInitial] = useState(null);
  const [dataFinal, setDataFinal] = useState(null);
  const [produto, setProduto] = useState({valor: null, quantidade: null});
  const data = [
    {key: '1', value: 'do dia'},
    {key: '2', value: '3 dias'},
    {key: '3', value: '5 dias'},
    {key: '4', value: '15 dias'},
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
  const GetEstablish = async () => {
    try {
      var config = {
        method: 'post',
        url: 'Estabelecimento/returnDono',
        data: {
          IdUsuario: user.IdUsuario,
        },
      };
      callApi(config)
        .then(function (response) {
          if (response.status == 200) {
            // console.log(response.data.query);
            setEstab(response.data.query[0]);
          }
        })
        .catch(function (error) {
          //Alert.alert('', 'Erro');
        });
    } catch (err) {
      console.log('[ERROR]', err);
    }
  };
  const GetProdution = async () => {
    try {
      var config = {
        method: 'post',
        url: 'Funcionario/relatorio',
        data: {
          IdUsuario: user.IdUsuario,
          IdFuncionario: estab.IdUsuario,
          DataInicital: dataInitial,
          DataFinal: dataFinal,
        },
      };

      callApi(config)
        .then(function (response) {
          if (response.status == 200) {
            // console.log(response.data.query);
            setProduto.valor(response.data.query[0]);
            setProduto.quantidade(response.data.query[1]);
          }
        })
        .catch(function (error) {
          //Alert.alert('', 'Erro');
        });
    } catch (err) {
      console.log('[ERROR]', err);
    }
  };
  const userGet = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userInfo');
      const params = JSON.parse(jsonValue);
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    setLoading(false);
    //     getUserId()
  }, []);
  useEffect(() => {
    if (user) GetEstablish();
  }, [user]);
  useEffect(() => {
    userGet();
  }, []);
  console.log(user);
  useEffect(() => {
    GetProdution();
    //     getUserId()
  }, [dataInitial, dataFinal]);

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
          <ScrollView style={{flex: 1}}>
            <View style={style.container}>
              <Text style={style.title}>Estatisticas</Text>
              <PieChart
                widthAndHeight={250}
                series={valueGraphic}
                sliceColor={colorGraphic}
                //coverRadius={0.70}
              />
              <View style={{height: 30}} />
              <Text style={styles.title}>Selecione o Período</Text>
              <View
                style={{
                  marginTop: 10,
                  width: '100%',
                  justifyContent: 'space-around',
                  flexDirection: 'row',
                  alignItems: 'center',
                  minHeight: 20,
                  minWidth: 100,
                }}>
                <Text style={{fontSize: 20}}>Data inicial</Text>
                <SelectList
                  style={{minWidth: 100}}
                  setSelected={setDataInitial}
                  data={data}
                  save="value"
                  search={false}
                  dropdownTextStyles={{color: '#181818'}}
                  disabledTextStyles={{color: '#DCDCDC'}}
                  placeholder="Selecione "
                  fontFamily="Quicksand-Medium"
                  boxStyles={{backgroundColor: '#141414'}}
                  inputStyles={{color: '#fff'}}
                  arrowicon={
                    <Entypo
                      name="chevron-small-down"
                      color={'#fff'}
                      size={20}
                    />
                  }
                />
              </View>
              <View
                style={{
                  marginTop: 10,
                  width: '100%',
                  justifyContent: 'space-around',
                  flexDirection: 'row',
                  alignItems: 'center',
                  minHeight: 20,
                  minWidth: 100,
                }}>
                <Text style={{fontSize: 20}}>Data Final</Text>
                <SelectList
                  style={{minWidth: 100}}
                  setSelected={setDataFinal}
                  data={data}
                  save="value"
                  search={false}
                  dropdownTextStyles={{color: '#181818'}}
                  disabledTextStyles={{color: '#DCDCDC'}}
                  placeholder="Selecione "
                  fontFamily="Quicksand-Medium"
                  boxStyles={{backgroundColor: '#141414'}}
                  inputStyles={{color: '#fff'}}
                  arrowicon={
                    <Entypo
                      name="chevron-small-down"
                      color={'#fff'}
                      size={20}
                    />
                  }
                />
              </View>
              <View style={{height: 90}} />
              <View
                style={{
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  flexDirection: 'row',
                  height: 100,
                  width: '100%',
                  display: 'flex',
                }}>
                <View>
                  <Text>Valor</Text>
                  <Text>Produzido</Text>
                  <PieChart
                    widthAndHeight={30}
                    series={[1]}
                    sliceColor={['#2eb830']}
                    coverFill={'#FFF'}
                  />
                  <Text>{value}</Text>
                </View>
                <View>
                  <Text>Quantidade</Text>
                  <Text>Serviço</Text>
                  <PieChart
                    widthAndHeight={30}
                    series={[1]}
                    sliceColor={['#0066ff']}
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
