import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, Alert } from "react-native";
import { styles } from "./styles";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import callApi from '../../server/api'
import FastImage from "react-native-fast-image";

import { Searchbar } from "react-native-paper";

import AntDesign from "react-native-vector-icons/AntDesign";
import Fotos from '../../assets/images/home/index'
import { encode } from 'base-64';

const Home = ({ route }) => {


    const navigation = useNavigation()
    const [user, setUser] = useState({});
    const [Senha, setSenha] = useState({});
    const [fototeste, setFototeste] = useState({})
    // const [foto, setFoto] = useState(false)
    const [foto, setFoto] = useState(false)
    const [top5Establishment, setTop5Establishment] = useState([])

    const perfilPress = () => {
        console.log("Antes de ir para o perfil: ", user)
        navigation.navigate('Perfil')
    }

    const lojas = [
        { name: 'Barbearia Alfred Richard Vas VAS', foto: 'https://graces.com.br/wp-content/uploads/2019/02/o-que-nao-pode-faltar-na-sua-barbearia-equipamentos.jpg' },
        { name: 'Barbearia Lesley', foto: 'https://i0.wp.com/blog.iluminim.com.br/wp-content/uploads/2021/01/capa-post-iluminacao-para-barbearia-scaled.jpg' },
        { name: 'Barbearia Joe', foto: 'https://graces.com.br/wp-content/uploads/2019/02/o-que-nao-pode-faltar-na-sua-barbearia-equipamentos.jpg' },
        { name: 'Barbearia Charles', foto: 'https://i0.wp.com/blog.iluminim.com.br/wp-content/uploads/2021/01/capa-post-iluminacao-para-barbearia-scaled.jpg' },
        { name: 'Barbearia Hobert', foto: 'https://graces.com.br/wp-content/uploads/2019/02/o-que-nao-pode-faltar-na-sua-barbearia-equipamentos.jpg' },
    ]

    const userGet = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('userInfo')
            const jsonValueSenha = await AsyncStorage.getItem('userSenha')
            const params = JSON.parse(jsonValue)
            const senha = JSON.parse(jsonValueSenha)
            const imageSource = {uri: params.Foto};

            setUser(params)
            setSenha(senha)
            setFototeste(imageSource.uri)
        } catch (e) {
            console.log('[userGet error]', e)
        }
    }
console.log(user)
    const getRecomendedEstablishment = async () => {
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

    useEffect(() => {
        userGet()
        getRecomendedEstablishment()
    }, [])

    return (
        <LinearGradient colors={['#191919', '#000d0c']} style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
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
                    <View style={styles.bodyContent}>
                        <Text style={styles.titleText}>Recomendados</Text>
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
                                    source={{ uri: `https://imagens-revista.vivadecora.com.br/uploads/2020/11/A-lumin%C3%A1ria-trilho-traz-uma-nova-perspectiva-par-aa-decora%C3%A7%C3%A3o-de-barbearia.-Fonte-Pinterest.jpg` }}
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

                {/* <View style={[styles.body, { paddingBottom: 20 }]}>
                    <View style={styles.bodyContent}>
                        <Text style={styles.titleText}>Talvez você gostaria</Text>
                    </View>

                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {lojas.map((result, index) =>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Store', {
                                    foto: `${result.foto}`,
                                    name: `${result.name}`
                                })}
                                style={styles.touchStore}
                                key={index}
                            >
                                <FastImage
                                    source={{ uri: `${result.foto}` }}
                                    style={styles.storeImage}
                                    resizeMode='cover'
                                />

                                <View style={styles.textContent}>
                                    <Text style={styles.textStore}>{result.name}</Text>
                                    <Text style={styles.descriptionStore}>Alfenas-MG</Text>
                                </View>
                                <View style={styles.starContent}>
                                    <AntDesign name="star" size={15} style={styles.seeAllIcon} color={'#ffc500'} />
                                    <Text style={styles.descriptionStore}>5.5</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    </ScrollView>
                </View> */}
            </ScrollView>
        </LinearGradient>
    )
}

export default Home;