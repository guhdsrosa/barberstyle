import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Checkbox } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import { styles } from './styles'
import Ionicons from "react-native-vector-icons/Ionicons";

const Register = ({route}) => {

    const navigation = useNavigation()
    const [checked, setChecked] = useState(false);
    const [button, setButton] = useState(null)
    const {option} = route.params
    
    useEffect(() => {
        if (option == 'client'){
            return setButton('Cadastrar')
        }

        if (option == 'establishment'){
            return setButton('Proximo')
        }
    }, [option])

    const optionClose = () => {
        navigation.navigate('Login')
    }

    return (
        <View style={styles.container}>
            <View style={styles.menuContent}>
                <TouchableOpacity onPress={optionClose}>
                    <Ionicons name="close" size={20}  color={'#BDBDBD'} />
                </TouchableOpacity>

                <Text style={styles.menuTitle}>Registrar-se</Text>

                <TouchableOpacity>
                    <Text style={styles.loginTitle}></Text>
                </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputText}
                    placeholder={'Nome Completo'}
                    value={''}
                    placeholderTextColor={'#BDBDBD'}
                />

                <TextInput
                    style={styles.inputText}
                    placeholder={'E-mail'}
                    value={''}
                    placeholderTextColor={'#BDBDBD'}
                />

                <TextInput
                    style={styles.inputText}
                    placeholder={'Senha'}
                    value={''}
                    placeholderTextColor={'#BDBDBD'}
                />

                <TextInput
                    style={styles.inputText}
                    placeholder={'Confirme a senha'}
                    value={''}
                    placeholderTextColor={'#BDBDBD'}
                />
            </View>

            <View style={styles.servicesConfirm}>
                <Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setChecked(!checked);
                    }}
                    color={'#12dbc5'}
                />
                <Text style={styles.checkText}>Você aceita as<Text style={styles.checkTextServices}> politicas e serviços </Text>do aplicativo</Text>
            </View>

            <TouchableOpacity style={styles.buttonConfirm}>
                <Text style={styles.buttonConfirmText}>{button}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Register;