import React from "react"
import { View, Text, TextInput, Button } from "react-native"

import {Container, CenterText} from './Login.styles'

const Login = () => {
    return (
        <>
            <Container>
                <CenterText>Bem vindo ao</CenterText>
                <CenterText>LOGO</CenterText>

                <CenterText>Email</CenterText>
                <TextInput
                    value={"Email input"}
                />

                <CenterText>Senha</CenterText>
                <TextInput
                    value={"Senha input"}
                />

                <Button
                    onPress={console.log("pressed")}
                    title="Login"
                    color="#841584"
                    accessibilityLabel="Botão de Login"
                />
            </Container>
        </>
    )
}

export default Login;