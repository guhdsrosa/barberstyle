import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";

import Entypo from "react-native-vector-icons/Entypo";

const Services = () => {

    const services = ['Corte', 'Degradê', 'Barba', 'Sombrancelha']
    const consumiveis = ['Cerveja', 'Coca-cola', 'Suco', 'Bolacha']
    const comodidades = ['Wifi', 'Cinuca', 'TV']

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Serviços</Text>

            {services.map((result) =>
                <View style={styles.optionsContainer}>
                    <Text style={styles.textOptions}>{result}</Text>

                    <View style={{alignItems: 'center'}}>
                        <Text style={styles.textOptions}>R$0,00</Text>
                        <TouchableOpacity style={styles.plusButton}>
                            <Entypo style={styles.plusIcon} name="plus" size={20} color={'#fff'} />
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            <Text style={styles.title}>Consumivéis</Text>

            {consumiveis.map((result) =>
                <View style={styles.optionsContainer}>
                    <Text style={styles.textOptions}>{result}</Text>

                    <View style={{alignItems: 'center'}}>
                        <Text style={styles.textOptions}>R$0,00</Text>
                        <TouchableOpacity style={styles.plusButton}>
                            <Entypo style={styles.plusIcon} name="plus" size={20} color={'#fff'} />
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            <Text style={styles.title}>Comodidades</Text>

            {comodidades.map((result) =>
                <View style={styles.optionsContainer}>
                    <Text style={styles.textOptions}>{result}</Text>

                    <View style={{alignItems: 'center'}}>
                        <Text style={styles.textOptions}></Text>
                        <Text style={styles.textOptions}></Text>
                    </View>
                </View>
            )}
        </View>
    )
}

export default Services;