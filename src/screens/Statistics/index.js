import React, { useEffect, useState } from 'react';
import { SelectList } from 'react-native-dropdown-select-list';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, ScrollView, View, Text, ActivityIndicator, TextInput, Modal, TouchableOpacity } from 'react-native';

import { styles } from './styles';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import LoadingGif from '../../assets/images/loading/loading.gif';
import Entypo from 'react-native-vector-icons/Entypo';

import callApi from '../../server/api';

const Statistics = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);
  const [estab, setEstab] = useState(null);
  const [dataInitial, setDataInitial] = useState(null);
  const [produto, setProduto] = useState(null);
  const [servicos, setServicos] = useState(null);
  const [produtoManual, setProdutoManual] = useState(null);
  const [servicosManual, setServicosManual] = useState(null);
  const data = [
    { key: 'Hoje', value: 'Hoje' },
    { key: '1', value: '1 dia atrás' },
    { key: '5', value: '5 dias atrás' },
    { key: '15', value: '15 dias atrás' },
    { key: '20', value: '20 dias atrás' },
    { key: 'Mês', value: 'Mês inteiro' },
  ];

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
  };

  const GetProdution = async () => {
    setProduto(null);
    setServicos(null);
    const currentDate = new Date();
    const dataIni = new Date(currentDate);
    const dataFin = new Date(currentDate);

    if (dataInitial === 'Hoje') {
      dataIni.setDate(dataIni.getDate());
    }
    if (dataInitial === '1') {
      dataIni.setDate(dataIni.getDate() - 1);
    }
    if (dataInitial === '5') {
      dataIni.setDate(dataIni.getDate() - 5);
    }
    if (dataInitial === '15') {
      dataIni.setDate(dataIni.getDate() - 15);
    }
    if (dataInitial === '20') {
      dataIni.setDate(dataIni.getDate() - 20);
    }
    if (dataInitial === 'Mês') {
      dataIni.setDate(1);
    }

    const formattedDataInicial = dataIni.toISOString().split('T')[0];
    const formattedDataFinal = dataFin.toISOString().split('T')[0];

    if (estab.IdEstabelecimento) {
      try {
        var config = {
          method: 'post',
          url: 'Funcionario/relatorio',
          data: {
            IdUsuario: user.IdUsuario,
            IdEstabelecimento: estab.IdEstabelecimento,
            DataInicial: formattedDataInicial,
            DataFinal: formattedDataFinal,
          },
        };
        callApi(config)
          .then(function (response) {
            if (response.status == 200) {
              setServicos(response.data.query[0].QTDServico)
              setProduto(response.data.query[0].ValorTotal);
            }
          })
          .catch(function (error) {
            console.log('[ERROR]', error);
          });
      } catch (err) {
        console.log('[ERROR]', err);
      }

      try {
        var config = {
          method: 'get',
          url: '/ServicoManual/relatorio',
          params: {
            IdUsuario: user.IdUsuario,
            IdEstabelecimento: estab.IdEstabelecimento,
            DataInicial: formattedDataInicial,
            DataFinal: formattedDataFinal,
          },
        };
        callApi(config)
          .then(function (response) {
            if (response.status == 200) {
              console.log(response.data.dados[0])
              var res = response.data.dados[0]
              setServicosManual(res[0]?.QTDServico)
              setProdutoManual(res[0]?.ValorTotal);
            }
          })
          .catch(function (error) {
            console.log('[ERROR]', error);
          });
      } catch (err) {
        console.log('[ERROR]', err);
      }
    }
  };

  const userGet = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userInfo');
      const params = JSON.parse(jsonValue);
      setUser(params)
    } catch (e) {
      console.log(e)
    }
  };

  useEffect(() => {
    if (user)
      GetEstablish();
  }, [user]);

  useEffect(() => {
    userGet();
  }, []);

  useEffect(() => {
    GetProdution();
  }, [dataInitial]);

  return (
    <LinearGradient colors={['#191919', '#000d0c']} style={styles.container}>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size={30} color={'#36cbc5'} />
        </View>
      )}
      {!loading && (
        <>
          <ScrollView>
            <View style={style.container}>
              <Text style={[style.title, { fontSize: 20 }]}>Estatisticas</Text>

              <Text style={style.title}>Selecione o Período</Text>
              <View style={style.dateContent}>
                <SelectList
                  setSelected={setDataInitial}
                  data={data}
                  save="key"
                  search={false}
                  dropdownTextStyles={{ color: '#fff' }}
                  disabledTextStyles={{ color: '#DCDCDC' }}
                  placeholder="Selecione "
                  fontFamily="Quicksand-Medium"
                  boxStyles={{ backgroundColor: 'transparent' }}
                  inputStyles={{ color: '#fff' }}
                  arrowicon={
                    <Entypo
                      name="chevron-small-down"
                      color={'#fff'}
                      size={20}
                    />
                  }
                />
              </View>

              <View style={style.valores}>
                {servicos != 0 && (
                  <View>
                    <Text style={[style.valorReceb, { fontWeight: 'bold', fontSize: 20, marginTop: 20, textAlign: 'center' }]}>Serviços aplicativo:</Text>
                    <Text style={[style.valorReceb, { fontSize: 16, marginTop: 20, textAlign: 'center' }]}>Quantidade de serviços</Text>
                    <Text style={[style.valorReceb, { fontSize: 20, marginTop: 5, textAlign: 'center' }]}>{servicos}</Text>
                  </View>
                )}
                {produto != null && (
                  <View>
                    <Text style={[style.valorReceb, { fontSize: 16, marginTop: 15, textAlign: 'center' }]}>Total ganho no dia</Text>
                    <Text style={[style.valorReceb, { fontSize: 20, marginTop: 5, textAlign: 'center' }]}>{produto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
                  </View>
                )}
              </View>

              <View style={style.valores}>
                {servicosManual && (
                  <View>
                    <Text style={[style.valorReceb, { fontWeight: 'bold', fontSize: 22, marginTop: 20, textAlign: 'center' }]}>Serviços manuais:</Text>
                    <Text style={[style.valorReceb, { fontSize: 16, marginTop: 20, textAlign: 'center' }]}>Quantidade de serviços</Text>
                    <Text style={[style.valorReceb, { fontSize: 20, marginTop: 5, textAlign: 'center' }]}>{servicosManual}</Text>
                  </View>
                )}
                {produtoManual && (
                  <View>
                    <Text style={[style.valorReceb, { fontSize: 16, marginTop: 15, textAlign: 'center' }]}>Total ganho no dia</Text>
                    <Text style={[style.valorReceb, { fontSize: 20, marginTop: 5, textAlign: 'center' }]}>{produtoManual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
        </>
      )}
    </LinearGradient>
  );
};

export default Statistics;

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: '10%'
  },
  title: {
    fontSize: 18,
    margin: 10,
    color: '#fff',
    fontFamily: 'Quicksand-SemiBold'
  },

  dateContent: {
    width: '90%',
    marginTop: 20
  },

  valores: {
    marginVertical: 10
  },

  valorReceb: {
    color: '#fff'
  }
});