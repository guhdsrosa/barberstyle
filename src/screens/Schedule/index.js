import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator, Alert } from "react-native";
import CalendarModal from "./components/calendar";
import { useNavigation } from "@react-navigation/native";
import callApi from '../../server/api'
import { SelectList } from 'react-native-dropdown-select-list'
import Entypo from "react-native-vector-icons/Entypo";
import AwesomeAlert from "react-native-awesome-alerts";

import AntDesign from "react-native-vector-icons/AntDesign";
import styles from "./styles";

const Schedule = ({ route }) => {
    const { selectService, IdUsuario, IdEstabelecimento, idCliente } = route?.params
    const navigation = useNavigation()
    const [selectBarber, setSelectBarber] = useState(null)
    const [barber, setBarber] = useState(null)
    const [loading, setLoading] = useState(false)
    const [selected, setSelected] = useState('');
    const [horario, setHorario] = useState('');
    const [dataHour, setDataHour] = useState([]);
    const [showAlert, setShowAlert] = useState({
        alert: false,
        text: ''
    });

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
                        //console.log(response.data)
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

    const getHours = async () => {
        const regex = /(\d{2}:\d{2})/;
        try {
            var config = {
                method: 'post',
                url: 'Horario/disponivel',
                data: {
                    IdEstabelecimento: IdEstabelecimento,
                    IdFuncionario: selectBarber,
                    DataFront: selected
                }
            };
            callApi(config)
                .then(function (response) {
                    if (response.status == 200) {
                        const novoArray = response.data.horario[0].map(item => {
                            return {
                                ...item,
                                disabled: item.disabled,
                                value: regex.exec(item.value)[1]
                            };
                        });
                        setDataHour(novoArray)
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
        //'idServiço:', selectService, 'IdUsuario:', IdUsuario, 'idBarbeiro:', selectBarber, 'IdEstabelecimento:', IdEstabelecimento, 'Data:', selected
        try {
            var config = {
                method: 'post',
                url: '/Agenda/Create',
                data: {
                    IdCliente: idCliente,
                    DataMarcada: selected,
                    HoraMarcada: horario,
                    IdServico: selectService,
                    IdFuncionario: selectBarber,
                    Status: "Ativo",
                    TipoPagamento: "A vista",
                    IdEstabelecimento: IdEstabelecimento
                }
            };

            console.log("Config", config)
            callApi(config)
                .then(function (response) {
                    if (response.status === 200) {
                        setShowAlert({ ...showAlert, alert: true, text: `Seu horário foi marcado para o dia ${response.data.agenda.DataMarcada}, às ${response.data.agenda.HoraMarcada}` })

                        //Alert.alert("Horário Reservado com Sucesso !", `Seu horário foi marcado para o dia ${response.data.agenda.DataMarcada}, às ${response.data.agenda.HoraMarcada}`)
                    }
                })
                .catch(function (error) {
                    Alert.alert("Ocorreu um erro ao reservar seu horário: ", error)
                })
        } catch (err) {
            console.log("Erro na requisição: ", err)
        }
    }

    const selectBarberPress = (item) => {
        //console.log(item.IdFuncionario)
        setSelectBarber(item.IdFuncionario)
    }

    setCalendar = (date) => {
        setSelected(date)
    }

    useEffect(() => {
        if (IdEstabelecimento)
            getBarber()
    }, [IdEstabelecimento])

    useEffect(() => {
        console.log('idServiço:', selectService, 'IdUsuario:', IdUsuario, 'idBarbeiro:', selectBarber, 'IdEstabelecimento:', IdEstabelecimento, 'Data:', selected)
        getHours()
    }, [selected])
    console.log('horario', horario)
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

                        {selected && <View style={{ marginHorizontal: 10 }}>
                            <SelectList
                                setSelected={(val) => setHorario(val)}
                                data={dataHour}
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
                        </View>}
                    </>
                }

                <TouchableOpacity onPress={() => confirmReservation()}>
                    <Text>teste</Text>
                </TouchableOpacity>
            </View>

            <AwesomeAlert
                show={showAlert.alert}
                showProgress={false}
                title={`Horário Reservado com Sucesso !`}
                message={showAlert.text}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showConfirmButton={true}
                confirmText={`Ok ;)`}
                confirmButtonColor="#52cb5f"
                onConfirmPressed={() =>
                    navigation.navigate("Home")
                }
            />
        </ScrollView>
    )
}

export default Schedule;