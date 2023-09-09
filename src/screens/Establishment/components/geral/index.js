import React, { useEffect, useState } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet } from "react-native";

const Geral = (props) => {
    const [loading, setLoading] = useState(true)
    console.log('props.establishment', props.establishment)
    useEffect(() => {
        if (props.establishment)
            setLoading(false)
    }, [props.establishment])

    return (
        <View>
            {!loading &&
                <>
                    <TextInput
                        style={styles.inputText}
                        placeholder={'Nome do Estabelecimento*'}
                        value={props.establishment.NomeEstabelecimento}
                    />
                    <TextInput
                        style={styles.inputText}
                        placeholder={'CEP*'}
                        value={props.establishment.CEP}
                    />
                    <TextInput
                        style={styles.inputText}
                        placeholder={'Rua*'}
                        value={props.establishment.Rua}
                    />
                    <TextInput
                        style={styles.inputText}
                        placeholder={'Bairro*'}
                        value={props.establishment.Bairro}
                    />
                    <TextInput
                        style={styles.inputText}
                        placeholder={'Estado*'}
                        value={props.establishment.Estado}
                    />
                    <TextInput
                        style={styles.inputText}
                        placeholder={'Número*'}
                        value={props.establishment.NumeroEstabelecimento}
                    />
                    <TextInput
                        style={styles.inputText}
                        placeholder={'CNPJ'}
                        value={props.establishment.CNPJ}
                    />
                    <TextInput
                        style={styles.inputText}
                        placeholder={'Telefone'}
                        value={props.establishment.Telefone1}
                    />
                    <TextInput
                        style={styles.inputText}
                        placeholder={'Telefone'}
                        value={props.establishment.Telefone2}
                    />
                    <TextInput
                        style={styles.inputText}
                        placeholder={'Sobre nós'}
                        value={props.establishment.SobreNos}
                    />
                </>
            }
        </View>
    )
}

export default Geral;

const styles = StyleSheet.create({
    inputText: {
        borderRadius: 10,
        //marginHorizontal: 18,
        marginTop: 15,
        borderWidth: 2,
        borderColor: '#E8E8E8',
        backgroundColor: '#F6F6F6',
        paddingHorizontal: 15,
        color: '#181818',
        fontSize: 16,
        fontFamily: 'Quicksand-SemiBold',
    },
})