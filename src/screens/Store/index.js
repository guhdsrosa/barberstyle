import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import callApi from '../../server/api'
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from "./styles";
import AntDesign from "react-native-vector-icons/AntDesign";

//components
import Services from "./components/services";
import Endereco from "./components/endereco";
import Sobre from "./components/sobre";

const Store = ({ route }) => {

    const navigation = useNavigation();
    const [option, setOption] = useState('services')
    const [services, setServices] = useState(null)
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(false)
    const [selectService, setSelectService] = useState([])
    const [price, setPrice] = useState(null)
    const { data } = route.params

    const optionSelect = ({ option }) => {
        setOption(option)
    }

    const reservationPress = () => {
        navigation.navigate('Schedule', {
            selectService: selectService,
            IdUsuario: user.params.IdUsuario,
            IdEstabelecimento: data.IdEstabelecimento,
            idCliente: user.userClient.IdCliente
        })
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

    const selectServicePress = async (id, name, preco) => {
        if (selectService.includes(`${id}`)) {
            const novoArray = selectService.filter((num) => num !== `${id}`);
            setSelectService(novoArray);
            setPrice(price - preco)
        } else {
            setSelectService([...selectService, `${id}`]);
            setPrice(price + preco)
        }
    }

    const userGet = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('userInfo')
            const jsonValueCliente = await AsyncStorage.getItem('userClient')
            const params = JSON.parse(jsonValue)
            const paramsClient = JSON.parse(jsonValueCliente)
            setUser({ params: params, userClient: paramsClient })
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        userGet()
    }, [])

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
                    source={{ uri: 'https://img.freepik.com/fotos-premium/espaco-masculino-interior-de-barbearia-moderna-gerado-por-ia_866663-5580.jpg' }}
                    //source={{ uri: data?.FotoEstabelecimento }}
                    style={styles.storePhoto}
                    resizeMode='cover'
                    blurRadius={0}
                />}
                {data && <Text style={styles.storeName}>{data?.NomeEstabelecimento}</Text>}
            </View>

            <View style={styles.body}>
                <View style={styles.options}>
                    <TouchableOpacity onPress={() => optionSelect({ option: 'services' })}>
                        <Text style={[styles.optionsText, {color: option === 'services' ?  '#12dbc5' : '#181818'}]}>Serviços</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => optionSelect({ option: 'address' })}>
                        <Text style={[styles.optionsText, {color: option === 'address' ?  '#12dbc5' : '#181818'}]}>Endereço</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => optionSelect({ option: 'more' })}>
                        <Text style={[styles.optionsText, {color: option === 'more' ?  '#12dbc5' : '#181818'}]}>Sobre</Text>
                    </TouchableOpacity>
                </View>

                {loading && option == 'services' && <Services data={services} select={selectServicePress} selectService={selectService} />}
                {option == 'address' && <Endereco data={data} />}
                {option == 'more' && <Sobre data={data} />}
            </View>

            <View style={styles.bottomConfirm}>
                <TouchableOpacity style={styles.confirmButton} onPress={() => reservationPress()}>
                    <Text style={styles.textButton}>Reservar Horário</Text>
                </TouchableOpacity>
                <Text style={styles.textPrice}>Total: R${price ? price : `00`}</Text>
            </View>
        </ScrollView>
    )
}

export default Store