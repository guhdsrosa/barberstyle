import React, { useEffect, useState } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native";
import callApi from '../../../../server/api'

const Geral = (props) => {
    const [loading, setLoading] = useState(true)
    const [option, setOption] = useState('services')

    //services
    const [services, setServices] = useState([])
    const consumiveis = ['Cerveja', 'Coca-cola', 'Suco', 'Bolacha']
    const comodidades = ['Wifi', 'Cinuca', 'TV']

    const serviceEstab = async () => {
        try {
            var config = {
                method: 'post',
                url: 'Servico/findServicoEstab',
                data: {
                    IdEstabelecimento: props.establishment.IdEstabelecimento
                }
            };
            callApi(config)
                .then(function (response) {
                    if (response.status == 200) {
                        setServices(response.data)
                        console.log(response.data)
                    }
                })
                .catch(function (error) {
                    console.log('[errors]', error)
                    setAlert(true)
                })
        } catch (err) {
            console.log('[ERROR]', err)
        }
    }

    useEffect(() => {
        serviceEstab()
    },[])

    useEffect(() => {
        if (props.establishment)
            setLoading(false)
    }, [props.establishment])

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Image
                        source={{ uri: 'https://img.freepik.com/fotos-premium/espaco-masculino-interior-de-barbearia-moderna-gerado-por-ia_866663-5580.jpg' }}
                        //source={{ uri: data?.FotoEstabelecimento }}
                        style={styles.storePhoto}
                        resizeMode='cover'
                        blurRadius={0}
                    />
                    <Text style={styles.storeName}>{props?.establishment?.NomeEstabelecimento}</Text>
                </View>

                <View style={styles.body}>
                    <View style={styles.options}>
                        <TouchableOpacity onPress={() => setOption('services')}>
                            <Text style={[styles.optionsText, { color: option === 'services' ? '#12dbc5' : '#181818' }]}>Serviços</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setOption('address')}>
                            <Text style={[styles.optionsText, { color: option === 'address' ? '#12dbc5' : '#181818' }]}>Endereço</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setOption('more')}>
                            <Text style={[styles.optionsText, { color: option === 'more' ? '#12dbc5' : '#181818' }]}>Sobre</Text>
                        </TouchableOpacity>
                    </View>

                    {option == 'services' &&
                        <View style={styles.cardServiceContainer}>
                            <Text style={styles.title}>Cortes:</Text>
                            {services && services.query.map((result, index) =>
                                <View style={styles.cardContent} key={index}>
                                    <Text style={styles.text}>{result.NomeServico}</Text>
                                    <TextInput value={`R$${result.Valor}`} />
                                </View>
                            )}
                            <TouchableOpacity>
                            <Text style={[styles.text, styles.buttomAdd]}>Adicionar Novo</Text>
                            </TouchableOpacity>

                            <Text style={styles.title}>Consumivéis:</Text>
                            {consumiveis.map((result, index) =>
                                <View style={styles.cardContent} key={index}>
                                    <Text style={styles.text}>{result}</Text>
                                    <TextInput value="R$0,00" />
                                </View>
                            )}
                            <TouchableOpacity>
                                <Text style={[styles.text, styles.buttomAdd]}>Adicionar Novo</Text>
                            </TouchableOpacity>

                            <Text style={styles.title}>Comodidades:</Text>
                            {comodidades.map((result, index) =>
                                <View style={styles.cardContent} key={index}>
                                    <Text style={styles.text}>{result}</Text>
                                </View>
                            )}
                            <TouchableOpacity>
                            <Text style={[styles.text, styles.buttomAdd]}>Adicionar Novo</Text>
                            </TouchableOpacity>
                        </View>
                    }

                    {option == 'address' &&
                        <View>
                            <Text style={styles.text}>Rua</Text>
                            <Text style={styles.text}>Número:</Text>
                            <Text style={styles.text}>CEP:</Text>
                            <Text style={styles.text}>Bairro:</Text>
                            <Text style={styles.text}>Cidade:</Text>
                        </View>
                    }

                    {option == 'more' &&
                        <View>
                            <Text style={styles.text}>Sobre:</Text>
                            <Text style={styles.text}>Rede Social:</Text>
                            <Text style={styles.text}>Telefone:</Text>
                            <Text style={styles.text}>Telefone:</Text>
                            <Text style={styles.text}>CNPJ:</Text>
                        </View>
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default Geral;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },

    header: {
        minHeight: 50
    },

    storePhoto: {
        width: '100%',
        height: 305,
    },

    storeName: {
        color: '#000',
        alignSelf: 'flex-start',
        fontSize: 30,
        fontFamily: 'Quicksand-Regular',
        marginHorizontal: 15,
        marginVertical: 10
    },

    body: {
        marginHorizontal: 15
    },

    options: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

    optionsText: {
        fontSize: 16,
        //color: '#000',
        fontFamily: 'Quicksand-SemiBold',
    },

    //services
    cardServiceContainer: {
        paddingVertical: 10
    },

    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#181818',
        marginVertical: 10
    },

    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        alignItems: 'center'
    },



    buttomAdd: {
        textAlign: 'center',
        backgroundColor: '#29ddc9',
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 10
    },

    text: {
        color: '#181818'
    },
})

// <View>
//     {!loading &&
//         <>
//             <TextInput
//                 style={styles.inputText}
//                 placeholder={'Nome do Estabelecimento*'}
//                 value={props.establishment.NomeEstabelecimento}
//             />
//             <TextInput
//                 style={styles.inputText}
//                 placeholder={'CEP*'}
//                 value={props.establishment.CEP}
//             />
//             <TextInput
//                 style={styles.inputText}
//                 placeholder={'Rua*'}
//                 value={props.establishment.Rua}
//             />
//             <TextInput
//                 style={styles.inputText}
//                 placeholder={'Bairro*'}
//                 value={props.establishment.Bairro}
//             />
//             <TextInput
//                 style={styles.inputText}
//                 placeholder={'Estado*'}
//                 value={props.establishment.Estado}
//             />
//             <TextInput
//                 style={styles.inputText}
//                 placeholder={'Número*'}
//                 value={props.establishment.NumeroEstabelecimento}
//             />
//             <TextInput
//                 style={styles.inputText}
//                 placeholder={'CNPJ'}
//                 value={props.establishment.CNPJ}
//             />
//             <TextInput
//                 style={styles.inputText}
//                 placeholder={'Telefone'}
//                 value={props.establishment.Telefone1}
//             />
//             <TextInput
//                 style={styles.inputText}
//                 placeholder={'Telefone'}
//                 value={props.establishment.Telefone2}
//             />
//             <TextInput
//                 style={styles.inputText}
//                 placeholder={'Sobre nós'}
//                 value={props.establishment.SobreNos}
//             />
//         </>
//     }
// </View>