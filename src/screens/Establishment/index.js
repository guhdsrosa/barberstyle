import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import callApi from '../../server/api'

import AwesomeAlert from 'react-native-awesome-alerts';
import LinearGradient from "react-native-linear-gradient";

//Screens
import Geral from "./components/geral";
import Horario from "./components/horario";

import styles from "./styles";

const Establishment = () => {
    const [option, setOption] = useState('')
    
    const [optionsSelect, setOptionsSelect] = useState([
        { name: 'Geral' },
        { name: 'Horarios' },
        { name: 'Profissionais' },
        { name: 'Cadastro' },
        { name: 'Redes' },
        { name: 'Consumiveis' },
        { name: 'Comodidades' }
    ])

    const optionSelect = ({ opt }) => {
        setOption(opt)
    }

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
                <Geral />
            }

            {option == 'Horarios' &&
                <Horario />
            }


        </ScrollView>
    )
}

export default Establishment