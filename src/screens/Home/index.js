import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { styles } from "./styles";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import { Searchbar } from "react-native-paper";

import AntDesign from "react-native-vector-icons/AntDesign";
import Fotos from '../../assets/images/home/index'
import Estab from '../../assets/images/teste/teste.jpg'

import callApi from '../../server/api'

const Home = () => {

    const [teste, setTest] = useState();
    const navigation = useNavigation()

    const perfilPress = () => {
        navigation.navigate('Perfil')
    }

    useEffect(() => {
        testes()
    }, [])

    const testes = async () => {
        try {
            var config = {
                method: 'get',
                url: 'pessoas/2',
            };
            console.log('entro')
            callApi(config)
                .then(function (response) {
                    console.log(response.data)
                    setTest(response.data.Nome)
                })
                .catch(function (error) {
                    console.log(error);
                });
        } catch (err) {
            console.log('[ERROR]', err)
        }
    }

    const lojas = [
        { name: 'Barbearia Alfred', foto: Estab },
        { name: 'Barbearia Lesley', foto: Estab },
        { name: 'Barbearia Joe', foto: Estab },
        { name: 'Barbearia Charles', foto: Estab },
        { name: 'Barbearia Hobert', foto: Estab },
    ]

    return (
        <LinearGradient colors={['#11dbc5', '#56d7c9']} style={styles.container}>
            <ScrollView>
                <View style={styles.menuContent}>
                    <View style={styles.userContent}>
                        <TouchableOpacity onPress={perfilPress}>
                            <Image
                                source={{ uri: 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745' }}
                                style={styles.userLogo}
                                resizeMode={'contain'}
                            />
                        </TouchableOpacity>

                        <View style={styles.userTextContent}>
                            <Text style={styles.userHello}>Olá!{'\n'}<Text style={styles.userName}>{teste ? teste : 'Gustavo'}</Text></Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.filterHeader}>
                        <Image
                            source={Fotos.hamb}
                            resizeMode={'contain'}
                            style={styles.filterLogo}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.header}>
                    <Text style={styles.titleText}>Bem vindo,{'\n'}qual serviço deseja selecionar hoje?</Text>
                </View>

                <Searchbar
                    placeholder="Pesquisar"
                    //onChangeText={onChangeSearch}
                    //value={searchQuery}
                    style={styles.searchbarStyle}
                />

                <View style={styles.body}>
                    <View style={styles.bodyContent}>
                        <Text style={styles.titleText}>Recomendados</Text>
                        <TouchableOpacity style={styles.seeAllContent}>
                            <Text style={[styles.titleText, { fontSize: 15 }]}>Ver mais</Text>
                            <AntDesign name="right" size={15} style={styles.seeAllIcon}/>
                        </TouchableOpacity>
                    </View>

                    <ScrollView horizontal={true}>
                        {lojas.map((result) =>
                            <TouchableOpacity style={styles.touchStore}>
                                <Image
                                    source={result.foto}
                                    style={styles.storeImage}
                                    resizeMode='stretch'
                                />

                                <View style={styles.textContent}>
                                    <Text style={styles.textStore}>{result.name}</Text>
                                    <Text style={styles.descriptionStore}>Alfenas-MG</Text>
                                    <Text>Estrela</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    </ScrollView>
                </View>
            </ScrollView>
        </LinearGradient>
    )
}

export default Home;