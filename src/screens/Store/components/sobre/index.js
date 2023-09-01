import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

const Sobre = (props) => {
    console.log(props.data)
    return(
        <ScrollView>
            {props.data && 
                <View style={styles.container}>
                    <Text style={styles.text}>Sobre: {props.data.SobreNos}</Text>
                    <Text style={styles.text}>Rede Social: {props.data.RedeSocial}</Text>
                    <Text style={styles.text}>Telefone: {props.data.Telefone1}</Text>
                    {props.data.Telefone2 != "" && <Text style={styles.text}>Telefone: {props.data.Telefone1}</Text>}
                    <Text style={styles.text}>CNPJ: {props.data.CNPJ}</Text>
                </View>
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 5,
        marginVertical: 20
    },

    text: {
        color: '#181818',
        fontSize: 18,
        fontFamily: 'Quicksand-Regular',
    }
})

export default Sobre;