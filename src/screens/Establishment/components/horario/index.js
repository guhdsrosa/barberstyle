import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  ScrollView,
  RefreshControl,
  Modal
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import callApi from '../../../../server/api';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { TextInput } from 'react-native-paper';

const Horario = props => {
  const [user, setUser] = useState({});
  const [horarios, setHorarios] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [funcionarioId, setFuncionarioId] = useState(null);
  const [showInsertH, setShowInsertH] = useState(false);
  const [modal, setModal] = useState({
    active: false,
    horario: '',
    item: {}
  });
  const [abertura, setAbertura] = useState({
    visible: false,
    hora: '',
  });
  const [fechamento, setFechamento] = useState({
    visible: false,
    hora: '',
  });
  const [hrEstimada, setHrEstimada] = useState({
    visible: false,
    hora: '',
  });

  const userGet = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userInfo');
      const params = JSON.parse(jsonValue);
      setUser(params);
    } catch (e) {
      console.log(e);
    }
  };

  const handleConfirm = (date, option) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;

    if (option === 'abertura') {
      setAbertura({
        visible: false,
        hora: formattedTime,
      });
    }

    if (option === 'fechamento') {
      setFechamento({
        visible: false,
        hora: formattedTime,
      });
    }

    if (option === 'hrestimada') {
      setHrEstimada({
        visible: false,
        hora: formattedTime,
      });
    }

    hideDatePicker();
  };

  const insertHour = () => {
    try {
      var config = {
        method: 'post',
        url: 'Horario/Create',
        data: {
          duracao: hrEstimada.hora,
          HorarioAbertura: abertura.hora,
          HorarioTermino: fechamento.hora,
          IdEstabelecimento: props.establishment.IdEstabelecimento,
          IdFuncionario: funcionarioId,
        },
      };
      callApi(config)
        .then(function (response) {
          if (response.status == 200) {
            console.log(response.data)
            getExistHour()
          }
        })
        .catch(function (error) {
          console.log('Erro', error);
        });
    } catch (err) {
      console.log('[ERROR]', err);
    }
  };

  const getHour = () => {
    try {
      var config = {
        method: 'post',
        url: 'Horarios/findAllFuncionario',
        data: {
          IdEstabelecimento: props.establishment.IdEstabelecimento,
          IdFuncionario: funcionarioId,
        },
      };
      callApi(config)
        .then(function (response) {
          if (response.status == 200) {
            setHorarios(response.data.horarios[0])
          }
        })
        .catch(function (error) {
          console.log('Erro', error);
        });
    } catch (err) {
      console.log('[ERROR]', err);
    }
  };

  const getIdFuncionario = () => {
    if (user.IdUsuario) {
      try {
        var config = {
          method: 'post',
          url: 'Funcionario/findById',
          data: {
            IdUsuario: user.IdUsuario,
          },
        };
        callApi(config)
          .then(function (response) {
            if (response.status == 200) {
              setFuncionarioId(response.data.query.IdFuncionario);
            }
          })
          .catch(function (error) {
            console.log('[Error]', error)
          });
      } catch (err) {
        console.log('[ERROR]', err);
      }
    }
  };

  const getExistHour = () => {
    if (funcionarioId) {
      try {
        var config = {
          method: 'post',
          url: 'Horario/existeHorario',
          data: {
            IdEstabelecimento: props.establishment.IdEstabelecimento,
            IdFuncionario: funcionarioId,
          },
        };
        callApi(config)
          .then(function (response) {
            if (response.status == 200) {
              //0 n tem horario faz cad.
              //1 tem
              setShowInsertH(response.data.msg)

              if (response.data.msg !== 0) {
                getHour()
              }
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } catch (err) {
        console.log('[ERROR]', err);
      }
    }
  };

  const handleRefresh = () => {
    getExistHour()
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const alterarHorario = (item) => {
    console.log(item)
    setModal({
      active: true,
      horario: '',
      item: item
    })
  }

  const setaHorario = () => {
    try {
      var config = {
        method: 'post',
        url: 'Horarios/updateManual',
        data: {
          IdEstabelecimento: props.establishment.IdEstabelecimento,
          IdFuncionario: funcionarioId,
          IdHorario: '',
          Horario: ''
        },
      };
      callApi(config)
        .then(function (response) {
          if (response.status == 200) {
            //0 n tem horario faz cad.
            //1 tem
            setShowInsertH(response.data.msg)

            if (response.data.msg !== 0) {
              getHour()
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (err) {
      console.log('[ERROR]', err);
    }
  }

  useEffect(() => {
    userGet();
  }, []);

  useEffect(() => {
    getIdFuncionario();
  }, [user]);

  useEffect(() => {
    getExistHour();
  }, [funcionarioId]);

  return (
    <ScrollView style={styles.hourContainer} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
      <View style={styles.weekTouch}>
        {showInsertH === 0 && (
          <>
            <Text style={styles.weekText}>
              Insira o horário de funcionamento
            </Text>

            <Text style={styles.textOption}>
              Qual horário você abre o seu estabelecimento?
            </Text>
            <View style={styles.ButtonHour}>
              <Button
                title="Horário de abertura"
                onPress={() => setAbertura({ visible: true })}
                color={'#04bbb3'}
              />
            </View>
            <DateTimePickerModal
              isVisible={abertura.visible}
              mode="time"
              onConfirm={date => handleConfirm(date, 'abertura')}
              onCancel={() => setAbertura({ visible: false, hora: '' })}
              is24Hour
            />

            <Text style={styles.textOption}>
              Qual horário você fecha o seu estabelecimento?
            </Text>
            <View style={styles.ButtonHour}>
              <Button
                title="Horário de fechamento"
                onPress={() => setFechamento({ visible: true })}
                color={'#04bbb3'}
              />
            </View>
            <DateTimePickerModal
              isVisible={fechamento.visible}
              mode="time"
              onConfirm={date => handleConfirm(date, 'fechamento')}
              onCancel={() => setFechamento({ visible: false, hora: '' })}
              is24Hour
            />

            <Text style={styles.textOption}>
              Qual o tempo estimado que você demora para o corte?
            </Text>
            <View style={styles.ButtonHour}>
              <Button
                title="Horário estimado"
                onPress={() => setHrEstimada({ visible: true })}
                color={'#04bbb3'}
              />
            </View>
            <DateTimePickerModal
              isVisible={hrEstimada.visible}
              mode="time"
              onConfirm={date => handleConfirm(date, 'hrestimada')}
              onCancel={() => setHrEstimada({ visible: false, hora: '' })}
              is24Hour
            />
          </>
        )}
      </View>

      {showInsertH === 0 && (
        <View style={styles.ButtonHour}>
          {abertura.hora && <Text style={[styles.textOption, { marginBottom: 3 }]}>
            Hora abertura: {abertura.hora}
          </Text>}
          {fechamento.hora && <Text style={[styles.textOption, { marginBottom: 3 }]}>
            Hora fechamento: {fechamento.hora}
          </Text>}
          {hrEstimada.hora && <Text style={[styles.textOption, { marginBottom: 10 }]}>
            Tempo estimado de corte: {hrEstimada.hora}
          </Text>}

          {abertura.hora && fechamento.hora && hrEstimada.hora &&
            <Button
              title="Confirmar Horário"
              onPress={() => insertHour()}
              color={'#141414'}
            />
          }
        </View>
      )}

      {showInsertH != 0 && (
        <>
          <Text style={styles.attButton}>Altere um horário</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
            {horarios && horarios.map((res) => (
              <TouchableOpacity onPress={() => alterarHorario(res)} style={{ marginHorizontal: 10, marginVertical: 5 }}>
                <Text style={{ color: "#fff", backgroundColor: "#141414", paddingHorizontal: 17, paddingVertical: 7, borderRadius: 10 }}>{res.Horarios.slice(0, 5)}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )
      }


      <Modal animationType="fade" transparent={true} visible={modal.active}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0000009f' }}>
          <View style={{ backgroundColor: '#fff', paddingHorizontal: 15, paddingVertical: 15, borderRadius: 10 }}>
            <Text>Altere o horário</Text>

            <TextInput
              value={modal.horario}
            />

            <TouchableOpacity>
              <Text>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModal({ active: false, horario: '', item: {} })}>
              <Text>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Horario;

const styles = StyleSheet.create({
  textOption: {
    fontSize: 15,
    color: '#141414',
    fontFamily: 'Quicksand-SemiBold',
    textAlign: 'center',
    paddingHorizontal: 30,
    marginBottom: 10
  },

  hourContainer: {
    marginVertical: 8,
  },

  weekTouch: {
    marginVertical: 10,
    marginHorizontal: 0,
    borderRadius: 20,
  },

  weekText: {
    fontSize: 19,
    color: '#141414',
    fontFamily: 'Quicksand-SemiBold',
    textAlign: 'center',
    paddingBottom: 30,
  },

  inputStyle: {
    fontFamily: 'Quicksand-SemiBold',
    color: '#141414',
    backgroundColor: '#f6f6f6',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    marginVertical: 5,
    marginHorizontal: 50,
    paddingHorizontal: 10,
  },

  ButtonHour: {
    paddingHorizontal: 30,
    marginVertical: 0,
    marginBottom: 30,
  },

  attButton: {
    textAlign: 'center',
    color: "#141414",
    paddingVertical: 10,
    fontWeight: 'bold',
    fontSize: 17
  }
});
