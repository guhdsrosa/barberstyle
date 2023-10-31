import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ImagePicker from 'react-native-image-crop-picker';

import AwesomeAlert from "react-native-awesome-alerts";
import { styles } from './styles'
import Ionicons from "react-native-vector-icons/Ionicons";

const Register = ({ route }) => {

    const navigation = useNavigation()
    const [screen, setScreen] = useState(0);
    const [button, setButton] = useState(null)
    const [passError, setPassError] = useState(false)
    const [userPhoto, setUserPhoto] = useState('');

    const [user, setUser] = useState({
        Nome: '',
        Email: '',
        Senha: '',
        ConfirmSenha: '',
        TipoUsuario: '',
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
        const formData = new FormData();

        formData.append('Nome', user.Nome);
        formData.append('Email', user.Email);
        formData.append('Senha', user.Senha);
        formData.append('confirmpassword', user.Senha);
        formData.append('TipoUsuario', option);
        formData.append('Telefone', user.Telefone);
        formData.append('NomeEstabelecimento', establishment.NomeEstab);
        formData.append('CEP', establishment.CEP);
        formData.append('Rua', establishment.Rua);
        formData.append('Bairro', establishment.Bairro);
        formData.append('Estado', establishment.Estado);
        formData.append('Cidade', establishment.Cidade);
        formData.append('NumeroEstabelecimento', establishment.Numero);
        formData.append('CNPJ', establishment.CNPJ);
        formData.append('Telefone1', establishment.TelefoneEstab);
        formData.append('Telefone2', establishment.TelefoneEstab1);
        formData.append('SobreNos', establishment.Sobre);
        formData.append('RedeSocial', establishment.RedeSocial);

        const regex = /\/([^/]+)\.jpg$/;
        const url = userPhoto.path.match(regex);
        const nomeImagem = url[0].replace(/^\//, '')

        formData.append('File', {
            uri: userPhoto.path,
            type: 'image/jpeg', // Tipo da imagem (pode variar)
            name: nomeImagem,
        });

        try {
            axios.post('http://18.230.154.41:3000/Usuario/Register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Importante definir o cabeçalho correto
                },
            })
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

    const imagePickerCallback = () => {
        ImagePicker.openPicker({
            width: 400,
            height: 400,
            cropping: true
        }).then(image => {
            setUserPhoto(image)
        })
    }

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

                        <Text style={[styles.menuTitle, { fontSize: 18, textAlign: 'center', marginTop: 20 }]}>Carregar foto</Text>

                        <TouchableOpacity style={styles.containerUserLogo} onPress={() => imagePickerCallback()}>
                            {userPhoto ?
                                <Image
                                    //source={{ uri: foto ? foto : user.Foto }}
                                    source={{ uri: userPhoto.path }}
                                    style={styles.userLogo}
                                    resizeMode={'contain'}
                                />
                                :
                                <Ionicons
                                    name="share-outline"
                                    size={35}
                                    color={'#141414'}
                                    style={{ marginVertical: 60 }}
                                />
                            }
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