import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import callApi from '../../server/api'

import AwesomeAlert from 'react-native-awesome-alerts';
import LinearGradient from "react-native-linear-gradient";

import styles from "./style";

const Perfil = () => {

    const navigation = useNavigation()

    const [typeUser, setTypeUser] = useState('estabelecimento')
    const [user, setUser] = useState({})
    const [userName, setUserName] = useState('')
    const [step, setStep] = useState(1)
    const [showAlert, setShowAlert] = useState({
        show: false,
        title: '',
        message: '',
        errorButtom: '',
        successButtom: '',
        showCancelButton: false,
        showConfirmButton: false,
        cancelText: '',
        confirmText: '',
        option: null
    })

    const logout = () => {
        setShowAlert({
            ...showAlert,
            show: true,
            title: 'Aviso',
            message: `Você realmente quer deslogar da sua conta?`,
            errorButtom: '',
            successButtom: '',
            showCancelButton: true,
            showConfirmButton: true,
            cancelText: 'Sair',
            confirmText: 'Mudei de ideia',
            option: 'logout'
        })
    }

    const userGet = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('userInfo')
            const params = JSON.parse(jsonValue)
            setUserName(params.Nome)
            setUser(params)
        } catch (e) {
            // error reading value
        }
    }

    const updateUser = async () => {
        try {
            var config = {
                method: 'post',
                url: 'Usuario/Update',
                data: {
                    IdUsuario: user.IdUsuario,
                    Nome: user.Nome,
                    Email: user.Email,
                    Senha: user.Senha,
                    Foto: user.Foto,
                    Telefone: user.Telefone
                }
            };
            callApi(config)
                .then(function (response) {
                    if (response.status == 200) {
                        setShowAlert({
                            ...showAlert,
                            show: true,
                            title: 'Sucesso',
                            message: `${response.data.sucesso}`,
                            errorButtom: '',
                            successButtom: '',
                            showCancelButton: false,
                            showConfirmButton: true,
                            cancelText: '',
                            confirmText: 'Vlw!',
                            option: false
                        })
                        AsyncStorage.setItem('userInfo', JSON.stringify(user));
                    }
                })
                .catch(function (error) {
                    console.log('[error]', error)
                    setShowAlert({
                        ...showAlert,
                        show: true,
                        title: 'Ops!',
                        message: `Ocorreu algum erro inesperado ao salvar seus dados`,
                        errorButtom: '',
                        successButtom: '',
                        showCancelButton: true,
                        showConfirmButton: false,
                        cancelText: 'Tentar novamente',
                        confirmText: '',
                        option: false
                    })
                });
        } catch (err) {
            console.log('[error]', err)
        }
    }

    const resetAlert = async ({ option }) => {

        if (option == 'logout') {
            try {
                await AsyncStorage.clear();
            } catch (err) {
                console.log(err)
            }

            navigation.navigate('Login')
        }

        setShowAlert({
            ...showAlert,
            show: false,
            title: '',
            message: '',
            errorButtom: '',
            successButtom: '',
            showCancelButton: false,
            showConfirmButton: false,
            cancelText: '',
            confirmText: '',
            option: false
        })
    }

    useEffect(() => {
        userGet()
    }, [])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setStep(1)
            setTypeUser(user.TipoUsuario)
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
                    source={user.Foto ? user.Foto : { uri: 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745' }}
                    style={styles.userLogo}
                    resizeMode={'contain'}
                />

                <View style={styles.body}>
                    <Text style={styles.titleName}>{userName}</Text>

                    <TextInput
                        style={styles.inputText}
                        placeholder={'Nome'}
                        value={user.Nome}
                        onChangeText={text => setUser({ ...user, Nome: text })}
                    />
                    <TextInput
                        style={styles.inputText}
                        placeholder={'Email'}
                        value={user.Email}
                        onChangeText={text => setUser({ ...user, Email: text })}
                    />
                    <TextInput
                        style={styles.inputText}
                        placeholder={'Senha'}
                        value={user.Senha}
                        onChangeText={text => setUser({ ...user, Senha: text })}
                        secureTextEntry={true}
                    />
                    <TextInput
                        style={styles.inputText}
                        placeholder={'Telefone1'}
                        value={user.Telefone}
                        onChangeText={text => setUser({ ...user, Telefone: text })}
                    />
                    {/*<TextInput
                                style={styles.inputText}
                                placeholder={'Telefone2'}
                                value={user.Telefone2}
                            />*/}


                    <TouchableOpacity style={styles.saveButton} onPress={updateUser}>
                        <Text style={styles.saveButtonText}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <AwesomeAlert
                show={showAlert.show}
                showProgress={false}
                title={`${showAlert.title}`}
                message={`${showAlert.message}`}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={showAlert.showCancelButton}
                showConfirmButton={showAlert.showConfirmButton}
                cancelText={`${showAlert.cancelText}`}
                confirmText={`${showAlert.confirmText}`}
                confirmButtonColor="#52cb5f"
                cancelButtonColor="#DD6B55"
                onCancelPressed={() => {
                    resetAlert({ option: showAlert.option })
                }}
                onConfirmPressed={() =>
                    resetAlert({ option: null })
                }
            />

        </LinearGradient>
    )
}

export default Perfil;