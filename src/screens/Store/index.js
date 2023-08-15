import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";
import AntDesign from "react-native-vector-icons/AntDesign";

//components
import Services from "./components/services";
import Endereco from "./components/endereco";
import Sobre from "./components/sobre";
import CalendarModal from "./components/calendar";

const Store = ({ route }) => {

    const navigation = useNavigation();
    const [option, setOption] = useState('services')
    const { foto, name } = route.params

    const optionSelect = ({ option }) => {
        setOption(option)
    }

    const reservationPress = () => {
        setOption('reservation')
    }

    console.log(option)

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <AntDesign name="left" size={30} color={'#fff'} style={{ marginRight: 3, marginVertical: 1, marginLeft: -1 }} />
                </TouchableOpacity>

                <Image
                    source={{ uri: foto }}
                    style={styles.storePhoto}
                    resizeMode='cover'
                    blurRadius={0}
                />
                <Text style={styles.storeName}>{name}</Text>
            </View>

            {option === 'reservation' ?
                <CalendarModal/>
                :
                <View style={styles.body}>
                    <View style={styles.options}>
                        <TouchableOpacity onPress={() => optionSelect({ option: 'services' })}>
                            <Text style={styles.optionsText}>Serviços</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => optionSelect({ option: 'address' })}>
                            <Text style={styles.optionsText}>Endereço</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => optionSelect({ option: 'more' })}>
                            <Text style={styles.optionsText}>Sobre</Text>
                        </TouchableOpacity>
                    </View>

                    {option == 'services' && <Services />}
                    {option == 'address' && <Endereco />}
                    {option == 'more' && <Sobre />}
                </View>
            }

            <View style={styles.bottomConfirm}>
                <TouchableOpacity style={styles.confirmButton} onPress={() => reservationPress()}>
                    <Text style={styles.textButton}>Reservar Horário</Text>
                </TouchableOpacity>
                <Text style={styles.textPrice}>Total: R$0,00</Text>
            </View>
        </ScrollView>
    )
}

export default Store