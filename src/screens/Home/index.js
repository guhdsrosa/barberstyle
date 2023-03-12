import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { styles } from "./styles";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Searchbar } from "react-native-paper";

import AntDesign from "react-native-vector-icons/AntDesign";
import Fotos from '../../assets/images/home/index'

import callApi from '../../server/api'

const Home = ({ route }) => {

    const navigation = useNavigation()
    const [teste, setTest] = useState();
    const [user, setUser] = useState({});

    console.log(user)

    const perfilPress = () => {
        navigation.navigate('Perfil')
    }

    const lojas = [
        { name: 'Barbearia Alfred', foto: 'https://graces.com.br/wp-content/uploads/2019/02/o-que-nao-pode-faltar-na-sua-barbearia-equipamentos.jpg' },
        { name: 'Barbearia Lesley', foto: 'https://i0.wp.com/blog.iluminim.com.br/wp-content/uploads/2021/01/capa-post-iluminacao-para-barbearia-scaled.jpg' },
        { name: 'Barbearia Joe', foto: 'https://graces.com.br/wp-content/uploads/2019/02/o-que-nao-pode-faltar-na-sua-barbearia-equipamentos.jpg' },
        { name: 'Barbearia Charles', foto: 'https://i0.wp.com/blog.iluminim.com.br/wp-content/uploads/2021/01/capa-post-iluminacao-para-barbearia-scaled.jpg' },
        { name: 'Barbearia Hobert', foto: 'https://graces.com.br/wp-content/uploads/2019/02/o-que-nao-pode-faltar-na-sua-barbearia-equipamentos.jpg' },
    ]

    const userGet = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('userInfo')
            const params = JSON.parse(jsonValue)
            console.log(params)
            setUser(params)
        } catch (e) {
            // error reading value
        }
    }

    useEffect(() => {
        userGet()
    }, [])

    return (
        <LinearGradient colors={['#11dbc5', '#10aada']} style={styles.container}>
            <ScrollView>
                <View style={styles.menuContent}>
                    <View style={styles.userContent}>
                        <TouchableOpacity onPress={perfilPress}>
                            <Image
                                source={{ uri: 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745' }}
                                style={styles.userLogo}
                                resizeMode={'contain'}
                            />
                        </TouchableOpacity>

                        <View style={styles.userTextContent}>
                            <Text style={styles.userHello}>Olá!{'\n'}<Text style={styles.userName}>{user.Nome}</Text></Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.filterHeader}>
                        <Image
                            source={Fotos.hamb}
                            resizeMode={'contain'}
                            style={styles.filterLogo}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.header}>
                    <Text style={styles.titleText}>Bem vindo,{'\n'}qual serviço deseja procurar hoje?</Text>
                </View>

                <Searchbar
                    placeholder="Pesquisar"
                    //onChangeText={onChangeSearch}
                    //value={searchQuery}
                    style={styles.searchbarStyle}
                    elevation={0}
                    iconColor={'#0da697'}
                />

                <View style={styles.body}>
                    <View style={styles.bodyContent}>
                        <Text style={styles.titleText}>Recomendados</Text>
                        <TouchableOpacity style={styles.seeAllContent} onPress={() => navigation.navigate('Explore')}>
                            <Text style={[styles.titleText, { fontSize: 15 }]}>Ver mais</Text>
                            <AntDesign name="right" size={15} style={styles.seeAllIcon} color={'#fff'} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView horizontal={true}>
                        {lojas.map((result) =>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Store', {
                                    foto: `${result.foto}`,
                                    name: `${result.name}`
                                })}
                                style={styles.touchStore}
                            >
                                <Image
                                    source={{ uri: `${result.foto}` }}
                                    style={styles.storeImage}
                                    resizeMode='cover'
                                />

                                <View style={styles.textContent}>
                                    <Text style={styles.textStore}>{result.name}</Text>
                                    <Text style={styles.descriptionStore}>Alfenas-MG</Text>
                                    <View>
                                        <AntDesign name="star" size={15} style={styles.seeAllIcon} color={'#ffc500'} />
                                        <Text style={styles.descriptionStore}>5.5</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    </ScrollView>
                </View>
            </ScrollView>
        </LinearGradient>
    )
}

export default Home;