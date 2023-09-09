import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";

import Entypo from "react-native-vector-icons/Entypo";

const Services = (props) => {
    const [services, setServices] = useState(null)
    const consumiveis = ['Cerveja', 'Coca-cola', 'Suco', 'Bolacha']
    const comodidades = ['Wifi', 'Cinuca', 'TV']

    const selectService = (result) => {
        console.log(result)
        props.select(result.IdTipoServico, result.NomeServico, result.Valor)
    }

    useEffect(() => {
        setServices(props.data.query)
    },[props.data])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Serviços</Text>

            {services && services.map((result, index) =>
                <View key={index} style={styles.optionsContainer}>
                    <Text style={styles.textOptions}>{result.NomeServico}</Text>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.textOptions}>{`R$ ${result.Valor}`}</Text>
                        <TouchableOpacity style={styles.plusButton} onPress={() => selectService(result)}>
                            <Entypo style={styles.plusIcon} name={props.selectService?.includes(`${result.IdTipoServico}`) ? "check" : "plus"} size={20} color={'#fff'} />
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            <Text style={styles.title}>Consumivéis</Text>

            {consumiveis.map((result, index) =>
                <View key={index} style={styles.optionsContainer}>
                    <Text style={styles.textOptions}>{result}</Text>

                    <View style={{ alignItems: 'center', }}>
                        <Text style={[styles.textOptions, { marginVertical: 10 }]}>R$0,00</Text>
                    </View>
                </View>
            )}

            <Text style={styles.title}>Comodidades</Text>

            {comodidades.map((result, index) =>
                <View key={index} style={styles.optionsContainer}>
                    <Text style={styles.textOptions}>{result}</Text>

                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.textOptions}></Text>
                        <Text style={styles.textOptions}></Text>
                    </View>
                </View>
            )}
        </View>
    )
}

export default Services;