import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";

import Entypo from "react-native-vector-icons/Entypo";

const Services = (props) => {
    const [services, setServices] = useState(null)
    const selectService = (result) => {
        console.log(result)
        props.select(result.IdTipoServico, result.NomeServico, result.Valor)
    }

    useEffect(() => {
        setServices(props.data.query)
    }, [props.data])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Serviços</Text>

            {services && services.map((result, index) =>
                <View key={index} style={styles.optionsContainer}>
                    <Text style={styles.textOptions}>{result.NomeServico}</Text>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.textOptions}>{`${result.Valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}</Text>
                        <TouchableOpacity style={styles.plusButton} onPress={() => selectService(result)}>
                            <Entypo style={styles.plusIcon} name={props.selectService?.includes(`${result.IdTipoServico}`) ? "check" : "plus"} size={20} color={'#fff'} />
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            <Text style={styles.title}>Consumivéis</Text>

            {props.consumiveis.map((result, index) =>
                <View key={index} style={[styles.optionsContainer, { paddingVertical: 10 }]}>
                    <Text style={styles.textOptions}>{result.NomeConsumiveis}</Text>

                    <View style={{ alignItems: 'center', }}>
                        <Text style={[styles.textOptions, { marginVertical: 10 }]}>{result.Valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
                    </View>
                </View>
            )}

            <Text style={styles.title}>Comodidades</Text>

            {props.comodidades.map((result, index) =>
                <View key={index} style={[styles.optionsContainer, { paddingVertical: 10 }]}>
                    <Text style={styles.textOptions}>{result.NomeComodidade}</Text>

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