import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import callApi from '../../server/api'
import axios from "axios";
import ImagePicker from 'react-native-image-crop-picker';
import fs from 'react-native-fs'

import AwesomeAlert from 'react-native-awesome-alerts';
import LinearGradient from "react-native-linear-gradient";

import styles from "./style";

const Perfil = () => {
    const navigation = useNavigation()

    const [typeUser, setTypeUser] = useState('estabelecimento')
    const [user, setUser] = useState({})
    const [userName, setUserName] = useState('')
    const [Senha, setSenha] = useState('')
    const [step, setStep] = useState(1)
    const [photo, setPhoto] = React.useState(null);
    //const fs = require('fs')
    //https://www.npmjs.com/package/react-native-fs
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

    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = () => {
        setRefreshing(true);

        // Simule o processo de atualização
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

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
            const jsonValueSenha = await AsyncStorage.getItem('userSenha')
            const params = JSON.parse(jsonValue)
            const senha = JSON.parse(jsonValueSenha)

            setUserName(params.Nome)
            setUser(params)
            setSenha(senha)
        } catch (e) {
            // error reading value
        }
    }

    const imagePickerPress = () => {
        const dataFile = new FormData()
        ImagePicker.openPicker({
            //multiple: true
            width: 400,
            height: 400,
            cropping: true,
        }).then(image => {
            setPhoto(image)
            //updateUser()
        });
    }

    const updateUser = async () => {
        const formData = new FormData();

        formData.append('IdUsuario', user.IdUsuario);
        formData.append('Nome', user.Nome);
        formData.append('Email', user.Email);
        formData.append('Senha', Senha);
        formData.append('Telefone', user.Telefone);

        if(photo){
            const regex = /\/([^/]+)\.jpg$/;
            const url = photo.path?.match(regex);
            const nomeImagem = url[0].replace(/^\//, '')
    
            formData.append('File', {
                uri: photo?.path,
                type: 'image/jpeg', // Tipo da imagem (pode variar)
                name: nomeImagem,
            });
        } else {
            formData.append('File', undefined)
        }

        try {
            axios.post('http://18.230.154.41:3000/Usuario/Update', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Importante definir o cabeçalho correto
                },
            })
                .then(function (response) {
                    if (response.status == 200) {
                        setShowAlert({
                            ...showAlert,
                            show: true,
                            title: 'Sucesso',
                            message: `Perfil atualizado com sucesso`,
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
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                    />
                }
            >
                <Text style={styles.titleText}>Perfil</Text>

                <TouchableOpacity style={styles.exitButton} onPress={logout}>
                    <Text style={styles.exitButtonText}>Sair</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.containerUserLogo} onPress={() => imagePickerPress()}>
                    <Image
                        source={{ uri: photo?.path ? photo.path : user.Foto }}
                        style={styles.userLogo}
                        resizeMode={'contain'}
                    />
                </TouchableOpacity>

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
                    {/* <TextInput
                        style={styles.inputText}
                        placeholder={'Senha'}
                        value={userPass}
                        onChangeText={text => setUserPass(text)}
                        secureTextEntry={true}
                    /> */}
                    <TextInput
                        style={styles.inputText}
                        placeholder={'Senha'}
                        value={Senha}
                        onChangeText={setSenha}
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


                    <TouchableOpacity style={styles.saveButton} onPress={() => updateUser()}>
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