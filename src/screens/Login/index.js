import React from "react"
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native"

import logo from '../../assets/images/logo.png'
import { styles } from './styles'

const Login = () => {
    return (
        <View style={styles.Container}>

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
                placeholderTextColor={'#9b9ca2'}
            />
            <TextInput
                style={styles.TextInput}
                placeholder={'Senha'}
                value={''}
                placeholderTextColor={'#9b9ca2'}
            />

            <View style={styles.ContentOptions}>
                <Text style={styles.ContentRemember}>Lembrar de mim</Text>
                <TouchableOpacity>
                    <Text style={styles.ContentRecover}>Esqueceu a senha?</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.Button}>
                <Text style={styles.ButtonText}>Log In</Text>
            </TouchableOpacity>

            <View style={styles.FooterOptions}>
                <Text style={styles.ContentRemember}>Novo Usuário?</Text>
                <TouchableOpacity>
                    <Text style={[styles.ContentRecover, {marginLeft: 5}]}>Criar conta</Text>
                </TouchableOpacity>
            </View>


            {/*<TouchableOpacity
                onPress={console.log("pressed")}
                title="Login"
                color="#841584"
                accessibilityLabel="Botão de Login"
            />
            <TouchableOpacity
                onPress={console.log("pressed")}
                title="Registrar"
                color="#841584"
                accessibilityLabel="Botão de Login"
            />*/}

        </View>
    )
}

export default Login;