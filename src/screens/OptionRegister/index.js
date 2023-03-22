import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";

import {styles} from './styles'

const OptionRegister = () => {

    const navigation = useNavigation()

    const client = () => {
        navigation.navigate('Register', {
            option: 'comum'
        })
    }

    const establishment = () => {
        navigation.navigate('Register', {
            option: 'estabelecimento'
        })
    }

    return(
        <LinearGradient colors={['#09080a', '#021f1c']} style={styles.container}>
            <Text style={styles.titleContent}>Por favor{'\n'} selecione sua opção</Text>

            <TouchableOpacity style={styles.button} onPress={client}>
                <Text style={styles.buttonText}>Sou um cliente</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.button} onPress={establishment}>
                <Text style={styles.buttonText}>Sou dono de estabelecimento</Text>
            </TouchableOpacity>
        </LinearGradient>
    )
}

export default OptionRegister;