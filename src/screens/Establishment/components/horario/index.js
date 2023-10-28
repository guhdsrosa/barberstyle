import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import callApi from '../../../../server/api'

import DateTimePickerModal from "react-native-modal-datetime-picker";

const Horario = (props) => {
    const [user, setUser] = useState({})
    const [funcionarioId, setFuncionarioId] = useState({})
    const [loading, setLoading] = useState(false)
    const [horaMessage, setHoraMessage] = useState('')
    const [abertura, setAbertura] = useState({
        visible: false,
        hora: ''
    });
    const [fechamento, setFechamento] = useState({
        visible: false,
        hora: ''
    });
    const [hrEstimada, setHrEstimada] = useState({
        visible: false,
        hora: ''
    });

    const userGet = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('userInfo')
            const params = JSON.parse(jsonValue)
            setUser(params)
        } catch (e) {
            console.log(e)
        }
    }

    const handleConfirm = (date, option) => {

        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const formattedTime = `${hours}:${minutes}`;

        if (option === 'abertura') {
            setAbertura({
                visible: false,
                hora: formattedTime
            })
        }

        if (option === 'fechamento') {
            setFechamento({
                visible: false,
                hora: formattedTime
            })
        }

        if (option === 'hrestimada') {
            setHrEstimada({
                visible: false,
                hora: formattedTime
            })
        }

        console.log("A date has been picked: ", formattedTime, option);
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
                    IdFuncionario: funcionarioId
                }
            };
            callApi(config)
                .then(function (response) {
                    if (response.status == 200) {
                        setEstab(response.data.query[0])
                    }
                })
                .catch(function (error) {
                    console.log('Erro')
                });
        } catch (err) {
            console.log('[ERROR]', err)
        }
    }

    const getIdFuncionario = () => {
        try {
            var config = {
                method: 'post',
                url: 'Funcionario/findById',
                data: {
                    IdUsuario: user.IdUsuario
                }
            };
            callApi(config)
                .then(function (response) {
                    if (response.status == 200) {
                        setFuncionarioId(response.data.query.IdFuncionario)
                    }
                })
                .catch(function (error) {
                    
                });
        } catch (err) {
            console.log('[ERROR]', err)
        }
    }

    const getExistHour = () => {
        try {
            var config = {
                method: 'post',
                url: 'Horario/existeHorario',
                data: {
                    IdEstabelecimento: props.establishment.IdEstabelecimento,
                    IdFuncionario: funcionarioId
                }
            };
            callApi(config)
                .then(function (response) {
                    if (response.status == 200) {
                        if(response.data.query[0].Existe == 1) {
                            setHoraMessage('Você já possui um horario cadastrado')
                        } else {
                            setLoading(true)
                        }
                    }
                })
                .catch(function (error) {
                    console.log('Erro')
                });
        } catch (err) {
            console.log('[ERROR]', err)
        }
    }

    useEffect(() => {
        userGet()
    }, [])

    useEffect(() => {
        getIdFuncionario()
    }, [user])

    useEffect(() => {
        if (funcionarioId){
            getExistHour()
        }
    },[funcionarioId])

    return (
        <View style={styles.hourContainer}>
            <View style={styles.weekTouch}>
                {loading && (
                    <>
                        <Text style={styles.weekText}>Insira o horário de funcionamento</Text>

                        <Text style={styles.textOption}>Qual horário você abre o seu estabelecimento?</Text>
                        <View style={styles.ButtonHour} >
                            <Button title="Horário de abertura" onPress={() => setAbertura({ visible: true })} color={'#04bbb3'} />
                        </View>
                        <DateTimePickerModal
                            isVisible={abertura.visible}
                            mode="time"
                            onConfirm={(date) => handleConfirm(date, 'abertura')}
                            onCancel={() => setAbertura({ visible: false, hora: '' })}
                            is24Hour
                        />

                        <Text style={styles.textOption}>Qual horário você fecha o seu estabelecimento?</Text>
                        <View style={styles.ButtonHour} >
                            <Button title="Horário de fechamento" onPress={() => setFechamento({ visible: true })} color={'#04bbb3'} />
                        </View>
                        <DateTimePickerModal
                            isVisible={fechamento.visible}
                            mode="time"
                            onConfirm={(date) => handleConfirm(date, 'fechamento')}
                            onCancel={() => setFechamento({ visible: false, hora: '' })}
                            is24Hour
                        />

                        <Text style={styles.textOption}>Qual o tempo estimado que você demora para o corte?</Text>
                        <View style={styles.ButtonHour} >
                            <Button title="Horário estimado" onPress={() => setHrEstimada({ visible: true })} color={'#04bbb3'} />
                        </View>
                        <DateTimePickerModal
                            isVisible={hrEstimada.visible}
                            mode="time"
                            onConfirm={(date) => handleConfirm(date, 'hrestimada')}
                            onCancel={() => setHrEstimada({ visible: false, hora: '' })}
                            is24Hour
                        />
                    </>
                )}

                {horaMessage != '' && <Text style={styles.textOption}>{horaMessage}</Text>}

            </View>

            {abertura.hora && fechamento.hora && hrEstimada.hora && <View style={styles.ButtonHour} >
                <Button title="Confirmar Horário" onPress={() => insertHour()} color={'#04bbb3'} />
                <Text style={[styles.textOption, { marginVertical: 3 }]}>Hora abertura: {abertura.hora}</Text>
                <Text style={[styles.textOption, { marginVertical: 3 }]}>Hora fechamento: {fechamento.hora}</Text>
                <Text style={[styles.textOption, { marginVertical: 3 }]}>Tempo estimado de corte: {hrEstimada.hora}</Text>
            </View>}
        </View>
    )
}

export default Horario;

const styles = StyleSheet.create({
    textOption: {
        fontSize: 15,
        color: '#141414',
        fontFamily: 'Quicksand-SemiBold',
        textAlign: 'center',
        paddingHorizontal: 30
    },

    hourContainer: {
        marginVertical: 8
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
        paddingVertical: 30,
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
        marginVertical: 10,
        marginBottom: 30
    }
})