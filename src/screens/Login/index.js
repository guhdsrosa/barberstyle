import React from "react"
import { View, Text, TextInput, Button } from "react-native"

import {Container, CenterText, TextIputStyle, ButtonStyle} from './Login.styles'

const Login = () => {
    return (
        <>
            <Container>
                <CenterText>Bem vindo ao</CenterText>
                <CenterText>Barber's Style</CenterText>

                <CenterText>Email</CenterText>
                <TextIputStyle
                    value={''}
                />

                <CenterText>Senha</CenterText>
                <TextIputStyle
                    value={''}
                />

                <ButtonStyle
                    onPress={console.log("pressed")}
                    title="Login"
                    color="#841584"
                    accessibilityLabel="Botão de Login"
                />
                <ButtonStyle
                    onPress={console.log("pressed")}
                    title="Registrar"
                    color="#841584"
                    accessibilityLabel="Botão de Login"
                />
            </Container>
        </>
    )
}

export default Login;