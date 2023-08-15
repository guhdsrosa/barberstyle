import React from "react";
import { ScrollView, View, Text, TextInput } from "react-native";
import MapView from "react-native-maps";
import {enableLatestRenderer} from 'react-native-maps';

enableLatestRenderer();

import styles from "./styles";

const Endereco = () => {
    return (
        <ScrollView style={styles.container}>
            <MapView
                style={{ marginBottom: 10, width: '100%', height: 250 }}
                region={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
                //provider={PROVIDER_GOOGLE}
            />

            <View style={styles.twoOption}>
                <View>
                    <Text style={styles.title}>Rua</Text>
                    <TextInput
                        value=""
                        placeholder="teste"
                        style={[styles.textInput, { minWidth: 270, maxWidth: 270 }]}
                    />
                </View>
                <View>
                    <Text style={styles.title}>Número</Text>
                    <TextInput
                        value=""
                        placeholder="teste"
                        style={[styles.textInput, { minWidth: 90, maxWidth: 90 }]}
                    />
                </View>
            </View>

            <View>
                <Text style={styles.title}>Complemento</Text>
                <TextInput
                    value=""
                    placeholder="teste"
                    style={[styles.textInput, { minWidth: '100%', maxWidth: '100%' }]}
                />
            </View>

            <View style={styles.twoOption}>
                <View>
                    <Text style={styles.title}>CEP</Text>
                    <TextInput
                        value=""
                        placeholder="teste"
                        style={[styles.textInput, { minWidth: 220, maxWidth: 220 }]}
                    />
                </View>
                <View>
                    <Text style={styles.title}>Bairro</Text>
                    <TextInput
                        value=""
                        placeholder="teste"
                        style={[styles.textInput, { minWidth: 140, maxWidth: 140 }]}
                    />
                </View>
            </View>

            <View style={styles.twoOption}>
                <View>
                    <Text style={styles.title}>Cidade</Text>
                    <TextInput
                        value=""
                        placeholder="teste"
                        style={[styles.textInput, { minWidth: 290, maxWidth: 290 }]}
                    />
                </View>
                <View>
                    <Text style={styles.title}>Estado</Text>
                    <TextInput
                        value=""
                        placeholder="teste"
                        style={[styles.textInput, { minWidth: 70, maxWidth: 70 }]}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

export default Endereco;