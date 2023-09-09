import React, { useState, useEffect } from "react";
import { Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import callApi from '../../server/api'

//Screens
import Geral from "./components/geral";
import Horario from "./components/horario";
import Profissionais from "./components/profissionais";

import styles from "./styles";

const Establishment = () => {
    const [option, setOption] = useState('Geral')
    const [user, setUser] = useState('')
    const [estab, setEstab] = useState(null)

    const [optionsSelect, setOptionsSelect] = useState([
        { name: 'Geral' },
        { name: 'Horarios' },
        { name: 'Profissionais' },
        { name: 'Cadastro' },
        { name: 'Redes' },
        { name: 'Consumiveis' },
        { name: 'Comodidades' }
    ])

    const userGet = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('userInfo')
            const params = JSON.parse(jsonValue)
            console.log(params)
            setUser(params)
        } catch (e) {
            // error reading value
        }
    }

    const GetEstablish = async () => {
        try {
            var config = {
                method: 'post',
                url: 'Estabelecimento/returnDono',
                data: {
                    IdUsuario: user.IdUsuario
                }
            };
            callApi(config)
                .then(function (response) {
                    if (response.status == 200) {
                        setEstab(response.data.query[0])
                    }
                })
                .catch(function (error) {
                    Alert.alert('', 'Erro')
                });
        } catch (err) {
            console.log('[ERROR]', err)
        }
    }

    const optionSelect = ({ opt }) => {
        setOption(opt)
    }

    useEffect(() => {
        if (user.IdUsuario)
            GetEstablish()
    }, [user])

    useEffect(() => {
        userGet()
    }, [])

    return (
        <ScrollView style={styles.container}>
            <ScrollView style={styles.scrollContent} horizontal={true}>
                {optionsSelect.map((result, index) =>
                    <TouchableOpacity onPress={() => { optionSelect({ opt: result.name }) }} style={styles.touchOption} key={index}>
                        <Text style={[styles.textOption, { color: option == result.name ? '#0fcbc2' : '#181818' }]}>{result.name}</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>

            {option == 'Geral' &&
                <Geral establishment={estab} />
            }

            {option == 'Horarios' &&
                <Horario />
            }

            {option == 'Profissionais' &&
                <Profissionais />
            }


        </ScrollView>
    )
}

export default Establishment