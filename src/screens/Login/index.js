import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native"
import { useNavigation } from "@react-navigation/native"
import FontAwesome from "react-native-vector-icons/FontAwesome";

import logo from '../../assets/images/logo.png'
import { styles } from './styles'

const Login = () => {

    const navigation = useNavigation()
    const [hide, setHide] = useState(true)

    const Login = () => {
        navigation.navigate('Home')
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
                value={''}
                placeholderTextColor={'#BDBDBD'}
            />

            <View>
                <TextInput
                    style={styles.TextInput}
                    placeholder={'Senha'}
                    value={''}
                    placeholderTextColor={'#BDBDBD'}
                    secureTextEntry={hide}
                />
                {hide ? 
                    <FontAwesome name="eye" size={25} style={styles.eyeStyle} onPress={hidePass}/> : 
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