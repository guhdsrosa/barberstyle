import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, Alert, Image, TouchableOpacity } from "react-native";
import callApi from '../../server/api'
import LoadingGif from '../../assets/images/loading/loading.gif'
import FastImage from "react-native-fast-image";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";

import { styles } from "./styles";

import { Searchbar } from "react-native-paper";

const Explore = () => {
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const [establishment, setEstablishment] = useState([])

    console.log(establishment)

    const getAllEstablishment = async () => {
        setLoading(true)
        try {
            var config = {
                method: 'get',
                url: 'Estabelecimento/findAll',
            }

            callApi(config)
                .then(function (response) {
                    if (response.status == 200) {
                        setLoading(false)
                        setEstablishment(response.data)
                    } else {
                        setLoading(false)
                        Alert.alert('Erro', 'Erro ao carregar os estabelecimento')
                    }
                    //console.log(response)
                })
                .catch(function (error) {
                    setLoading(false)
                    Alert.alert('Erro', 'Erro ao carregar os estabelecimento')
                    console.log('[error]', error)
                });
        } catch (err) {
            console.log('[error]', err)
            setLoading(false)
            Alert.alert('Erro', 'Erro ao carregar os estabelecimento')
        }
    }

    useEffect(() => {
        getAllEstablishment()
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
                        //onChangeText={onChangeSearch}
                        //value={searchQuery}
                        style={styles.searchbarStyle}
                        elevation={0}
                        iconColor={'#131313'}
                    />

                    <ScrollView>
                        {establishment.map((result) =>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Store', {
                                    foto: `${result.Foto}`,
                                    name: `${result.NomeEstabelecimento}`
                                })}
                                style={styles.establishmentContent}
                            >
                                <FastImage
                                    style={styles.establishmentPhoto}
                                    source={{ uri: 'https://graces.com.br/wp-content/uploads/2019/02/o-que-nao-pode-faltar-na-sua-barbearia-equipamentos.jpg' }}
                                    resizeMode={FastImage.resizeMode.cover}
                                />

                                <View style={styles.addressContent}>
                                    {/*<Text>{result.Foto}</Text>*/}
                                    <Text style={styles.establishmentTitle}>{result.NomeEstabelecimento}</Text>
                                    <View style={styles.addressStore}>
                                        <Text style={styles.establishmenAdress}>{result.Rua}</Text>
                                        {result.Cidade ? <Text style={styles.establishmenAdress}>{`${result.Cidade} - ${result.Bairro}`}</Text> : <Text></Text>}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    </ScrollView>
                </View>
            }
        </LinearGradient>
    )
}

export default Explore;

/**
    "Bairro":"Pinheirinho",
      "CEP":"37130-000",
      "CNPJ":"123456",
      "Cidade":null,
      "Estado":"Minas Gerais",
      "IdEstabelecimento":1,
      "NomeEstabelecimento":"Barbearia Pinheirinho",
      "NumeroEstabelecimento":"330",
      "RedeSocial":"não temos",
      "Rua":"Rua JoseFina Sales Rei",
      "SobreNos":"Uma barbearia top demais",
      "Telefone1":"35984295765",
      "Telefone2":null,
      "createdAt":"2023-03-07T00:52:07.079Z",
 */