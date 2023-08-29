import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import LinearGradient from "react-native-linear-gradient";
import { styles } from "./styles";
import LoadingGif from '../../assets/images/loading/loading.gif'

import { Searchbar } from "react-native-paper";

const Statistics = () => {
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const [userId, setUserId] = useState([])
    const [selectDate, setSelectDate] = useState([])

    useEffect(() => {
        setLoading(false)
   //     getUserId()
    }, [])
    return (
        <LinearGradient colors={['#ffffff', '#fafafa']} style={styles.container}>
            {loading &&
                <View style={styles.loading}>
                    <FastImage
                        style={{ height: 200, width: 200 }}
                        source={LoadingGif}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                    <Text style={styles.loadingText}>Carregando</Text>
                </View>
            }
            {!loading &&
                <View style={styles.body}>
                    <Searchbar
                        placeholder="Pesquisar"
                        style={styles.searchbarStyle}
                        elevation={0}
                        iconColor={'#131313'}
                    />
                </View>
            }
        </LinearGradient>
    )
}

export default Statistics;
