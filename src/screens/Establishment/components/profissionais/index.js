import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Searchbar } from "react-native-paper";
import callApi from '../../../../server/api'

import AntDesign from "react-native-vector-icons/AntDesign";

const Profissionais = () => {
    const [emailUser, setEmailUser] = useState('')

    const optionSelect = ({ opt }) => {
        setOption(opt)
    }

    const searchUser = () => {
        try {
            var config = {
                method: 'post',
                url: '/EstabFunc/vinculaFunc',
                data: {
                    Email: emailUser
                }
            };
            callApi(config)
                .then(function (response) {
                    if (response.status == 200) {
                        console.log(response.data)
                    }
                })
                .catch(function (error) {
                    Alert.alert('Erro', `${error}`)
                });
        } catch (err) {
            console.log('[ERROR]', err)
        }
    }

    useEffect(() => {
        
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Vincule um funcionário a sua empresa inserindo seu E-mail:</Text>
            <Searchbar
                placeholder="Procurar"
                onChangeText={setEmailUser}
                value={emailUser}
                onIconPress={() => searchUser()}
                onClearIconPress={() => setEmailUser('')}
            />
        </View>
    )
}

export default Profissionais;

const styles = StyleSheet.create({
    container: {
        marginVertical: 30
    },

    titleText: {
        color: '#181818',
        fontSize: 16,
        textAlign: 'center'
    },

    searchbarStyle: {
        borderRadius: 50,
        backgroundColor: '#f2f2f2',
        borderWidth: 1,
        borderColor: '#181818',
        marginVertical: 30
    },
})