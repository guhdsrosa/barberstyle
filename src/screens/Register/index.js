import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert, ScrollView } from "react-native";
import { Checkbox } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import callApi from '../../server/api'

import { styles } from './styles'
import Ionicons from "react-native-vector-icons/Ionicons";

const Register = ({ route }) => {

    const navigation = useNavigation()
    const [checked, setChecked] = useState(false);
    const [button, setButton] = useState(null)
    const [passError, setPassError] = useState(false)
    const [user, setUser] = useState({
        Nome: '',
        Email: '',
        Senha: '',
        ConfirmSenha: '',
        TipoUsuario: '',
        Foto: '',
        Telefone: ''
    })
    const { option } = route.params

    const registerPress = async () => {
        if (checked) {
            if (option == 'comum' && user.Senha == user.ConfirmSenha) {
                try {
                    var config = {
                        method: 'post',
                        url: 'Usuario/Register',
                        data: {
                            Nome: user.Nome,
                            Email: user.Email,
                            Senha: user.Senha,
                            TipoUsuario: option,
                            Foto: user.Foto,
                            Telefone: user.Telefone
                        }
                    };
                    callApi(config)
                        .then(function (response) {
                            if (response.status == 200) {
                                console.log('[USER]', response.data)
                            }
                        })
                        .catch(function (error) {
                            Alert.alert('Erro', 'Algum erro inesperado aconteceu, tente novamente')
                        });
                } catch (err) {
                    console.log('[ERROR]', err)
                }
            }else{
                Alert.alert('Aviso', 'Sua senha esta diferente')
            }

            if (option == 'estabelecimento') {

            }
        } else {
            Alert.alert('Erro', 'Confirme nossas politicas e serviços para continuar seu cadastro')
        }

    }

    useEffect(() => {
        if(user.Senha != user.ConfirmSenha && user.ConfirmSenha != ''){
            setPassError(true)
        } else {
            setPassError(false)
        }
    }, [user.Senha, user.ConfirmSenha])

    useEffect(() => {
        if (option == 'comum') {
            return setButton('Cadastrar')
        }

        if (option == 'estabelecimento') {
            return setButton('Proximo')
        }
    }, [option])

    const optionClose = () => {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <View style={styles.menuContent}>
                <TouchableOpacity onPress={optionClose}>
                    <Ionicons name="close" size={20} color={'#141414'} />
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

                {passError && <Text style={[styles.checkText, {color: '#ff0002', marginTop: 10, marginLeft: 5}]}>Sua senha está diferente</Text>}

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

            <TouchableOpacity onPress={registerPress} style={styles.buttonConfirm}>
                <Text style={styles.buttonConfirmText}>{button}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Register;