import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, StatusBar } from "react-native";
import { styles } from "./styles";
import LinearGradient from "react-native-linear-gradient";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import Fotos from '../../assets/images/home/index'
import Estab from '../../assets/images/teste/teste.jpg'

const Home = () => {

    const lojas = [{ name: 'Teste1', foto: Estab }, { name: 'Teste2', foto: Estab }, { name: 'Teste3', foto: Estab }]

    return (
        <ScrollView style={styles.Container}>

            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />

            <LinearGradient colors={['#4f076a', '#6d0b8f', '#6d0b8f']}>
                <View style={styles.userContent}>
                    <TouchableOpacity>
                        <FontAwesome name="user" size={40} color="#7f7f7f" style={styles.userPhoto} />
                    </TouchableOpacity>
                    <View style={styles.userTextContent}>
                        <Text style={styles.userTextTitle}>Ola!</Text>
                        <Text style={styles.userText}>Usuário</Text>
                    </View>
                </View>

                <LinearGradient colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.2)']} style={styles.optionContainer}>
                    <ScrollView horizontal={true}>
                        <TouchableOpacity style={styles.touchOptions}>
                            <Image source={Fotos.p4} resizeMode='contain' style={styles.logoImage} />
                            <Text style={styles.optionText}>Barba</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.touchOptions}>
                            <Image source={Fotos.p2} resizeMode='contain' style={styles.logoImage} />
                            <Text style={styles.optionText}>Cabelo masc.</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.touchOptions}>
                            <Image source={Fotos.p3} resizeMode='contain' style={styles.logoImage} />
                            <Text style={styles.optionText}>Cabelo fem.</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.touchOptions}>
                            <Image source={Fotos.p1} resizeMode='contain' style={styles.logoImage} />
                            <Text style={styles.optionText}>Unha</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.touchOptions}>
                            <Image source={Fotos.p5} resizeMode='contain' style={styles.logoImage} />
                            <Text style={styles.optionText}>Sombrancelha</Text>
                        </TouchableOpacity>
                    </ScrollView>

                </LinearGradient>

                <ScrollView style={styles.bodyContainer}>
                    <Text style={styles.textBody}>Alguns Estabelicementos ;)</Text>

                    <ScrollView horizontal={true}>
                        {lojas.map((result) =>
                            <>
                                <TouchableOpacity style={styles.storeTouch}>
                                    <Image source={result.foto} resizeMode='cover' style={styles.storeImage} />
                                    <Text style={styles.textImage}>{result.name}</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </ScrollView>

                    <Text style={styles.textBody}>Recomendados</Text>

                    <ScrollView horizontal={true}>
                        {lojas.map((result) =>
                            <>
                                <TouchableOpacity style={styles.storeTouch}>
                                    <Image source={result.foto} resizeMode='cover' style={styles.storeImage} />
                                    <Text style={styles.textImage}>{result.name}</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </ScrollView>
                </ScrollView>
            </LinearGradient>
        </ScrollView>
    )
}

export default Home;