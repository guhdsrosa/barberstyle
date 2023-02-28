import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import AntDesign from "react-native-vector-icons/AntDesign";

const Store = () => {
    return(
        <View>
            <TouchableOpacity>
                <AntDesign name="left" size={25}/>
            </TouchableOpacity>
            <Text>Teste tela</Text>
            <Image />
        </View>
    )
}

export default Store