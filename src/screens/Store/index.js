import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";
import AntDesign from "react-native-vector-icons/AntDesign";

const Store = ({ route }) => {

    const navigation = useNavigation();
    const { foto, name } = route.params

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <AntDesign name="left" size={30} color={'#12dbc5'} />
                </TouchableOpacity>
                <Image
                    source={{ uri: foto }}
                    style={styles.storePhoto}
                    resizeMode='cover'
                    blurRadius={10}
                />
                <Text style={styles.storeName}>{name}</Text>
            </View>

            <View>
                <TouchableOpacity>
                    <Text>Serviços</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text>Endereço</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text>Sobre</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default Store