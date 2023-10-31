import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, Modal, RefreshControl, Linking } from "react-native";
import { styles } from "./styles";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import callApi from '../../server/api'
import FastImage from "react-native-fast-image";

import { Searchbar } from "react-native-paper";
import { enableLatestRenderer } from 'react-native-maps';

import AntDesign from "react-native-vector-icons/AntDesign";
import googleMaps from '../../assets/images/icons/Google-Maps-Logo.png'
import Fotos from '../../assets/images/home/index'
import { encode } from 'base-64';

const Home = ({ route }) => {
    const navigation = useNavigation()
    const [refreshing, setRefreshing] = useState(false);
    const [user, setUser] = useState({});
    const [Senha, setSenha] = useState({});
    const [fototeste, setFototeste] = useState({})
    const [foto, setFoto] = useState(false)
    const [hrAgendada, setHrAgendada] = useState(false);
    const [top5Establishment, setTop5Establishment] = useState([])
    const [modal, setModal] = useState({
        ativo: false,
        item: false
    })

    const perfilPress = () => {
        navigation.navigate('Perfil')
    }

    const userGet = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('userInfo')
            const jsonValueSenha = await AsyncStorage.getItem('userSenha')
            const params = JSON.parse(jsonValue)
            const senha = JSON.parse(jsonValueSenha)
            const imageSource = { uri: params.Foto };

            setUser(params)
            setSenha(senha)
            setFototeste(imageSource.uri)
        } catch (e) {
            console.log('[userGet error]', e)
        }
    }

    const getRecomendedEstablishment = async () => {
        setTop5Establishment([])
        try {
            var config = {
                method: 'get',
                url: 'Estabelecimento/top5',
            };
            callApi(config)
                .then(function (response) {
                    if (response.status === 200) {
                        setTop5Establishment(response.data.query[0])
                    }
                })
                .catch(function (error) {
                    console.log('[error]', error)
                });
        } catch (err) {
            console.log('[error]', err)
        }
    }

    const getHorariosAgendado = async () => {
        setHrAgendada(false)
        try {
            var config = {
                method: 'post',
                url: 'Usuario/horariosUsuarioDay',
                data: {
                    IdUsuario: user.IdUsuario
                }
            };
            callApi(config)
                .then(function (response) {
                    if (response.status === 200) {
                        setHrAgendada(response.data.query)
                    } else {
                        setHrAgendada(false)
                    }
                })
                .catch(function (error) {
                    console.log('[error]', error)
                });
        } catch (err) {
            console.log('[error]', err)
        }
    }

    const onRefresh = () => {
        getHorariosAgendado()
        getRecomendedEstablishment()
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    const moreAgendaPress = (item) => {
        setModal({
            ativo: true,
            item: item
        })
    }

    const openGoogleMaps = (endereco) => {
        const formattedAddress = encodeURIComponent(endereco);
        const url = `https://www.google.com/maps/search/?api=1&query=${formattedAddress}`;

        Linking.openURL(url).catch(err =>
            console.error('Erro ao abrir o Google Maps:', err)
        );
    };

    useEffect(() => {
        userGet()
        getRecomendedEstablishment()
    }, [])

    useEffect(() => {
        if (user.IdUsuario) {
            getHorariosAgendado()
        }
    }, [user])

    return (
        <LinearGradient colors={['#191919', '#000d0c']} style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View style={styles.menuContent}>
                    <View style={styles.userContent}>
                        <TouchableOpacity onPress={perfilPress}>
                            <FastImage
                                source={{ uri: foto ? foto : user.Foto }}
                                style={styles.userLogo}
                                resizeMode="cover"
                            />
                        </TouchableOpacity>

                        <View style={styles.userTextContent}>
                            <Text style={styles.userHello}>Olá!{'\n'}<Text style={styles.userName}>{user.Nome ? user.Nome.split(" ")[0] : null}</Text></Text>
                        </View>
                    </View>
                </View>

                <View style={styles.header}>
                    <Text style={styles.titleText}>Bem vindo,{'\n'}qual serviço deseja procurar hoje?</Text>
                </View>

                <Searchbar
                    placeholder="Pesquisar"
                    style={styles.searchbarStyle}
                    elevation={0}
                    iconColor={'#131313'}
                />

                <View style={styles.body}>
                    {hrAgendada.length > 0 && (
                        <>
                            <View style={styles.bodyContent}>
                                <Text style={styles.titleText}>Horários Agendados</Text>
                                <TouchableOpacity style={styles.seeAllContent} onPress={() => navigation.navigate('AgendHistoric')}>
                                    <Text style={[styles.titleText, { fontSize: 15 }]}>Ver histórico</Text>
                                    <AntDesign name="right" size={15} style={styles.seeAllIcon} color={'#fff'} />
                                </TouchableOpacity>
                            </View>

                            <View>
                                {hrAgendada.map((res) => (
                                    <View style={stylesCard.container}>
                                        <View>
                                            <Text style={{ color: "#fff" }}>{res.Estabelecimento}</Text>
                                            <Text style={{ color: "#fff" }}>Data marcada: {res.DataMarcada}</Text>
                                            <Text style={{ color: "#fff" }}>Horário: {res.Horario.slice(11, 16)}</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => moreAgendaPress(res)}>
                                            <Text style={{ color: "#fff" }}>Mais detalhes</Text>
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
                        </>
                    )}

                    <View style={styles.bodyContent}>
                        <Text style={styles.titleText}>Estabelecimentos</Text>
                        <TouchableOpacity style={styles.seeAllContent} onPress={() => navigation.navigate('Explore')}>
                            <Text style={[styles.titleText, { fontSize: 15 }]}>Ver mais</Text>
                            <AntDesign name="right" size={15} style={styles.seeAllIcon} color={'#fff'} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {top5Establishment.map((result, index) =>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Store', { data: result })}
                                style={styles.touchStore}
                                key={index}
                            >
                                <FastImage
                                    source={{ uri: result.FotoEstabelecimento != 'null' ? result.FotoEstabelecimento : 'https://th.bing.com/th/id/OIG.AobPibWwR9MDnbKZ.TtQ?pid=ImgGn' }}
                                    style={styles.storeImage}
                                    resizeMode="cover"
                                />

                                <View style={styles.textContent}>
                                    <Text style={styles.textStore}>{result.NomeEstabelecimento}</Text>
                                    <Text style={styles.descriptionStore}>{result.Cidade}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    </ScrollView>
                </View>

                <Modal animationType="fade" transparent={true} visible={modal.ativo} >
                    <View style={stylesModal.container}>
                        <View style={stylesModal.content}>
                            <Text style={stylesModal.title}>Detalhes do agendamento</Text>
                            <View style={{ marginVertical: 10 }}>
                                <Text style={stylesModal.text}>{modal.item?.Estabelecimento}</Text>
                                <Text style={stylesModal.text}>Funcionario: {modal.item?.Funcionario}</Text>
                                <Text style={stylesModal.text}>Horario: {modal.item?.Horario?.slice(11, 16)}</Text>
                                <Text style={stylesModal.text}>Data: {modal.item?.DataMarcada}</Text>
                                <Text style={stylesModal.text}>Valor: {modal.item?.Valor}</Text>
                                <Text style={stylesModal.text}>Serviços: {modal.item?.Servicos}</Text>
                            </View>

                            <Text style={[stylesModal.text, { textAlign: 'center' }]}>Localização</Text>
                            <TouchableOpacity
                                onPress={() => openGoogleMaps(`${modal.item?.Rua}, ${modal.item?.NumeroEstabelecimento} - ${modal.item?.Bairro}, ${modal.item?.Cidade} - ${modal.item?.Estado} `)}
                                style={stylesModal.googleContainer}
                            >
                                <Image
                                    style={stylesModal.googleImage}
                                    source={googleMaps}
                                    resizeMode="cover"
                                />
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Text style={stylesModal.buttom}>Mudei de ideia quero cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setModal({ ativo: false, item: false })}>
                                <Text style={[stylesModal.buttom, { marginTop: 10, backgroundColor: '#000' }]}>Fechar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </LinearGradient>
    )
}

export default Home;

const stylesCard = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: "#ffffff1f",
        marginHorizontal: 10,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginBottom: 20
    }
})

const stylesModal = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0000009f'
    },

    content: {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 10
    },

    title: {
        color: "#000",
        fontSize: 16
    },

    text: {
        color: "#000"
    },

    googleContainer: {
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 10,
        borderColor: '#0000007f',
        marginBottom: 10
    },

    googleImage: {
        width: '45%',
        height: 35,
        alignSelf: 'center'
    },

    buttom: {
        color: "#fff",
        textAlign: "center",
        backgroundColor: "#970000",
        paddingVertical: 10,
        borderRadius: 10
    }
})