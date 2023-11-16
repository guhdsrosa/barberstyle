import React, { useState, useEffect } from 'react';
import { Text, ScrollView, TouchableOpacity, Alert, Modal, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInputMask } from 'react-native-masked-text';
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
  const [addservico, setAddServico] = useState({
    active: false,
    nome: "",
    preco: "",
    data: ''
  });

  const [optionsSelect, setOptionsSelect] = useState([
    { name: 'Agenda' },
    { name: 'Horarios' },
  ]);

  const userGet = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userInfo');
      const params = JSON.parse(jsonValue);
      setUser(params);

      if (params.TipoUsuario === 'Dono') {
        setOptionsSelect([
          { name: 'Agenda' },
          { name: 'Estabelecimento' },
          { name: 'Horarios' },
          { name: 'Profissionais' }
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

  const optionSelect = ({ opt }) => {
    setOption(opt);
  };

  const AddServico = async () => {
    let valor = addservico.preco
    valor = valor.replace("R$", "")
    valor = valor.replace(",", ".")

    let dataString = addservico.data;
    let data = new Date(dataString.split("/").reverse().join("-"));

    try {
      var config = {
        method: 'post',
        url: 'ServicoManual/create',
        data: {
          Servico: addservico.nome,
          Valor: valor,
          Data: data,
          IdUsuario: user.IdUsuario,
          IdEstabelecimento: estab.IdEstabelecimento
        },
      };
      callApi(config)
        .then(function (response) {
          if (response.status == 200) {
            setAddServico({
              active: false,
              nome: "",
              preco: "",
              data: ''
            })
            Alert.alert('Sucesso', `${response.data.msg}`)
          }
        })
        .catch(function (error) {
          Alert.alert('', 'Erro');
        });
    } catch (err) {
      console.log('[ERROR]', err);
    }
  };

  useEffect(() => {
    if (user)
      GetEstablish();
  }, [user]);

  useEffect(() => {
    userGet();
  }, []);

  return (
    <>
      <ScrollView style={styles.container}>
        {estab && 
          <ScrollView style={styles.scrollContent} horizontal={true}>
            {optionsSelect.map((result, index) => (
              <TouchableOpacity
                onPress={() => {
                  optionSelect({ opt: result.name });
                }}
                style={styles.touchOption}
                key={index}>
                <Text
                  style={[
                    styles.textOption,
                    { color: option == result.name ? '#0fcbc2' : '#fff' },
                  ]}>
                  {result.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        }

        {option == 'Agenda' && <ScheduleDaily item={[user]} />}

        {option == 'Estabelecimento' && <Geral establishment={estab} />}

        {option == 'Horarios' && <Horario establishment={estab} />}

        {option == 'Profissionais' && <Profissionais establishment={estab} />}
      </ScrollView>

      <TouchableOpacity style={{
        position: 'absolute',
        marginVertical: 10,
        marginHorizontal: 10,
        bottom: 0,
        right: 0
      }}
        onPress={() => setAddServico({ active: true, nome: null, preco: null, data: null })}
      >
        <Text style={{
          backgroundColor: '#181818',
          color: '#fff',
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderRadius: 10
        }}>Adicionar um corte</Text>
      </TouchableOpacity>

      <Modal animationType="fade" transparent={true} visible={addservico.active}>
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#181818af'
        }}>
          <View style={{ backgroundColor: "#fff", width: '90%', borderRadius: 10, paddingHorizontal: 20, paddingVertical: 20 }}>
            <Text style={{ color: '#181818', marginBottom: 10 }}>Nome do serviço</Text>
            <TextInput
              value={addservico.nome}
              placeholder='Ex: Corte Simples'
              onChangeText={(value) => setAddServico(prevState => ({ ...prevState, nome: value }))}
              style={{ borderWidth: 0.5, borderRadius: 10, backgroundColor: '#f2f2f2', paddingHorizontal: 10 }}
            />

            <Text style={{ color: '#181818', marginBottom: 10, marginTop: 10 }}>Preço do serviço</Text>
            <TextInputMask
              type={'money'}
              value={addservico.preco}
              placeholder='Ex: R$ 25,50'
              onChangeText={(value) => setAddServico(prevState => ({ ...prevState, preco: value }))}
              style={{ borderWidth: 0.5, borderRadius: 10, backgroundColor: '#f2f2f2', paddingHorizontal: 10 }}
            />

            <Text style={{ color: '#181818', marginBottom: 10, marginTop: 10 }}>Data</Text>
            <TextInputMask
              type={'datetime'}
              options={{
                format: 'DD/MM/YYYY'
              }}
              placeholder='Ex: DD/MM/AAAA'
              value={addservico.data}
              onChangeText={(value) => setAddServico(prevState => ({ ...prevState, data: value }))}
              style={{ borderWidth: 0.5, borderRadius: 10, backgroundColor: '#f2f2f2', paddingHorizontal: 10 }}
            />

            <TouchableOpacity onPress={() => AddServico()}>
              <Text style={{ color: '#fff', paddingVertical: 15, marginTop: 20, textAlign: 'center', backgroundColor: "#181818", borderRadius: 10 }}>Adicionar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setAddServico({ active: false, nome: null, preco: null })}>
              <Text style={{ color: '#fff', paddingVertical: 15, marginTop: 20, textAlign: 'center', backgroundColor: "#181818", borderRadius: 10 }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Establishment;
