import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import callApi from '../../server/api'

import AwesomeAlert from 'react-native-awesome-alerts';
import LinearGradient from "react-native-linear-gradient";

//Screens
import Geral from "./components/geral";

import styles from "./styles";

const Establishment = () => {
    const [option, setOption] = useState('')
    const [week, setWeek] = useState({
        segunda: false,
        terca: false,
        quarta: false,
        quinta: false,
        sexta: false,
        sabado: false,
    })
    const [optionsSelect, setOptionsSelect] = useState([
        { id: 0, name: 'Geral' },
        { id: 0, name: 'Horarios' },
        { id: 0, name: 'Profissionais' },
        { id: 0, name: 'Cadastro' },
        { id: 0, name: 'Redes' },
        { id: 0, name: 'Consumiveis' },
        { id: 0, name: 'Comodidades' }
    ])

    console.log(week)

    const optionSelect = ({ opt }) => {
        if (opt == 'Geral') {
            setOption('geral')
        }

        if (opt == 'Horarios') {
            setOption('horarios')
        }

        if (opt == 'Profissionais') {
            setOption('profissionais')
        }

        if (opt == 'Cadastro') {
            setOption('cadastro')
        }

        if (opt == 'Redes') {
            setOption('redes')
        }

        if (opt == 'Consumiveis') {
            setOption('consumiveis')
        }

        if (opt == 'Comodidades') {
            setOption('comodidades')
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollContent} horizontal={true}>
                {optionsSelect.map((result) =>
                    <TouchableOpacity onPress={() => { optionSelect({ opt: result.name }) }} style={styles.touchOption}>
                        <Text style={styles.textOption}>{result.name}</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>

            {option == 'geral' &&
                <Geral />
            }

            {option == 'horarios' &&
                <View style={styles.hourContainer}>
                    <TouchableOpacity style={styles.weekTouch} onPress={() => setWeek({ ...week, segunda: !week.segunda })}>
                        <Text style={styles.weekText}>Segunda-Feira</Text>
                        {week.segunda == true &&
                            <>
                                <Text style={styles.textOption}>Qual horário você abre o seu estabelecimento?</Text>
                                <TextInput
                                    placeholder="ex: 7:30"
                                    keyboardType="decimal-pad"
                                    style={styles.inputStyle}
                                />

                                <Text style={styles.textOption}>Qual horário você tira para o almoço?</Text>
                                <TextInput
                                    placeholder="ex: 12:00"
                                    keyboardType="decimal-pad"
                                    style={styles.inputStyle}
                                />

                                <TextInput
                                    placeholder="ex: 13:30"
                                    keyboardType="decimal-pad"
                                    style={styles.inputStyle}
                                />

                                <Text style={styles.textOption}>Qual horário você fecha o seu estabelecimento?</Text>
                                <TextInput
                                    placeholder="ex: 17:00"
                                    keyboardType="decimal-pad"
                                    style={styles.inputStyle}
                                />
                            </>
                        }
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.weekTouch} onPress={() => setWeek({ ...week, terca: !week.terca })}>
                        <Text style={styles.weekText}>Terça-Feira</Text>
                        {week.terca == true &&
                            <>
                                <Text style={styles.textOption}>Qual horário você abre o seu estabelecimento?</Text>
                                <TextInput
                                    placeholder="ex: 7:30"
                                    keyboardType="decimal-pad"
                                    style={styles.inputStyle}
                                />

                                <Text style={styles.textOption}>Qual horário você tira para o almoço?</Text>
                                <TextInput
                                    placeholder="ex: 12:00"
                                    keyboardType="decimal-pad"
                                    style={styles.inputStyle}
                                />

                                <TextInput
                                    placeholder="ex: 13:30"
                                    keyboardType="decimal-pad"
                                    style={styles.inputStyle}
                                />

                                <Text style={styles.textOption}>Qual horário você fecha o seu estabelecimento?</Text>
                                <TextInput
                                    placeholder="ex: 17:00"
                                    keyboardType="decimal-pad"
                                    style={styles.inputStyle}
                                />
                            </>
                        }
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.weekTouch} onPress={() => setWeek({ ...week, quarta: !week.quarta })}>
                        <Text style={styles.weekText}>Quarta-Feira</Text>
                        {week.quarta == true &&
                            <>
                                <Text style={styles.textOption}>Qual horário você abre o seu estabelecimento?</Text>
                                <TextInput
                                    placeholder="ex: 7:30"
                                    keyboardType="decimal-pad"
                                    style={styles.inputStyle}
                                />

                                <Text style={styles.textOption}>Qual horário você tira para o almoço?</Text>
                                <TextInput
                                    placeholder="ex: 12:00"
                                    keyboardType="decimal-pad"
                                    style={styles.inputStyle}
                                />

                                <TextInput
                                    placeholder="ex: 13:30"
                                    keyboardType="decimal-pad"
                                    style={styles.inputStyle}
                                />

                                <Text style={styles.textOption}>Qual horário você fecha o seu estabelecimento?</Text>
                                <TextInput
                                    placeholder="ex: 17:00"
                                    keyboardType="decimal-pad"
                                    style={styles.inputStyle}
                                />
                            </>
                        }
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.weekTouch} onPress={() => setWeek({ ...week, quinta: !week.quinta })}>
                        <Text style={styles.weekText}>Quinta-Feira</Text>
                        {week.quinta == true &&
                            <>
                                <Text style={styles.textOption}>Qual horário você abre o seu estabelecimento?</Text>
                                <TextInput
                                    placeholder="ex: 7:30"
                                    keyboardType="decimal-pad"
                                    style={styles.inputStyle}
                                />

                                <Text style={styles.textOption}>Qual horário você tira para o almoço?</Text>
                                <TextInput
                                    placeholder="ex: 12:00"
                                    keyboardType="decimal-pad"
                                    style={styles.inputStyle}
                                />

                                <TextInput
                                    placeholder="ex: 13:30"
                                    keyboardType="decimal-pad"
                                    style={styles.inputStyle}
                                />

                                <Text style={styles.textOption}>Qual horário você fecha o seu estabelecimento?</Text>
                                <TextInput
                                    placeholder="ex: 17:00"
                                    keyboardType="decimal-pad"
                                    style={styles.inputStyle}
                                />
                            </>
                        }
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.weekTouch} onPress={() => setWeek({ ...week, sexta: !week.sexta })}>
                        <Text style={styles.weekText}>Sexta-Feira</Text>
                        {week.sexta == true &&
                            <>
                                <Text style={styles.textOption}>Qual horário você abre o seu estabelecimento?</Text>
                                <TextInput
                                    placeholder="ex: 7:30"
                                    keyboardType="decimal-pad"
                                    style={styles.inputStyle}
                                />

                                <Text style={styles.textOption}>Qual horário você tira para o almoço?</Text>
                                <TextInput
                                    placeholder="ex: 12:00"
                                    keyboardType="decimal-pad"
                                    style={styles.inputStyle}
                                />

                                <TextInput
                                    placeholder="ex: 13:30"
                                    keyboardType="decimal-pad"
                                    style={styles.inputStyle}
                                />

                                <Text style={styles.textOption}>Qual horário você fecha o seu estabelecimento?</Text>
                                <TextInput
                                    placeholder="ex: 17:00"
                                    keyboardType="decimal-pad"
                                    style={styles.inputStyle}
                                />
                            </>
                        }
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.weekTouch} onPress={() => setWeek({ ...week, sabado: !week.sabado })}>
                        <Text style={styles.weekText}>Sábado</Text>
                        {week.sabado == true &&
                            <>
                                <Text style={styles.textOption}>Qual horário você abre o seu estabelecimento?</Text>
                                <TextInput
                                    placeholder="ex: 7:30"
                                    keyboardType="decimal-pad"
                                    style={styles.inputStyle}
                                />

                                <Text style={styles.textOption}>Qual horário você tira para o almoço?</Text>
                                <TextInput
                                    placeholder="ex: 12:00"
                                    keyboardType="decimal-pad"
                                    style={styles.inputStyle}
                                />

                                <TextInput
                                    placeholder="ex: 13:30"
                                    keyboardType="decimal-pad"
                                    style={styles.inputStyle}
                                />

                                <Text style={styles.textOption}>Qual horário você fecha o seu estabelecimento?</Text>
                                <TextInput
                                    placeholder="ex: 17:00"
                                    keyboardType="decimal-pad"
                                    style={styles.inputStyle}
                                />
                            </>
                        }
                    </TouchableOpacity>
                </View>
            }


        </View>
    )
}

export default Establishment