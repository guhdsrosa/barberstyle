import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Alert } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import styles from "./style";

const Perfil = () => {

    const navigation = useNavigation()

    const logout = () => {
        Alert.alert('Aviso', 'Você realmente quer deslogar da sua conta?', [
            {
                text: 'Mudei de ideia'
            },
            {
                text: 'Sair',
                onPress: () => navigation.navigate('Login')
            }
        ])
    }

    return (
        <LinearGradient style={styles.container} colors={styles.headerColor}>
            <ScrollView>
                <Text style={styles.titleText}>Perfil</Text>

                <TouchableOpacity style={styles.exitButton} onPress={logout}>
                    <Text style={styles.exitButtonText}>Sair</Text>
                </TouchableOpacity>

                <Image
                    source={{ uri: 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745' }}
                    style={styles.userLogo}
                    resizeMode={'contain'}
                />

                <View style={styles.body}>
                    <Text style={styles.titleName}>NOME</Text>

                    <TextInput
                        style={styles.inputText}
                        placeholder={'Nome'}
                    />
                    <TextInput
                        style={styles.inputText}
                        placeholder={'Email'}
                    />
                    <TextInput
                        style={styles.inputText}
                        placeholder={'Senha'}
                    />
                    <TextInput
                        style={styles.inputText}
                        placeholder={'Telefone'}
                    />

                    <TouchableOpacity style={styles.saveButton}>
                        <Text style={styles.saveButtonText}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </LinearGradient>
    )
}

export default Perfil;