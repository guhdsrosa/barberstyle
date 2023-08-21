import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert, ScrollView, Image } from "react-native";
import { Checkbox } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import callApi from '../../server/api'
import AsyncStorage from "@react-native-async-storage/async-storage";
import ImagePicker from 'react-native-image-crop-picker';

import AwesomeAlert from "react-native-awesome-alerts";
import { styles } from './styles'
import Ionicons from "react-native-vector-icons/Ionicons";
import Perfil from "../Pefil";

const Register = ({ route }) => {

    const navigation = useNavigation()
    const [screen, setScreen] = useState(0);
    const [checked, setChecked] = useState(false);
    const [button, setButton] = useState(null)
    const [passError, setPassError] = useState(false)
    const [idEstabFunc, setIdEstabFunc] = useState(null)
    const [foto, setFoto] = useState(false)
    const [user, setUser] = useState({
        Nome: '',
        Email: '',
        Senha: '',
        ConfirmSenha: '',
        TipoUsuario: '',
        Foto: '',
        Telefone: ''
    })
    const [establishment, setEstablishment] = useState({
        NomeEstab: '',
        CEP: '',
        Cidade: '',
        Rua: '',
        Bairro: '',
        Estado: '',
        Numero: '',
        CNPJ: '',
        TelefoneEstab: '',
        TelefoneEstab1: '',
        Sobre: '',
        RedeSocial: ''
    })

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
        option: null,
        color: null
    })
    const { option } = route.params

    const registerPress = async () => {
        if (user.Senha == user.ConfirmSenha && user.Senha.length > 5) {
            if (user.Nome != '' && user.Email != '' && user.Telefone != '') {
                if (option == 'Dono' && screen == 0) {
                    return setScreen(screen + 1)
                } else {
                    if (option == 'Dono' &&
                        establishment.NomeEstab != ''
                        && establishment.CEP != ''
                        && establishment.Rua != ''
                        && establishment.Bairro != ''
                        && establishment.Estado != ''
                        && establishment.Cidade != ''
                        && establishment.Numero != ''
                        && establishment.TelefoneEstab != '') {
                        return insertUser()
                    }
                    if (option == 'Funcionario' || option == 'Cliente') {
                        return insertUser()
                    } else {
                        return setShowAlert({
                            ...showAlert,
                            show: true,
                            title: 'Ocorreu um erro ao cadastrar',
                            message: `Erro ao cadastrar verifique se todos os campos com ( * ) estão preenchidos corretamente!`,
                            errorButtom: '',
                            successButtom: '',
                            showCancelButton: true,
                            showConfirmButton: false,
                            cancelText: 'Tentar novamente',
                            confirmText: '',
                            option: false
                        })
                    }
                }
            } else {
                setShowAlert({
                    ...showAlert,
                    show: true,
                    title: 'Ocorreu um erro',
                    message: `Verifique se todos os campos estão preenchidos corretamente!`,
                    errorButtom: '',
                    successButtom: '',
                    showCancelButton: true,
                    showConfirmButton: false,
                    cancelText: 'Tentar novamente',
                    confirmText: '',
                    option: false
                })
            }
        } else {
            setShowAlert({
                ...showAlert,
                show: true,
                title: 'Ocorreu um erro',
                message: `Ocorreu um erro ao criar sua conta, sua senha deve ser iguais e ter no minímo 6 caracteres!`,
                errorButtom: '',
                successButtom: '',
                showCancelButton: true,
                showConfirmButton: false,
                cancelText: 'Tentar novamente',
                confirmText: '',
                option: false
            })
        }
    }

    const insertUser = async () => {
        try {
            var config = {
                method: 'post',
                url: 'Usuario/Register',
                data: {
                    Nome: user.Nome,
                    Email: user.Email,
                    Senha: user.Senha,
                    confirmpassword: user.Senha,
                    TipoUsuario: option,
                    //Foto: user.Foto,
                    Foto: foto ? foto : user.Foto,
                    Telefone: user.Telefone,
                    NomeEstabelecimento: establishment.NomeEstab,
                    CEP: establishment.CEP,
                    Rua: establishment.Rua,
                    Bairro: establishment.Bairro,
                    Estado: establishment.Estado,
                    Cidade: establishment.Cidade,
                    NumeroEstabelecimento: establishment.Numero,
                    CNPJ: establishment.CNPJ,
                    Telefone1: establishment.TelefoneEstab,
                    Telefone2: establishment.TelefoneEstab1,
                    SobreNos: establishment.Sobre,
                    RedeSocial: establishment.RedeSocial
                }
            };
            callApi(config)
                .then(function (response) {
                    if (response.status == 200) {
                        console.log('[USER]', response.data.user)
                        AsyncStorage.setItem('userInfo', JSON.stringify(response.data.user))

                        if (option == 'Cliente' || option == 'Funcionario' || option == 'Dono') {
                            setShowAlert({
                                ...showAlert,
                                show: true,
                                title: 'Oba!',
                                message: `Sua conta foi criada com sucesso! Acesse seu perfil para editar sua conta ou explore estabelecimentos :D`,
                                errorButtom: 'perfil',
                                successButtom: 'explorar',
                                showCancelButton: true,
                                showConfirmButton: true,
                                cancelText: 'Ir para perfil',
                                confirmText: 'Explorar',
                                option: false,
                                color: true
                            })
                        }
                        // if (option == 'Dono') {
                        //     //insertEstablishment()
                        //     setShowAlert({
                        //         ...showAlert,
                        //         show: true,
                        //         title: 'Erro',
                        //         message: `Algum erro inesperado aconteceu, por favor tente novamente`,
                        //         errorButtom: '',
                        //         successButtom: '',
                        //         showCancelButton: true,
                        //         showConfirmButton: false,
                        //         cancelText: 'Ok',
                        //         confirmText: '',
                        //         option: false
                        //     })
                        // }
                    }
                })
                .catch(function (error) {
                    setShowAlert({
                        ...showAlert,
                        show: true,
                        title: 'Erro',
                        message: `Algums erro inesperado aconteceu, por favor tente novamente`,
                        errorButtom: '',
                        successButtom: '',
                        showCancelButton: true,
                        showConfirmButton: false,
                        cancelText: 'Ok',
                        confirmText: '',
                        option: false
                    })
                    console.log(error)
                });
        } catch (err) {
            console.log('[ERROR]', err)
        }
    }

    // const insertEstablishment = async () => {
    //     try {
    //         var config = {
    //             method: 'post',
    //             url: 'Estabelecimento/Register',
    //             data: {
    //                 NomeEstabelecimento: establishment.NomeEstab,
    //                 CEP: establishment.CEP,
    //                 Rua: establishment.Rua,
    //                 Bairro: establishment.Bairro,
    //                 Estado: establishment.Estado,
    //                 Cidade: establishment.Cidade,
    //                 NumeroEstabelecimento: establishment.Numero,
    //                 CNPJ: establishment.CNPJ,
    //                 Telefone1: establishment.TelefoneEstab,
    //                 Telefone2: establishment.TelefoneEstab1,
    //                 SobreNos: establishment.Sobre,
    //                 RedeSocial: establishment.RedeSocial
    //             }
    //         };
    //         callApi(config)
    //             .then(function (response) {
    //                 console.log('[RES] ', response.data)
    //                 // setIdEstabFunc(null)
    //                 // insertEstablishmentFunc()
    //             })
    //             .catch(function (error) {
    //                 setShowAlert({
    //                     ...showAlert,
    //                     show: true,
    //                     title: 'Erro',
    //                     message: `Algum erro inesperado aconteceu, por favor tente novamente`,
    //                     errorButtom: '',
    //                     successButtom: '',
    //                     showCancelButton: true,
    //                     showConfirmButton: false,
    //                     cancelText: 'Ok',
    //                     confirmText: '',
    //                     option: false
    //                 })
    //             });
    //     } catch (err) {
    //         console.log('[ERRORs]', err)
    //     }
    // }

    // insertEstablishmentFunc = async () => {
    //     try {
    //         var config = {
    //             method: 'post',
    //             url: '/EstabFunc/Create',
    //             data: {
    //                 IdEstabelecimento: idEstabFunc
    //             }
    //         };
    //         callApi(config)
    //             .then(function (response) {
    //                 if (response.status == 200) {
    //                     return setShowAlert({
    //                         ...showAlert,
    //                         show: true,
    //                         title: 'Oba!',
    //                         message: `Sua conta foi criada com sucesso! Acesse seu perfil para editar sua conta ou explore estabelecimentos :D`,
    //                         errorButtom: 'perfil',
    //                         successButtom: 'explorar',
    //                         showCancelButton: true,
    //                         showConfirmButton: true,
    //                         cancelText: 'Ir para perfil',
    //                         confirmText: 'Explorar',
    //                         option: false,
    //                         color: true
    //                     })
    //                 }
    //             })
    //             .catch(function (error) {
    //                 setShowAlert({
    //                     ...showAlert,
    //                     show: true,
    //                     title: 'Erro',
    //                     message: `Algum erro inesperado aconteceu, por favor tente novamente`,
    //                     errorButtom: '',
    //                     successButtom: '',
    //                     showCancelButton: true,
    //                     showConfirmButton: false,
    //                     cancelText: 'Ok',
    //                     confirmText: '',
    //                     option: false
    //                 })
    //             });
    //     } catch (err) {
    //         console.log('[ERRORs]', err)
    //     }
    // }

    const resetAlert = ({ option }) => {
        if (option == 'perfil') {
            navigation.navigate('Perfil')
        }

        if (option == 'explorar') {
            navigation.navigate('Home')
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
            option: false,
            color: null
        })
    }

    useEffect(() => {
        if (user.Senha != user.ConfirmSenha && user.ConfirmSenha != '') {
            setPassError(true)
        } else {
            setPassError(false)
        }
    }, [user.Senha, user.ConfirmSenha])

    useEffect(() => {
        if (option == 'Cliente') {
            return setButton('Cadastrar')
        }

        if (option == 'Funcionario') {
            return setButton('Cadastrar')
        }

        if (option == 'Dono') {
            return setButton('Proximo')
        }
    }, [option])

    const optionClose = () => {
        navigation.goBack()
    }

    const imagePickerPress = () => {
        ImagePicker.openPicker({
            //multiple: true
            width: 400,
            height: 400,
            cropping: true,
        }).then(images => {
            //console.log('IMAGEM: ', images);
            setFoto(images.path)
            //updateUser()
        });
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.menuContent}>
                <TouchableOpacity onPress={optionClose}>
                    <Ionicons name="ios-arrow-back-circle" size={25} color={'#141414'} />
                </TouchableOpacity>

                <Text style={styles.menuTitle}>Registrar-se</Text>

                <TouchableOpacity>
                    <Text style={styles.loginTitle}></Text>
                </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
                {screen == 0 &&
                    <>
                        <TextInput
                            style={styles.inputText}
                            placeholder={'Nome Completo'}
                            value={user.Nome}
                            placeholderTextColor={'#BDBDBD'}
                            onChangeText={text => setUser({ ...user, Nome: text })}
                        />

                        <TextInput
                            style={styles.inputText}
                            placeholder={'E-mail'}
                            value={user.Email}
                            placeholderTextColor={'#BDBDBD'}
                            onChangeText={text => setUser({ ...user, Email: text })}
                        />

                        <TextInput
                            style={styles.inputText}
                            placeholder={'Telefone'}
                            value={user.Telefone}
                            placeholderTextColor={'#BDBDBD'}
                            onChangeText={text => setUser({ ...user, Telefone: text })}
                        />

                        <TextInput
                            style={styles.inputText}
                            placeholder={'Senha'}
                            value={user.Senha}
                            placeholderTextColor={'#BDBDBD'}
                            onChangeText={text => setUser({ ...user, Senha: text })}
                            secureTextEntry={true}
                        />

                        <TextInput
                            style={styles.inputText}
                            placeholder={'Confirme a senha'}
                            value={user.ConfirmSenha}
                            placeholderTextColor={'#BDBDBD'}
                            onChangeText={text => setUser({ ...user, ConfirmSenha: text })}
                            secureTextEntry={true}
                        />

                        {/* <TextInput
                            style={styles.inputText}
                            placeholder={'Foto'}
                            value={user.Foto}
                            placeholderTextColor={'#BDBDBD'}
                            onChangeText={text => setUser({ ...user, Foto: text })}
                        /> */}

                    <TouchableOpacity style={styles.inputText} onPress={() => imagePickerPress()}>
                    <Image
                        
                        source={{uri: foto ? foto : user.Foto}}
                        style={styles.userLogo}
                        resizeMode={'contain'}
                        onPre
                    />
                    </TouchableOpacity>

                        {passError && <Text style={[styles.checkText, { color: '#ff0002', marginTop: 10, marginLeft: 5 }]}>Sua senha está diferente</Text>}
                    </>
                }

                {screen == 1 &&
                    <>
                        <Text>Todos os campos com * são obrigatórios</Text>
                        <TextInput
                            style={styles.inputText}
                            placeholder={'Nome do estabelecimento*'}
                            value={establishment.NomeEstab}
                            placeholderTextColor={'#BDBDBD'}
                            onChangeText={text => setEstablishment({ ...establishment, NomeEstab: text })}
                        />

                        <TextInput
                            style={styles.inputText}
                            placeholder={'CEP*'}
                            value={establishment.CEP}
                            placeholderTextColor={'#BDBDBD'}
                            onChangeText={text => setEstablishment({ ...establishment, CEP: text })}
                        />

                        <TextInput
                            style={styles.inputText}
                            placeholder={'Rua*'}
                            value={establishment.Rua}
                            placeholderTextColor={'#BDBDBD'}
                            onChangeText={text => setEstablishment({ ...establishment, Rua: text })}
                        />

                        <TextInput
                            style={styles.inputText}
                            placeholder={'Bairro*'}
                            value={establishment.Bairro}
                            placeholderTextColor={'#BDBDBD'}
                            onChangeText={text => setEstablishment({ ...establishment, Bairro: text })}
                        />

                        <TextInput
                            style={styles.inputText}
                            placeholder={'Estado*'}
                            value={establishment.Estado}
                            placeholderTextColor={'#BDBDBD'}
                            onChangeText={text => setEstablishment({ ...establishment, Estado: text })}
                        />

                        <TextInput
                            style={styles.inputText}
                            placeholder={'Cidade*'}
                            value={establishment.Cidade}
                            placeholderTextColor={'#BDBDBD'}
                            onChangeText={text => setEstablishment({ ...establishment, Cidade: text })}
                        />

                        <TextInput
                            style={styles.inputText}
                            placeholder={'Numero*'}
                            value={establishment.Numero}
                            placeholderTextColor={'#BDBDBD'}
                            onChangeText={text => setEstablishment({ ...establishment, Numero: text })}
                        />

                        <TextInput
                            style={styles.inputText}
                            placeholder={'CNPJ'}
                            value={establishment.CNPJ}
                            placeholderTextColor={'#BDBDBD'}
                            onChangeText={text => setEstablishment({ ...establishment, CNPJ: text })}
                        />

                        <TextInput
                            style={styles.inputText}
                            placeholder={'Telefone do Estabelecimento*'}
                            value={establishment.TelefoneEstab}
                            placeholderTextColor={'#BDBDBD'}
                            onChangeText={text => setEstablishment({ ...establishment, TelefoneEstab: text })}
                        />

                        <TextInput
                            style={styles.inputText}
                            placeholder={'Telefone do Estabelecimento'}
                            value={establishment.TelefoneEstab1}
                            placeholderTextColor={'#BDBDBD'}
                            onChangeText={text => setEstablishment({ ...establishment, TelefoneEstab1: text })}
                        />

                        <TextInput
                            style={styles.inputText}
                            placeholder={'Sobre'}
                            value={establishment.Sobre}
                            placeholderTextColor={'#BDBDBD'}
                            onChangeText={text => setEstablishment({ ...establishment, Sobre: text })}
                        />

                        <TextInput
                            style={styles.inputText}
                            placeholder={'Rede Social'}
                            value={establishment.RedeSocial}
                            placeholderTextColor={'#BDBDBD'}
                            onChangeText={text => setEstablishment({ ...establishment, RedeSocial: text })}
                        />
                    </>
                }
            </View>

            <TouchableOpacity onPress={registerPress} style={styles.buttonConfirm}>
                <Text style={styles.buttonConfirmText}>{screen == 0 ? button : 'Cadastrar'}</Text>
            </TouchableOpacity>

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
                cancelButtonColor={!showAlert.color ? "#ff0000" : '#52cb5f'}
                onCancelPressed={() => {
                    resetAlert({ option: showAlert.errorButtom })
                }}
                onConfirmPressed={() =>
                    resetAlert({ option: showAlert.successButtom })
                }
            />
        </ScrollView>
    )
}

export default Register;