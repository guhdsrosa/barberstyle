import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";

import {styles} from './styles'

const OptionRegister = () => {

    const navigation = useNavigation()

    const client = () => {
        navigation.navigate('Register', {
            option: 'Cliente'
        })
    }

    const func = () => {
        navigation.navigate('Register', {
            option: 'Funcionario'
        })
    }

    const establishment = () => {
        navigation.navigate('Register', {
            option: 'Dono'
        })
    }

    return(
        <LinearGradient colors={['#131313', '#131313']} style={styles.container}>
            <Text style={styles.titleContent}>Por favor{'\n'} selecione sua opção</Text>

            <TouchableOpacity style={styles.button} onPress={client}>
                <Text style={styles.buttonText}>Sou cliente</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={func}>
                <Text style={styles.buttonText}>Sou funcionario</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.button} onPress={establishment}>
                <Text style={styles.buttonText}>Sou dono de estabelecimento</Text>
            </TouchableOpacity>
        </LinearGradient>
    )
}

export default OptionRegister;