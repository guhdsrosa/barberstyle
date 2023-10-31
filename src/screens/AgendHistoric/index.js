import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import callApi from '../../server/api'
import { useNavigation } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import LinearGradient from "react-native-linear-gradient";
import AntDesign from "react-native-vector-icons/AntDesign";

const AgendHistoric = () => {
    const [user, setUser] = useState()
    const [cortes, setCortes] = useState([])
    const navigation = useNavigation()

    const userGet = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('userInfo')
            const params = JSON.parse(jsonValue)
            setUser(params)
        } catch (e) {
            // error reading value
        }
    }

    const userHistoric = () => {
        try {
            var config = {
                method: 'post',
                url: 'Usuario/horariosUsuarioHistory',
                data: {
                    IdUsuario: user.IdUsuario
                }
            };
            callApi(config)
                .then(function (response) {
                    if (response.status === 200) {
                        setCortes(response.data.query)
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
    }, [])

    useEffect(() => {
        if (user?.IdUsuario) {
            userHistoric()
        }
    }, [user])

    // {"DataMarcada": "28/10/2023", "Funcionario": "Guilherme Caliari", "Horario": "1970-01-01T09:45:00.000Z", "Servicos": "Corte Simples ", "Valor": 45}
    console.log(cortes)
    return (
        <LinearGradient colors={['#191919', '#000d0c']} style={styles.container}>

            <ScrollView>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <AntDesign name="left" size={30} color={'#fff'} style={{ marginRight: 3, marginVertical: 1, marginLeft: -1 }} />
                </TouchableOpacity>
                <Text
                    style={{
                        color: '#fff',
                        textAlign: 'center',
                        fontSize: 20,
                        fontFamily: 'Quicksand-SemiBold',
                        marginVertical: 20
                    }}
                >
                    Histórico
                </Text>
                {cortes.map((res, index) => (
                    <View key={index} style={styles.card}>
                        <Text style={styles.text}>{res.Estabelecimento}</Text>
                        <Text style={styles.text}>Barbeiro: {res.Funcionario}</Text>
                        <Text style={styles.text}>Serviços: {res.Servicos}</Text>
                        <Text style={styles.text}>Valor: {res.Valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
                        <Text style={styles.text}>Endereço: {res.Rua} nº {res.NumeroEstabelecimento}, {res.Bairro} - {res.Cidade} {res.Estado}</Text>
                    </View>
                ))}
            </ScrollView>
        </LinearGradient>
    )
}

export default AgendHistoric;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    card: {
        backgroundColor: '#ffffff1f',
        marginHorizontal: 15,
        marginVertical: 10,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10
    },

    text: {
        fontSize: 16,
        color: '#fff',
        marginVertical: 1
    },

    backButton: {
        position: 'absolute',
        margin: 14,
        zIndex: 1,
        backgroundColor: '#141414',
        borderRadius: 200,
    },
})