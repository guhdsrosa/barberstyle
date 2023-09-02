import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator, Alert } from "react-native";
import CalendarModal from "./components/calendar";
import { useNavigation } from "@react-navigation/native";
import callApi from '../../server/api'
import { SelectList } from 'react-native-dropdown-select-list'
import Entypo from "react-native-vector-icons/Entypo";

import AntDesign from "react-native-vector-icons/AntDesign";
import styles from "./styles";

const Schedule = ({ route }) => {
    const { selectService, IdUsuario, IdEstabelecimento } = route?.params
    const navigation = useNavigation()
    const [selectBarber, setSelectBarber] = useState(null)
    const [barber, setBarber] = useState(null)
    const [loading, setLoading] = useState(false)
    const [selected, setSelected] = useState('');
    const [status, setStatus] = useState('');
    const [tipoPagamento, setTipoPagamento] = useState('');
    const [horario, setHorario] = useState('');

    const getBarber = async () => {
        try {
            var config = {
                method: 'post',
                url: 'EstabFunc/funcEstabelecimento',
                data: {
                    IdEstabelecimento: IdEstabelecimento
                }
            };
            callApi(config)
                .then(function (response) {
                    if (response.status == 200) {
                        console.log(response.data)
                        setBarber(response.data.query)
                        setLoading(true)
                    }
                })
                .catch(function (error) {
                    console.log('[error]', error)
                })
        } catch (err) {
            console.log('[ERROR]', err)
        }
    }

    const confirmReservation = async () => {
        try {
            var config = {
                method: 'post',
                url: '/Agenda/Create',
                data: {
                    IdCliente: IdUsuario,
                    DataMarcada: selected,
                    HorarioMarcado: data,
                    IdServico: selectService,
                    IdFuncionario: selectBarber,
                    Status: status,
                    TipoPagamento: tipoPagamento
                    
                }
            };
            console.log("Config", config)
            callApi(config)
                .then(function (response) {
                    if (response.status === 200) {
                        console.log("Horário Reservado com Sucesso !")
                    }
                })
                .catch(function (error) {
                    console.log("Ocorreu um erro ao reservar seu horário: ", error)
                })
        } catch (err) {
            console.log("Erro na requisição: ", err)
        }
    }

    const buttonSalvar = () => {
        confirmReservation();
    }

    const selectBarberPress = (item) => {
        console.log("Id Barbeiro", item.IdFuncionario)
        setSelectBarber(item.IdFuncionario)       

    }

    setCalendar = (date) => {
        console.log("Data", date)
        setSelected(date)
    }

    useEffect(() => {
        if (IdEstabelecimento)
            getBarber()
    }, [IdEstabelecimento])

    const data = [
        { key: '1', value: '9:00 hrs' },
        { key: '2', value: '10:00 hrs' },
        { key: '3', value: '13:00 hrs', disabled: true },
        { key: '4', value: '14:00 hrs', disabled: true },
        { key: '5', value: '15:00 hrs' },
        { key: '6', value: '16:00 hrs' },
        { key: '7', value: '18:00 hrs' },
        { key: '7', value: '19:00 hrs', disabled: true }
    ]



    useEffect(() => {
        console.log('idServiço:', selectService, 'IdUsuario:', IdUsuario, 'IdEstabelecimento:', IdEstabelecimento, 'Data:', selected, 'barbeiro: ', selectBarber)
    }, [selected])

    return (
        <ScrollView>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <AntDesign name="left" size={30} color={'#fff'} style={{ marginRight: 3, marginVertical: 1, marginLeft: -1 }} />
            </TouchableOpacity>
            <View style={{ flex: 1, justifyContent: 'center', marginVertical: 40 }}>
                <Text style={styles.titleText}>Selecione o barbeiro de sua preferencia:</Text>
                {loading ?
                    <View style={styles.container}>
                        <View style={styles.barberContainer}>
                            {barber.map((result, index) => (
                                <TouchableOpacity key={index} onPress={() => selectBarberPress(result)}>
                                    <View style={{ alignItems: 'center' }}>
                                        <Image
                                            source={{ uri: 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745' }}
                                            resizeMode="contain"
                                            style={styles.barberImage}
                                        />
                                        <Text style={styles.barberText}>{String(result.Nome).match(/\S+/)}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                    :
                    <ActivityIndicator
                        size={30}
                        color={'#181818'}
                    />
                }

                {selectBarber &&
                    <>
                        <CalendarModal
                            setCalendar={setCalendar}
                            date={selected}
                        />

                        <View style={{ marginHorizontal: 10 }}>
                            <SelectList
                                setSelected={(val) => console.log("Achei", val)}
                                data={data}
                                save="value"
                                search={false}
                                dropdownTextStyles={{ color: '#181818' }}
                                disabledTextStyles={{ color: '#b3b3b3' }}
                                placeholder="Selecione horário"
                                fontFamily="Quicksand-Medium"
                                boxStyles={{ backgroundColor: '#141414' }}
                                inputStyles={{ color: '#fff' }}
                                arrowicon={<Entypo name="chevron-small-down" color={'#fff'} size={20} />}
                            />
                        </View>
                    </>
                }


            </View>
            <View style={styles.bottomConfirm}>
                <TouchableOpacity style={styles.confirmButton} onPress={() => buttonSalvar()}>
                    <Text style={styles.textButton}>Confirmar Horário</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default Schedule;