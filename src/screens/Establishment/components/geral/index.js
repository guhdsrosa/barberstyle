import React, { useEffect, useState } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Image, Modal, Alert } from "react-native";

import callApi from '../../../../server/api'

import styles from "./styles";

const Geral = (props) => {
    const [option, setOption] = useState('services')
    const [modal, setModal] = useState({
        ativo: false,
        titulo: '',
        nome: '',
        valor: '',
        nomeBotao: ''
    })
    const [modalMod, setModalMod] = useState({
        ativo: false,
        titulo: '',
        nome: '',
        valor: '',
        nomeBotao: ''
    })

    //services
    const [services, setServices] = useState(null)
    const [consumiveis, setConsumiveis] = useState(null)
    const [comodidades, setComodidades] = useState(null)
    const [novoItemNome, setNovoItemNome] = useState('')
    const [novoItemPreco, setNovoItemPreco] = useState('')
    const [addOption, setAddOption] = useState()

    const serviceEstab = () => {
        setServices(null)
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
                    }
                })
                .catch(function (error) {
                    console.log('[errors]', error)
                })
        } catch (err) {
            console.log('[ERROR]', err)
        }
    }

    const consumiveisEstab = () => {
        setConsumiveis(null)
        try {
            var config = {
                method: 'post',
                url: '/Consumiveis/findAll',
                data: {
                    IdEstabelecimento: props.establishment.IdEstabelecimento
                }
            };
            callApi(config)
                .then(function (response) {
                    if (response.status == 200) {
                        setConsumiveis(response.data.find)
                    }
                })
                .catch(function (error) {
                    console.log('[errors]', error)
                })
        } catch (err) {
            console.log('[ERROR]', err)
        }
    }

    const comodidadesEstab = () => {
        setComodidades(null)
        try {
            var config = {
                method: 'post',
                url: '/Comodidades/findAll',
                data: {
                    IdEstabelecimento: props.establishment.IdEstabelecimento
                }
            };
            callApi(config)
                .then(function (response) {
                    if (response.status == 200) {
                        setComodidades(response.data.find)
                    }
                })
                .catch(function (error) {
                    console.log('[errors]', error)
                })
        } catch (err) {
            console.log('[ERROR]', err)
        }
    }

    const addOptionPress = (option) => {
        setAddOption(option)

        if (option === 'corte') {
            setModal({
                ativo: true,
                titulo: 'Adicionar um novo corte',
                nome: 'Nome do corte',
                valor: 'Valor do corte',
                nomeBotao: 'Adicionar'
            })
        }

        if (option === 'consumiveis') {
            setModal({
                ativo: true,
                titulo: 'Adicionar um novo consumivel',
                nome: 'Nome',
                valor: 'Valor do produto',
                nomeBotao: 'Adicionar'
            })
        }

        if (option === 'comodidades') {
            setModal({
                ativo: true,
                titulo: 'Adicionar uma nova comodidade',
                nome: 'Nome',
                valor: 'Valor do produto',
                showValor: false,
                nomeBotao: 'Adicionar'
            })
        }
    }

    const ModifiOptionPress = (option, mod, service) => {
        if (option === 'corte') {
            setModalMod({
                ativo: true,
                titulo: mod === 'editar' ? 'Editar corte' : 'Excluir corte',
                nome: service.NomeServico,
                valor: `${service.Valor}`,
                nomeBotao: mod === 'editar' ? 'Salvar' : 'Excluir',
                editar: true,
                option: option,
                mod: mod,
                IdTipoServico: service.IdTipoServico,
                IdServico: service.IdServico,
            })
        }

        if (option === 'consumiveis') {
            setModalMod({
                ativo: true,
                titulo: mod === 'editar' ? 'Editar consumivel' : 'Excluir consumivel',
                nome: service.NomeConsumiveis,
                valor: `${service.Valor}`,
                nomeBotao: mod === 'editar' ? 'Salvar' : 'Excluir',
                editar: true,
                option: option,
                mod: mod,
                Id: service.Id,
            })
        }

        if (option === 'comodidades') {
            setModalMod({
                ativo: true,
                titulo: mod === 'editar' ? 'Editar comodidade' : 'Excluir comodidade',
                nome: service.NomeComodidade,
                valor: `${service.Valor}`,
                nomeBotao: mod === 'editar' ? 'Salvar' : 'Excluir',
                editar: true,
                option: option,
                mod: mod,
                Id: service.Id,
            })
        }
    }

    const addServicePress = () => {
        if (novoItemNome === '' || novoItemPreco === '' && addOption != 'comodidades') {
            return Alert.alert('Erro', 'Preencha os campos corretamente')
        }

        if (addOption === 'corte') {
            const preco = novoItemPreco.replace(',', '.')

            try {
                var config = {
                    method: 'post',
                    url: '/Servico/Create',
                    data: {
                        NomeServico: novoItemNome,
                        Valor: preco,
                        Foto: null,
                        TempoEstimado: '',
                        IdEstabelecimento: props.establishment.IdEstabelecimento,
                        Ativo: true
                    }
                };
                callApi(config)
                    .then(function (response) {
                        if (response.status == 200) {
                            Alert.alert('Sucesso', response.data.msg)
                            setModal({
                                ativo: false,
                                titulo: '',
                                nome: '',
                                valor: '',
                                nomeBotao: ''
                            })
                            setNovoItemNome('')
                            setNovoItemPreco('')
                        }
                    })
                    .catch(function (error) {
                        Alert.alert('Ocorreu um erro', 'Por favor tente novamente')
                        setModal({
                            ativo: false,
                            titulo: '',
                            nome: '',
                            valor: '',
                            nomeBotao: ''
                        })
                        setNovoItemNome('')
                        setNovoItemPreco('')
                    })
            } catch (err) {
                console.log('[ERROR]', err)
            }
        }

        if (addOption === 'consumiveis') {
            const preco = novoItemPreco.replace(',', '.')

            try {
                var config = {
                    method: 'post',
                    url: '/Consumiveis/Create',
                    data: {
                        Nome: novoItemNome,
                        Valor: preco,
                        IdEstabelecimento: props.establishment.IdEstabelecimento,
                    }
                };
                callApi(config)
                    .then(function (response) {
                        if (response.status == 200) {
                            Alert.alert('Sucesso', response.data.msg)
                            setModal({
                                ativo: false,
                                titulo: '',
                                nome: '',
                                valor: '',
                                nomeBotao: ''
                            })
                            setNovoItemNome('')
                            setNovoItemPreco('')
                        }
                    })
                    .catch(function (error) {
                        Alert.alert('Ocorreu um erro', 'Por favor tente novamente')
                        setModal({
                            ativo: false,
                            titulo: '',
                            nome: '',
                            valor: '',
                            nomeBotao: ''
                        })
                        setNovoItemNome('')
                        setNovoItemPreco('')
                    })
            } catch (err) {
                console.log('[ERROR]', err)
            }
        }

        if (addOption === 'comodidades') {
            try {
                var config = {
                    method: 'post',
                    url: '/Comodidades/Create',
                    data: {
                        Nome: novoItemNome,
                        IdEstabelecimento: props.establishment.IdEstabelecimento,
                    }
                };
                callApi(config)
                    .then(function (response) {
                        if (response.status == 200) {
                            Alert.alert('Sucesso', response.data.msg)
                            setModal({
                                ativo: false,
                                titulo: '',
                                nome: '',
                                valor: '',
                                nomeBotao: ''
                            })
                            setNovoItemNome('')
                            setNovoItemPreco('')
                            return
                        }
                    })
                    .catch(function (error) {
                        Alert.alert('Ocorreu um erro', 'Por favor tente novamente')
                        setModal({
                            ativo: false,
                            titulo: '',
                            nome: '',
                            valor: '',
                            nomeBotao: ''
                        })
                        setNovoItemNome('')
                        setNovoItemPreco('')
                    })
            } catch (err) {
                console.log('[ERROR]', err)
            }
        }
    }

    const editServicePress = () => {
        if (modalMod.option === 'corte') {
            try {
                var config = {
                    method: 'post',
                    url: '/Servico/Update',
                    data: {
                        IdTipoServico: modalMod.IdTipoServico,
                        IdServico: modalMod.IdServico,
                        Nome: `${modalMod.nome}`,
                        Valor: modalMod.valor,
                        Foto: '',
                        TempoEstimado: ''
                    }
                };
                callApi(config)
                    .then(function (response) {
                        if (response.status == 200) {
                            Alert.alert('Sucesso', `${response.data.msg}`)
                            setModalMod({
                                ativo: false,
                                titulo: '',
                                nome: '',
                                valor: 0,
                                nomeBotao: ''
                            })
                        }
                    })
                    .catch(function (error) {
                        Alert.alert('Ocorreu um erro', 'Por favor tente novamente')
                        setModal({
                            ativo: false,
                            titulo: '',
                            nome: '',
                            valor: '',
                            nomeBotao: ''
                        })
                    })
            } catch (err) {
                console.log('[ERROR]', err)
            }
        }

        if (modalMod.option === 'consumiveis') {
            try {
                var config = {
                    method: 'post',
                    url: '/Consumiveis/Update',
                    data: {
                        Id: modalMod.Id,
                        Nome: `${modalMod.nome}`,
                        Valor: modalMod.valor,
                    }
                };
                callApi(config)
                    .then(function (response) {
                        if (response.status == 200) {
                            Alert.alert('Sucesso', `${response.data.msg}`)
                            setModalMod({
                                ativo: false,
                                titulo: '',
                                nome: '',
                                valor: 0,
                                nomeBotao: ''
                            })
                        }
                    })
                    .catch(function (error) {
                        Alert.alert('Ocorreu um erro', 'Por favor tente novamente')
                        setModal({
                            ativo: false,
                            titulo: '',
                            nome: '',
                            valor: '',
                            nomeBotao: ''
                        })
                    })
            } catch (err) {
                console.log('[ERROR]', err)
            }
        }

        if (modalMod.option === 'comodidades') {
            try {
                var config = {
                    method: 'post',
                    url: '/Comodidades/Update',
                    data: {
                        Id: modalMod.Id,
                        Nome: `${modalMod.nome}`,
                    }
                };
                callApi(config)
                    .then(function (response) {
                        if (response.status == 200) {
                            Alert.alert('Sucesso', `${response.data.msg}`)
                            setModalMod({
                                ativo: false,
                                titulo: '',
                                nome: '',
                                valor: 0,
                                nomeBotao: ''
                            })
                        }
                    })
                    .catch(function (error) {
                        Alert.alert('Ocorreu um erro', 'Por favor tente novamente')
                        setModal({
                            ativo: false,
                            titulo: '',
                            nome: '',
                            valor: '',
                            nomeBotao: ''
                        })
                    })
            } catch (err) {
                console.log('[ERROR]', err)
            }
        }
    }

    const removeServicePress = () => {
        if (modalMod.option === 'corte') {
            try {
                var config = {
                    method: 'post',
                    url: '/Servico/inativaServico',
                    data: {
                        IdServico: modalMod.IdServico,
                    }
                };
                callApi(config)
                    .then(function (response) {
                        if (response.status == 200) {
                            Alert.alert('Sucesso', `${response.data.msg}`)
                            setModalMod({
                                ativo: false,
                                titulo: '',
                                nome: '',
                                valor: 0,
                                nomeBotao: ''
                            })
                        }
                    })
                    .catch(function (error) {
                        Alert.alert('Ocorreu um erro', 'Por favor tente novamente')
                        setModal({
                            ativo: false,
                            titulo: '',
                            nome: '',
                            valor: '',
                            nomeBotao: ''
                        })
                    })
            } catch (err) {
                console.log('[ERROR]', err)
            }
        }

        if (modalMod.option === 'consumiveis') {
            try {
                var config = {
                    method: 'post',
                    url: '/Consumiveis/delete',
                    data: {
                        Id: modalMod.Id,
                    }
                };
                callApi(config)
                    .then(function (response) {
                        if (response.status == 200) {
                            Alert.alert('Sucesso', `${response.data.msg}`)
                            setModalMod({
                                ativo: false,
                                titulo: '',
                                nome: '',
                                valor: 0,
                                nomeBotao: ''
                            })
                        }
                    })
                    .catch(function (error) {
                        Alert.alert('Ocorreu um erro', 'Por favor tente novamente')
                        setModal({
                            ativo: false,
                            titulo: '',
                            nome: '',
                            valor: '',
                            nomeBotao: ''
                        })
                    })
            } catch (err) {
                console.log('[ERROR]', err)
            }
        }

        if (modalMod.option === 'comodidades') {
            try {
                var config = {
                    method: 'post',
                    url: '/Comodidades/delete',
                    data: {
                        Id: modalMod.Id,
                    }
                };
                callApi(config)
                    .then(function (response) {
                        if (response.status == 200) {
                            Alert.alert('Sucesso', `${response.data.msg}`)
                            setModalMod({
                                ativo: false,
                                titulo: '',
                                nome: '',
                                valor: 0,
                                nomeBotao: ''
                            })
                        }
                    })
                    .catch(function (error) {
                        Alert.alert('Ocorreu um erro', 'Por favor tente novamente')
                        setModal({
                            ativo: false,
                            titulo: '',
                            nome: '',
                            valor: '',
                            nomeBotao: ''
                        })
                    })
            } catch (err) {
                console.log('[ERROR]', err)
            }
        }
    }

    useEffect(() => {
        serviceEstab()
        consumiveisEstab()
        comodidadesEstab()
    }, [props])

    //\services

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
                            {services != null && services.query.map((result, index) =>
                                <View style={styles.cardContent} key={index}>
                                    <Text style={styles.text}>{result.NomeServico}</Text>
                                    <Text style={styles.text}>{`${result.Valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}</Text>
                                    <View style={{ position: 'absolute', flexDirection: 'row', paddingTop: 50 }}>
                                        <TouchableOpacity onPress={() => ModifiOptionPress('corte', 'editar', result)}>
                                            <Text style={{
                                                color: '#fff',
                                                backgroundColor: '#181818',
                                                paddingVertical: 3,
                                                paddingHorizontal: 5,
                                                borderRadius: 5
                                            }}>
                                                Editar
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => ModifiOptionPress('corte', 'excluir', result)}>
                                            <Text style={{
                                                color: '#fff',
                                                backgroundColor: '#000',
                                                paddingVertical: 3,
                                                paddingHorizontal: 5,
                                                borderRadius: 5,
                                                marginLeft: 4
                                            }}>
                                                Excluir
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                            <TouchableOpacity onPress={() => addOptionPress('corte')}>
                                <Text style={[styles.text, styles.buttomAdd]}>Adicionar Novo</Text>
                            </TouchableOpacity>



                            <Text style={styles.title}>Consumiveis:</Text>
                            {consumiveis != null && consumiveis.map((result, index) =>
                                <View style={styles.cardContent} key={index}>
                                    <Text style={styles.text}>{result.NomeConsumiveis}</Text>
                                    <View style={{ position: 'absolute', flexDirection: 'row', paddingTop: 50 }}>
                                        <TouchableOpacity onPress={() => ModifiOptionPress('consumiveis', 'editar', result)}>
                                            <Text style={{
                                                color: '#fff',
                                                backgroundColor: '#181818',
                                                paddingVertical: 3,
                                                paddingHorizontal: 5,
                                                borderRadius: 5
                                            }}>
                                                Editar
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => ModifiOptionPress('consumiveis', 'excluir', result)}>
                                            <Text style={{
                                                color: '#fff',
                                                backgroundColor: '#000',
                                                paddingVertical: 3,
                                                paddingHorizontal: 5,
                                                borderRadius: 5,
                                                marginLeft: 4
                                            }}>
                                                Excluir
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={styles.text}>{result.Valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
                                </View>
                            )}
                            <TouchableOpacity onPress={() => addOptionPress('consumiveis')}>
                                <Text style={[styles.text, styles.buttomAdd]}>Adicionar Novo</Text>
                            </TouchableOpacity>



                            <Text style={styles.title}>Comodidades:</Text>
                            {comodidades != null && comodidades.map((result, index) =>
                                <View style={styles.cardContent} key={index}>
                                    <Text style={styles.text}>{result.NomeComodidade}</Text>
                                    <View style={{ position: 'absolute', flexDirection: 'row', paddingTop: 50 }}>
                                        <TouchableOpacity onPress={() => ModifiOptionPress('comodidades', 'editar', result)}>
                                            <Text style={{
                                                color: '#fff',
                                                backgroundColor: '#181818',
                                                paddingVertical: 3,
                                                paddingHorizontal: 5,
                                                borderRadius: 5
                                            }}>
                                                Editar
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => ModifiOptionPress('comodidades', 'excluir', result)}>
                                            <Text style={{
                                                color: '#fff',
                                                backgroundColor: '#000',
                                                paddingVertical: 3,
                                                paddingHorizontal: 5,
                                                borderRadius: 5,
                                                marginLeft: 4
                                            }}>
                                                Excluir
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                            <TouchableOpacity onPress={() => addOptionPress('comodidades')}>
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

            <Modal
                animationType="fade"
                transparent={true}
                visible={modal.ativo}
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#0000009f'
                }}>
                    <View style={{
                        backgroundColor: '#fff',
                        paddingHorizontal: 15,
                        paddingVertical: 15,
                        borderRadius: 10
                    }}>
                        <Text style={styles.titleModal}>{modal.titulo}</Text>
                        <TextInput
                            placeholder={modal.nome}
                            style={styles.inputModal}
                            onChangeText={setNovoItemNome}
                        />
                        <TextInput
                            placeholder={'R$' + modal.valor}
                            style={styles.inputModal}
                            onChangeText={setNovoItemPreco}
                            keyboardType="numeric"
                        />
                        <TouchableOpacity onPress={() => addServicePress()}>
                            <Text
                                style={{
                                    color: '#fff',
                                    textAlign: 'center',
                                    backgroundColor: '#181818',
                                    paddingVertical: 10,
                                    borderRadius: 10
                                }}>
                                {modal.nomeBotao}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setModal({
                            ativo: false,
                            titulo: '',
                            nome: '',
                            valor: '',
                            nomeBotao: ''
                        })}
                        >
                            <Text
                                style={{
                                    color: '#fff',
                                    textAlign: 'center',
                                    backgroundColor: '#181818',
                                    paddingVertical: 10,
                                    borderRadius: 10,
                                    marginTop: 5
                                }}>
                                Cancelar
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalMod.ativo}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0000009f' }}>
                    <View style={{ backgroundColor: '#fff', paddingHorizontal: 15, paddingVertical: 15, borderRadius: 10 }}>
                        <Text style={styles.titleModal}>{modalMod.titulo}</Text>
                        <TextInput
                            value={modalMod.nome}
                            style={styles.inputModal}
                            editable={modalMod.editar}
                            onChangeText={(text) => setModalMod({ ...modalMod, nome: text })}
                        />
                        <TextInput
                            value={modalMod.valor}
                            style={styles.inputModal}
                            editable={modalMod.editar}
                            onChangeText={(text) => setModalMod({ ...modalMod, valor: text })}
                        />
                        <TouchableOpacity onPress={() => {
                            if (modalMod.mod === 'editar') {
                                editServicePress()
                            } else {
                                removeServicePress()
                            }
                        }}>
                            <Text
                                style={{ color: '#fff', textAlign: 'center', backgroundColor: '#181818', paddingVertical: 10, borderRadius: 10 }}>
                                {modalMod.nomeBotao}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setModalMod({
                            ativo: false,
                            titulo: '',
                            nome: '',
                            valor: '',
                            nomeBotao: ''
                        })}
                        >
                            <Text style={{ color: '#fff', textAlign: 'center', backgroundColor: '#181818', paddingVertical: 10, borderRadius: 10, marginTop: 5 }}>
                                Cancelar
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default Geral;

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