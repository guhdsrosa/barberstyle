import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import CalendarModal from "./components/calendar";
import { useNavigation } from "@react-navigation/native";
import callApi from '../../server/api'

import AntDesign from "react-native-vector-icons/AntDesign";
import styles from "./styles";

const Schedule = ({ route }) => {
    const { selectService, IdUsuario, IdEstabelecimento } = route?.params
    const navigation = useNavigation()
    const [selectBarber, setSelectBarber] = useState(null)
    const [barber, setBarber] = useState(null)
    const [loading, setLoading] = useState(false)

    console.log('selectService:', selectService, 'IdUsuario:', IdUsuario, 'IdEstabelecimento:', IdEstabelecimento)

    const getBarber = async () => {
        try {
            var config = {
                method: 'post',
                url: 'EstabFunc/funcEstabelecimento',
                data: {
                    IdEstabelecimento: IdEstabelecimento
                }
            };
            callApi(config)
                .then(function (response) {
                    if (response.status == 200) {
                        console.log(response.data)
                        setBarber(response.data.query)
                        setLoading(true)
                    }
                })
                .catch(function (error) {
                    console.log('[error]', error)
                })
        } catch (err) {
            console.log('[ERROR]', err)
        }
    }

    const selectBarberPress = (item) => {
        console.log(item)
        setSelectBarber(item)
    }

    useEffect(() => {
        if (IdEstabelecimento)
            getBarber()
    }, [IdEstabelecimento])

    return (
        <>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <AntDesign name="left" size={30} color={'#fff'} style={{ marginRight: 3, marginVertical: 1, marginLeft: -1 }} />
            </TouchableOpacity>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={styles.titleText}>Selecione o barbeiro de sua preferencia:</Text>
                {loading ?
                    <View style={styles.container}>
                        <View style={styles.barberContainer}>
                            {barber.map((result, index) => (
                                <TouchableOpacity key={index} onPress={() => selectBarberPress(result)}>
                                    <View style={{ alignItems: 'center' }}>
                                        <Image
                                            //source={{ uri: result.Foto }}
                                            source={{ uri: 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745' }}
                                            resizeMode="contain"
                                            style={styles.barberImage}
                                        />
                                        <Text style={styles.barberText}>{String(result.Nome).match(/\S+/)}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                    :
                    <ActivityIndicator
                        size={30}
                        color={'#181818'}
                    />
                }

                {selectBarber && <CalendarModal />}
            </View>
        </>
    )
}

export default Schedule;