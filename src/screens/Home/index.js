import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { styles } from "./styles";
import LinearGradient from "react-native-linear-gradient";

import { Searchbar } from "react-native-paper";

import AntDesign from "react-native-vector-icons/AntDesign";
import Fotos from '../../assets/images/home/index'
import Estab from '../../assets/images/teste/teste.jpg'

import callApi from '../../server/api'

const Home = () => {

    const [teste, setTest] = useState();

    useEffect(() => {
        testes()
    }, [])

    const testes = async () => {
        try {
            var config = {
                method: 'get',
                url: 'pessoas/4',
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
        { name: 'Barbearia Alfredo Design', foto: Estab },
        { name: 'Manicure e Pedicure Creide', foto: Estab },
        { name: 'Cabeleleila Leila', foto: Estab },
        { name: 'Cabeleleiro Charles', foto: Estab },
        { name: 'Design Sombrancelha', foto: Estab },
    ]

    return (
        <LinearGradient colors={['#11dbc5', '#ddf9f7']} style={styles.container}>
            <ScrollView>
                <View style={styles.menuContent}>
                    <View style={styles.userContent}>
                        <Image
                            source={{ uri: 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745' }}
                            style={styles.userLogo}
                            resizeMode={'contain'}
                        />

                        <View style={styles.userTextContent}>
                            <Text>Olá!{'\n'}<Text>{teste ? teste : 'Gustavo'}</Text></Text>
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
                    <Text style={styles.titleContent}>Bem vindo,{'\n'}qual serviço deseja selecionar hoje?</Text>
                </View>
                <Searchbar
                    placeholder="Pesquisar"
                    //onChangeText={onChangeSearch}
                    //value={searchQuery}
                    style={styles.searchbarStyle}
                />
                {/*lojas.map((result) =>
                    <TouchableOpacity style={styles.touchStore}>
                        <Image
                            source={result.foto}
                            style={styles.storeImage}
                            resizeMode='stretch'
                        />

                        <View style={styles.textContent}>
                            <Text style={styles.textStore}>{result.name}</Text>
                            <Text style={styles.descriptionStore}>Excepteur fgsadw fhsud ea ut aliqua duis...</Text>
                            <Text style={styles.descriptionStore}>Alfenas-MG</Text>
                        </View>
                    </TouchableOpacity>
    )*/}
            </ScrollView>
        </LinearGradient>
    )
}

export default Home;