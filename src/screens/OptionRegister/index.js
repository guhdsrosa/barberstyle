import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import {styles} from './styles'

const OptionRegister = () => {

    const navigation = useNavigation()

    const client = () => {
        navigation.navigate('Register', {
            option: 'client'
        })
    }

    const establishment = () => {
        navigation.navigate('Register', {
            option: 'establishment'
        })
    }

    return(
        <View style={styles.container}>
            <Text style={styles.titleContent}>Por favor{'\n'} selecione sua opção</Text>

            <TouchableOpacity style={styles.button} onPress={client}>
                <Text style={styles.buttonText}>Sou um cliente</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.button} onPress={establishment}>
                <Text style={styles.buttonText}>Sou dono de estabelecimento</Text>
            </TouchableOpacity>
        </View>
    )
}

export default OptionRegister;