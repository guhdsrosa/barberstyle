import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native"
import callApi from '../../server/api'

import FontAwesome from "react-native-vector-icons/FontAwesome";
import logo from '../../assets/images/logo.png'
import { styles } from './styles'

const Login = () => {

    const navigation = useNavigation()
    const [hide, setHide] = useState(true)
    const [login, setLogin] = useState({
        Email: null,
        Senha: null
    })

    const Login = async () => {
        if (login.Email && login.Senha) {
            try {
                var config = {
                    method: 'post',
                    url: 'Usuario/Login',
                    data: {
                        Email: login.Email,
                        Senha: login.Senha
                    }
                };
                callApi(config)
                    .then(function (response) {
                        if (response.status == 200) {
                            console.log('[USER]', response.data)
                            AsyncStorage.setItem('userInfo', JSON.stringify(response.data))
                            navigation.navigate('Home')
                        }
                    })
                    .catch(function (error) {
                        Alert.alert('Erro', 'Login ou senha podem estar incorretos')
                    });
            } catch (err) {
                console.log('[ERROR]', err)
            }
        } else {
            Alert.alert('Aviso', 'Verefique os campos e preencha corretamente')
        }

    }

    const Register = () => {
        navigation.navigate('OptionRegister')
    }

    hidePass = () => {
        setHide(!hide)
    }

    return (
        <View style={styles.Container}>

            {<Image
                source={logo}
                style={styles.TitleLogo}
                resizeMode={'contain'}
            />}

            <Text style={styles.Text}>Log In</Text>

            <TextInput
                style={styles.TextInput}
                placeholder={'E-mail'}
                value={login.Email}
                placeholderTextColor={'#BDBDBD'}
                onChangeText={text => setLogin({ ...login, Email: text })}
            />

            <View>
                <TextInput
                    style={styles.TextInput}
                    placeholder={'Senha'}
                    value={Login.Senha}
                    placeholderTextColor={'#BDBDBD'}
                    secureTextEntry={hide}
                    onChangeText={text => setLogin({ ...login, Senha: text })}
                />
                {hide ?
                    <FontAwesome name="eye" size={25} style={styles.eyeStyle} onPress={hidePass} /> :
                    <FontAwesome name="eye-slash" size={25} style={styles.eyeStyle} onPress={hidePass} />
                }
            </View>

            <TouchableOpacity style={styles.Button} onPress={Login}>
                <Text style={styles.ButtonText}>Log In</Text>
            </TouchableOpacity>

            <View style={styles.ContentOptions}>
                <TouchableOpacity>
                    <Text style={styles.ContentRecover}>Esqueci a senha</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.FooterOptions}>
                <Text style={styles.ContentRemember}>Novo Usuário?</Text>
                <Text onPress={Register} style={styles.ContentRecover}> Criar conta</Text>
            </View>
        </View>
    )
}

export default Login;