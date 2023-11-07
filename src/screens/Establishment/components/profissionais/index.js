import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity, ActivityIndicator, Image, ScrollView, RefreshControl } from "react-native";
import { Searchbar } from "react-native-paper";
import callApi from '../../../../server/api'
import AwesomeAlert from "react-native-awesome-alerts";

import AntDesign from "react-native-vector-icons/AntDesign";

const Profissionais = (props) => {
    const [emailUser, setEmailUser] = useState('')
    const [showAlert, setShowAlert] = useState({
        show: false,
        title: '',
        message: '',
        showCancelB: false,
        showConfirmB: false,
        cancelText: '',
        confirmText: '',
        option: false
    })
    const [selectUser, setSelectUser] = useState({})
    const [estab, setEstab] = useState({})
    const [listFunc, setListFunc] = useState([])
    const [barber, setBarber] = useState([])
    const [refreshing, setRefreshing] = useState(false);

    const searchUser = () => {
        try {
            var config = {
                method: 'post',
                url: '/EstabFunc/findFuncionarioEmail',
                data: {
                    Email: emailUser
                }
            };
            callApi(config)
                .then(function (response) {
                    if (response.status == 200) {
                        setListFunc(response.data.query)
                    }
                })
                .catch(function (error) {
                    Alert.alert('Erro', `${error}`)
                });
        } catch (err) {
            console.log('[ERROR]', err)
        }
    }

    const getBarber = async () => {
        setBarber([])
        try {
            var config = {
                method: 'post',
                url: 'EstabFunc/funcEstabelecimento',
                data: {
                    IdEstabelecimento: props.establishment.IdEstabelecimento
                }
            };
            callApi(config)
                .then(function (response) {
                    if (response.status == 200) {
                        setBarber(response.data.query)
                    }
                })
                .catch(function (error) {
                    console.log('[error]', error)
                })
        } catch (err) {
            console.log('[ERROR]', err)
        }
    }

    const selectUserPress = (user) => {
        setSelectUser(user)
        setShowAlert({
            show: true,
            title: 'Aviso',
            message: `Você realmente deseja vincular o(a) ${user.Nome} ao seu estabelecimento`,
            showCancelB: true,
            showConfirmB: true,
            cancelText: 'Não quero vincular',
            confirmText: 'Sim, quero vincular',
            option: true
        })
    }

    const vinculeUser = () => {
        setShowAlert({
            show: true,
            title: 'Aguarde',
            message: (<ActivityIndicator size={30} color={'#36cbc5'} />),
            showCancelB: false,
            showConfirmB: false,
            cancelText: '',
            confirmText: '',
            option: false
        })
        try {
            var config = {
                method: 'post',
                url: '/EstabFunc/vinculaFunc',
                data: {
                    IdFuncionario: selectUser.IdFuncionario,
                    IdEstabelecimento: estab.IdEstabelecimento
                }
            };
            callApi(config)
                .then(function (response) {
                    if (response.status == 200) {
                        setShowAlert({
                            show: true,
                            title: 'Sucesso!',
                            message: `${response.data.msg}`,
                            showCancelB: false,
                            showConfirmB: true,
                            cancelText: '',
                            confirmText: `Vlw`,
                            option: false
                        })
                        setListFunc([])
                    }
                })
                .catch(function (error) {
                    setShowAlert({
                        show: true,
                        title: 'Ops!',
                        message: `Ocorreu um erro ao vincular o funcionário ao seu estabelecimento, por favor tente novamente`,
                        showCancelB: true,
                        showConfirmB: false,
                        cancelText: 'Tentar novamente',
                        confirmText: ``,
                        option: false
                    })
                });
        } catch (err) {
            console.log('[ERROR]', err)
        }
    }

    const removeBarber = (barber) => {
        console.log(barber, props.establishment.IdEstabelecimento)


        getBarber()
    }

    const handleRefresh = () => {
        getBarber()
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    useEffect(() => {
        setEstab(props.establishment)
        getBarber()
    }, [props.establishment])

    return (
        <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
            <View style={styles.barberContainer}>
                {barber.map((result, index) => (
                    <View style={{ marginHorizontal: 10 }} key={index} onPress={() => null}>
                        <View style={{ alignItems: 'center' }}>
                            <Image
                                source={{ uri: result.Foto != null ? result.Foto : 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745' }}
                                resizeMode="contain"
                                style={styles.barberImage}
                            />
                            <Text style={styles.barberText}>{String(result.Nome).match(/\S+/)}</Text>
                            <TouchableOpacity onPress={() => removeBarber(result)} style={{ position: 'absolute', right: 0 }}>
                                <AntDesign
                                    name="close"
                                    size={20}
                                    style={{
                                        backgroundColor: '#ff1e1f',
                                        borderRadius: 100,
                                        padding: 1,
                                    }}
                                    color={'#fff'}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </View>
            <Text style={styles.titleText}>Vincule um funcionário a sua empresa inserindo seu E-mail:</Text>
            <Searchbar
                placeholder="Procurar"
                onChangeText={setEmailUser}
                value={emailUser}
                onIconPress={() => searchUser()}
                onClearIconPress={() => setEmailUser('')}
                style={{ marginHorizontal: 10, marginVertical: 10, borderRadius: 100 }}
            />

            {listFunc.map((res, index) => (
                <TouchableOpacity onPress={() => selectUserPress(res)} style={styles.textUsersContainer} key={index}>
                    <Text style={styles.textUsers}>{res?.Nome}</Text>
                </TouchableOpacity>
            ))}

            <AwesomeAlert
                show={showAlert.show}
                title={showAlert.title}
                message={showAlert?.message}
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                showCancelButton={showAlert.showCancelB}
                showConfirmButton={showAlert.showConfirmB}
                cancelText={showAlert.cancelText}
                confirmText={showAlert.confirmText}
                confirmButtonColor="#52cb5f"
                cancelButtonColor="#DD6B55"
                onCancelPressed={() => {
                    setShowAlert(false)
                }}
                onConfirmPressed={() => {
                    if (showAlert.option) {
                        vinculeUser()
                    } else {
                        setShowAlert(false)
                    }
                }}
            />
        </ScrollView>

    )
}

export default Profissionais;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 30
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

    textUsersContainer: {
        marginTop: 20,
        marginHorizontal: 20,
    },

    textUsers: {
        fontSize: 15,
        color: '#fff',
        fontFamily: 'Quicksand-Regular',
        textAlign: 'center',
        marginBottom: 10,
        backgroundColor: '#000000c1',
        paddingVertical: 10,
        borderRadius: 10
    },

    barberContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 20
    },

    barberImage: {
        width: 50,
        height: 50,
        borderRadius: 100,
        marginHorizontal: 10,
        marginVertical: 5
    },

    barberText: {
        color: '#000',
        fontSize: 15,
        fontFamily: 'Quicksand-SemiBold',
    },
})