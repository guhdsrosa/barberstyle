import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import callApi from '../../server/api'

import styles from "./styles";
import AntDesign from "react-native-vector-icons/AntDesign";

//components
import Services from "./components/services";
import Endereco from "./components/endereco";
import Sobre from "./components/sobre";
import CalendarModal from "./components/calendar";

const Store = ({ route }) => {

    const navigation = useNavigation();
    const [option, setOption] = useState('services')
    const [services, setServices] = useState(null)
    const [loading, setLoading] = useState(false)
    const [selectService, setSelectService] = useState([])
    const { data } = route.params

    const optionSelect = ({ option }) => {
        setOption(option)
    }

    const reservationPress = () => {
        setOption('reservation')
    }

    const serviceEstab = async () => {
        try {
            var config = {
                method: 'post',
                url: 'Servico/findServicoEstab',
                data: {
                    IdEstabelecimento: data.IdEstabelecimento
                }
            };
            callApi(config)
                .then(function (response) {
                    if (response.status == 200) {
                        setServices(response.data)
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

    const selectServicePress = async (id, name) => {
        //console.log(id, name)
        setSelectService(arr => [...arr, `${id}`])
    }
    console.log('selectService', selectService)

    useEffect(() => {
        if (data)
            serviceEstab()
    }, [data])

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <AntDesign name="left" size={30} color={'#fff'} style={{ marginRight: 3, marginVertical: 1, marginLeft: -1 }} />
                </TouchableOpacity>

                {data && <Image
                    source={{ uri: data?.FotoEstabelecimento }}
                    style={styles.storePhoto}
                    resizeMode='cover'
                    blurRadius={0}
                />}
                {data && <Text style={styles.storeName}>{data?.NomeEstabelecimento}</Text>}
            </View>

            {option === 'reservation' ?
                <CalendarModal />
                :
                <View style={styles.body}>
                    <View style={styles.options}>
                        <TouchableOpacity onPress={() => optionSelect({ option: 'services' })}>
                            <Text style={styles.optionsText}>Serviços</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => optionSelect({ option: 'address' })}>
                            <Text style={styles.optionsText}>Endereço</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => optionSelect({ option: 'more' })}>
                            <Text style={styles.optionsText}>Sobre</Text>
                        </TouchableOpacity>
                    </View>

                    {loading && option == 'services' && <Services data={services} select={selectServicePress} />}
                    {option == 'address' && <Endereco />}
                    {option == 'more' && <Sobre />}
                </View>
            }

            <View style={styles.bottomConfirm}>
                <TouchableOpacity style={styles.confirmButton} onPress={() => reservationPress()}>
                    <Text style={styles.textButton}>Reservar Horário</Text>
                </TouchableOpacity>
                <Text style={styles.textPrice}>Total: R$0,00</Text>
            </View>
        </ScrollView>
    )
}

export default Store