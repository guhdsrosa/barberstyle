import React, { useState, useEffect, cloneElement } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator, RefreshControl, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import callApi from '../../server/api'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AwesomeAlert from "react-native-awesome-alerts";

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
    const [refreshing, setRefreshing] = useState(false);
    const [user, setUser] = useState(false)
    const [alert, setAlert] = useState(false)
    const [selectService, setSelectService] = useState([])
    const [consumiveis, setConsumiveis] = useState([])
    const [comodidades, setComodidades] = useState([])
    const [photoView, setPhotoView] = useState({ active: false, image: '' })
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
        setServices(null)
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
                    console.log('[errors]', error)
                    setAlert(true)
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

    const consumiveisEstab = () => {
        setConsumiveis(null)
        try {
            var config = {
                method: 'post',
                url: '/Consumiveis/findAll',
                data: {
                    IdEstabelecimento: data.IdEstabelecimento
                }
            };
            callApi(config)
                .then(function (response) {
                    if (response.status == 200) {
                        setConsumiveis(response.data.find)
                    }
                })
                .catch(function (error) {
                    console.log('[errors]', error)
                })
        } catch (err) {
            console.log('[ERROR]', err)
        }
    }

    const comodidadesEstab = () => {
        setComodidades(null)
        try {
            var config = {
                method: 'post',
                url: '/Comodidades/findAll',
                data: {
                    IdEstabelecimento: data.IdEstabelecimento
                }
            };
            callApi(config)
                .then(function (response) {
                    if (response.status == 200) {
                        setComodidades(response.data.find)
                    }
                })
                .catch(function (error) {
                    console.log('[errors]', error)
                })
        } catch (err) {
            console.log('[ERROR]', err)
        }
    }

    const onRefresh = () => {
        setLoading(false)
        consumiveisEstab()
        comodidadesEstab()
        serviceEstab()

        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    useEffect(() => {
        userGet()
        comodidadesEstab()
        consumiveisEstab()
    }, [])

    useEffect(() => {
        if (data)
            serviceEstab()
    }, [data])

    return (
        <View style={styles.container}>
            {services ? (
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <AntDesign name="left" size={30} color={'#fff'} style={{ marginRight: 3, marginVertical: 1, marginLeft: -1 }} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setPhotoView({ active: true, image: data.FotoEstabelecimento != null ? data.FotoEstabelecimento : 'https://th.bing.com/th/id/OIG.AobPibWwR9MDnbKZ.TtQ?pid=ImgGn' })}>
                            {data && <Image
                                source={{ uri: data.FotoEstabelecimento != null ? data.FotoEstabelecimento : 'https://th.bing.com/th/id/OIG.AobPibWwR9MDnbKZ.TtQ?pid=ImgGn' }}
                                style={styles.storePhoto}
                                resizeMode='cover'
                                blurRadius={0}
                            />}
                        </TouchableOpacity>
                        {data && <Text style={styles.storeName}>{data?.NomeEstabelecimento}</Text>}
                    </View>

                    <View style={styles.body}>
                        <View style={styles.options}>
                            <TouchableOpacity onPress={() => optionSelect({ option: 'services' })}>
                                <Text style={[styles.optionsText, { color: option === 'services' ? '#12dbc5' : '#181818' }]}>Serviços</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => optionSelect({ option: 'address' })}>
                                <Text style={[styles.optionsText, { color: option === 'address' ? '#12dbc5' : '#181818' }]}>Endereço</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => optionSelect({ option: 'more' })}>
                                <Text style={[styles.optionsText, { color: option === 'more' ? '#12dbc5' : '#181818' }]}>Sobre</Text>
                            </TouchableOpacity>
                        </View>

                        {loading && option == 'services' &&
                            <Services
                                data={services}
                                select={selectServicePress}
                                selectService={selectService}
                                consumiveis={consumiveis}
                                comodidades={comodidades}
                            />
                        }
                        {option == 'address' && <Endereco data={data} />}
                        {option == 'more' && <Sobre data={data} />}
                    </View>

                    <View style={styles.bottomConfirm}>
                        <TouchableOpacity style={styles.confirmButton} onPress={() => reservationPress()}>
                            <Text style={styles.textButton}>Reservar Horário</Text>
                        </TouchableOpacity>
                        <Text style={styles.textPrice}>Total: {price ? price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 'R$ 0,00'}</Text>
                    </View>
                </ScrollView>
            ) : (
                <View>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <AntDesign name="left" size={30} color={'#fff'} style={{ marginRight: 3, marginVertical: 1, marginLeft: -1 }} />
                        </TouchableOpacity>

                        {data && <Image
                            source={{ uri: 'https://th.bing.com/th/id/OIG.AobPibWwR9MDnbKZ.TtQ?pid=ImgGn' }}
                            //source={{ uri: data?.FotoEstabelecimento }}
                            style={styles.storePhoto}
                            resizeMode='cover'
                            blurRadius={0}
                        />}
                        {data && <Text style={styles.storeName}>{data?.NomeEstabelecimento}</Text>}
                    </View>
                    <ActivityIndicator size={50} color={'#181818'} style={{ marginTop: 20 }} />
                    <Text style={[styles.textButton, { color: '#181818' }]}>Carregando...</Text>
                </View>
            )}

            <AwesomeAlert
                show={alert}
                title={`Ops!`}
                message={`Parece que aconteceu um erro ao carregar o estabelecimento :(`}
                showConfirmButton={true}
                confirmText={`Voltar ao inicío`}
                confirmButtonColor="#52cb5f"
                onConfirmPressed={() =>
                    navigation.goBack()
                }
            />

            <Modal animationType="fade" transparent={true} visible={photoView.active}>
                <TouchableOpacity
                    onPress={() => setPhotoView({ active: false, image: '' })}
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000cf' }}
                >
                    <Image
                        source={{ uri: photoView.image }}
                        style={{
                            width: 350,
                            height: '100%'
                        }}
                        resizeMode='contain'
                        blurRadius={0}
                    />
                </TouchableOpacity>
            </Modal>
        </View>
    )
}

export default Store