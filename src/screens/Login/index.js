import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native"
import { useNavigation } from "@react-navigation/native"
import LinearGradient from "react-native-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import logo from '../../assets/images/logo.png'
import { styles } from './styles'

const Login = () => {

    const navigation = useNavigation()
    const [hide, setHide] = useState(true)

    const Login = () => {
        console.log('login press')
        navigation.navigate('Home')
    }

    hidePass = () => {
        setHide(!hide)
    }

    return (
        <LinearGradient colors={['#28333f', '#2e3445']} style={styles.Container}>

            <Image
                source={logo}
                style={styles.TitleLogo}
                resizeMode={'contain'}
            />

            <Text style={styles.Text}>Log In</Text>

            <TextInput
                style={styles.TextInput}
                placeholder={'E-mail'}
                value={''}
                placeholderTextColor={'#e3e4ee'}
            />

            <View>
                <TextInput
                    style={styles.TextInput}
                    placeholder={'Senha'}
                    value={''}
                    placeholderTextColor={'#e3e4ee'}
                    secureTextEntry={hide}
                />
                {hide ? <FontAwesome name="eye" size={25} style={styles.eyeStyle} onPress={hidePass}/> : <FontAwesome name="eye-slash" size={25} style={styles.eyeStyle} onPress={hidePass} />}
            </View>

            <View style={styles.ContentOptions}>
                <Text style={styles.ContentRemember}>Lembrar de mim</Text>
                <TouchableOpacity>
                    <Text style={styles.ContentRecover}>Esqueceu a senha?</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.Button} onPress={Login}>
                <Text style={styles.ButtonText}>Log In</Text>
            </TouchableOpacity>

            <View style={styles.FooterOptions}>
                <Text style={styles.ContentRemember}>Novo Usuário?</Text>
                <TouchableOpacity>
                    <Text style={[styles.ContentRecover, { marginLeft: 5 }]}>Criar conta</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}

export default Login;