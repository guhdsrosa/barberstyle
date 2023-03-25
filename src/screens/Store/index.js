import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";
import AntDesign from "react-native-vector-icons/AntDesign";

//components
import Services from "./components/services";

const Store = ({ route }) => {

    const navigation = useNavigation();
    const { foto, name } = route.params

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

            <View style={styles.body}>
                <View style={styles.options}>
                    <TouchableOpacity>
                        <Text style={styles.optionsText}>Serviços</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text style={styles.optionsText}>Endereço</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text style={styles.optionsText}>Sobre</Text>
                    </TouchableOpacity>
                </View>

                <Services />
            </View>

            <View style={styles.bottomConfirm}>
                <TouchableOpacity style={styles.confirmButton}>
                    <Text style={styles.textButton}>Reservar Horário</Text>
                </TouchableOpacity>
                <Text style={styles.textPrice}>Total: R$0,00</Text>
            </View>
        </ScrollView>
    )
}

export default Store