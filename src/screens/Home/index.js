import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, StatusBar } from "react-native";
import { styles } from "./styles";
import LinearGradient from "react-native-linear-gradient";

import { Searchbar } from "react-native-paper";

import AntDesign from "react-native-vector-icons/AntDesign";
import Fotos from '../../assets/images/home/index'
import Estab from '../../assets/images/teste/teste.jpg'

import callApi from '../../server/api'

const Home = () => {

    /*
    const [teste, setTest] = useState();

    useEffect(() => {
        testes()
    }, [])

    const testes = async () => {
        try {
            var config = {
                method: 'get',
                url: 'List',
            };
            console.log('entro')
            callApi(config)
                .then(function (response) {
                    setTest(response)
                })
                .catch(function (error) {
                    console.log(error);
                });
        } catch (err) {
            console.log('[ERROR]', err)
        }
    }
    */

    const lojas = [
        { name: 'Barbearia Alfredo Design', foto: Estab }, 
        { name: 'Manicure e Pedicure Creide', foto: Estab }, 
        { name: 'Cabeleleila Leila', foto: Estab },
        { name: 'Cabeleleiro Charles', foto: Estab },
        { name: 'Design Sombrancelha', foto: Estab },
    ]

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.filterHeader}>
                    <Text style={styles.filterText}>Filtro</Text>
                </TouchableOpacity>

                <Text style={styles.titleContent}>ESTABELECIMENTOS</Text>

                <Searchbar
                    placeholder="Pesquisar"
                    //onChangeText={onChangeSearch}
                    //value={searchQuery}
                    style={styles.searchbarStyle}
                />
            </View>

            <ScrollView style={styles.bodyContainer}>
                {lojas.map((result) => 
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
                )}
            </ScrollView>


        </View>
    )
}

export default Home;