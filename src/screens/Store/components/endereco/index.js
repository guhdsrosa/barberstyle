import React from "react";
import { ScrollView, View, Text, TextInput, Linking, TouchableOpacity, Image } from "react-native";
import MapView from "react-native-maps";
import { enableLatestRenderer } from 'react-native-maps';

import googleMaps from '../../../../assets/images/icons/Google-Maps-Logo.png'

enableLatestRenderer();

import styles from "./styles";

const Endereco = (props) => {
    //console.log(props.data)

    const openGoogleMaps = (endereco) => {
        const formattedAddress = encodeURIComponent(endereco);
        const url = `https://www.google.com/maps/search/?api=1&query=${formattedAddress}`;

        Linking.openURL(url).catch(err =>
            console.error('Erro ao abrir o Google Maps:', err)
        );
    };


    return (
        <ScrollView style={styles.container}>
            <View>
                <Text style={styles.title}>{props.data.Rua}</Text>
                <Text style={styles.title}>Número: {props.data.NumeroEstabelecimento}</Text>
                <Text style={styles.title}>CEP: {props.data.CEP}</Text>
                <Text style={styles.title}>Bairro: {props.data.Bairro}</Text>
                <Text style={styles.title}>Cidade: {`${props.data.Cidade} - ${props.data.Estado}`}</Text>
            </View>

            <TouchableOpacity
                onPress={() => openGoogleMaps(`${props.data.Rua}, ${props.data.NumeroEstabelecimento} - ${props.data.Bairro}, ${props.data.Cidade} - ${props.data.Estado} `)}
                style={styles.buttonAddress}
            >
                <Image
                    style={styles.textAddress}
                    source={googleMaps}
                    resizeMode="cover"
                />
            </TouchableOpacity>
        </ScrollView>
    )
}

export default Endereco;