import React from "react";
import { View, Text, TextInput, ScrollView } from "react-native";

import styles from "./styles";

const Geral = () => {
    return (
        <View>
            <TextInput
                style={styles.inputText}
                placeholder={'Nome do Estabelecimento*'}
            />
            <TextInput
                style={styles.inputText}
                placeholder={'CEP*'}
            />
            <TextInput
                style={styles.inputText}
                placeholder={'Rua*'}
            />
            <TextInput
                style={styles.inputText}
                placeholder={'Bairro*'}
            />
            <TextInput
                style={styles.inputText}
                placeholder={'Estado*'}
            />
            <TextInput
                style={styles.inputText}
                placeholder={'Número*'}
            />
            <TextInput
                style={styles.inputText}
                placeholder={'CNPJ'}
            />
            <TextInput
                style={styles.inputText}
                placeholder={'Telefone'}
            />
            <TextInput
                style={styles.inputText}
                placeholder={'Telefone'}
            />
            <TextInput
                style={styles.inputText}
                placeholder={'Sobre nós'}
            />
        </View>
    )
}

export default Geral