import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Alert } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from "./style";

//component
import PerfilStab from "./components/PerfilEstab";

const Perfil = () => {

    const navigation = useNavigation()

    const [typeUser, setTypeUser] = useState('estabelecimento')
    const [user, setUser] = useState({})
    const [step, setStep] = useState(1)

    const screens = ({ type }) => {
        console.log('type: ', type)
        if (type == 'estab') {
            setStep(step + 1)
            setTypeUser(false)
        }

        if (type == 'back') {
            setStep(step - 1)
            setTypeUser('estabelecimento') //Recebe o tipo de usuario dele
        }
    }

    const logout = () => {
        Alert.alert('Aviso', 'Você realmente quer deslogar da sua conta?', [
            {
                text: 'Mudei de ideia'
            },
            {
                text: 'Sair',
                onPress: () => navigation.navigate('Login')
            }
        ])
    }

    const userGet = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('userInfo')
            const params = JSON.parse(jsonValue)
            console.log(params.login)
            setUser(params.login)
        } catch (e) {
            // error reading value
        }
    }

    useEffect(() => {
        userGet()
    }, [])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setStep(1)
            setTypeUser('estabelecimento') //Recebe o tipo de usuario dele
        });

        return unsubscribe;
    }, [navigation])

    return (
        <LinearGradient style={styles.container} colors={styles.headerColor}>
            <ScrollView>
                <Text style={styles.titleText}>Perfil</Text>

                <TouchableOpacity style={styles.exitButton} onPress={logout}>
                    <Text style={styles.exitButtonText}>Sair</Text>
                </TouchableOpacity>

                <Image
                    source={{ uri: 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745' }}
                    style={styles.userLogo}
                    resizeMode={'contain'}
                />

                <View style={styles.body}>
                    <Text style={styles.titleName}>{user.Nome}</Text>

                    {step == 1 &&
                        <>
                            <TextInput
                                style={styles.inputText}
                                placeholder={'Nome'}
                                value={user.Nome}
                            />
                            <TextInput
                                style={styles.inputText}
                                placeholder={'Email'}
                                value={user.Email}
                            />
                            <TextInput
                                style={styles.inputText}
                                placeholder={'Senha'}
                                value={user.Senha}
                            />
                            <TextInput
                                style={styles.inputText}
                                placeholder={'Telefone1'}
                                value={user.Telefone1}
                            />
                            <TextInput
                                style={styles.inputText}
                                placeholder={'Telefone2'}
                                value={user.Telefone2}
                            />
                        </>
                    }

                    {step == 2 &&
                        <PerfilStab />
                    }


                    {user.TipoUsuario == 'estabelecimento' &&
                        <TouchableOpacity onPress={() => screens({ type: 'estab' })} style={styles.saveButton}>
                            <Text style={styles.saveButtonText}>Editar Estabelecimento</Text>
                        </TouchableOpacity>
                    }

                    <TouchableOpacity style={styles.saveButton}>
                        <Text style={styles.saveButtonText}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </LinearGradient>
    )
}

export default Perfil;