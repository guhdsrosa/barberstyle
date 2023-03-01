import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
import styles from "./styles";

const PerfilStab = () => {

    const [option, setOption] = useState('geral')
    const [week, setWeek] = useState({
        segunda: false,
        terca: false,
        quarta: false,
        quinta: false,
        sexta: false,
        sabado: false,
    })

    console.log(week)

    const optionSelect = ({ opt }) => {
        if (opt == 'geral') {
            setOption('geral')
        }

        if (opt == 'horarios') {
            setOption('horarios')
        }

        if (opt == 'profissionais') {
            setOption('profissionais')
        }

        if (opt == 'cadastro') {
            setOption('cadastro')
        }

        if (opt == 'redes') {
            setOption('redes')
        }

        if (opt == 'consumiveis') {
            setOption('consumiveis')
        }

        if (opt == 'comodidades') {
            setOption('comodidades')
        }
    }

    return (
        <View>
            <ScrollView style={styles.scrollContent} horizontal={true}>
                <TouchableOpacity onPress={() => { optionSelect({ opt: 'geral' }) }} style={styles.touchOption}>
                    <Text style={styles.textOption}>Geral</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { optionSelect({ opt: 'horarios' }) }} style={styles.touchOption}>
                    <Text style={styles.textOption}>Horarios</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { optionSelect({ opt: 'profissionais' }) }} style={styles.touchOption}>
                    <Text style={styles.textOption}>Profissionais</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { optionSelect({ opt: 'cadastro' }) }} style={styles.touchOption}>
                    <Text style={styles.textOption}>Cadastro de Serviço</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { optionSelect({ opt: 'redes' }) }} style={styles.touchOption}>
                    <Text style={styles.textOption}>Redes Sociais</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { optionSelect({ opt: 'consumiveis' }) }} style={styles.touchOption}>
                    <Text style={styles.textOption}>Consumíveis</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { optionSelect({ opt: 'comodidades' }) }} style={styles.touchOption}>
                    <Text style={styles.textOption}>Comodidades</Text>
                </TouchableOpacity>
            </ScrollView>

            {option == 'geral' &&
                <>
                    <TextInput
                        style={styles.inputText}
                        placeholder={'Nome do Estabelecimento*'}
                    />
                    <TextInput
                        style={styles.inputText}
                        placeholder={'CEP*'}
                    />
                    <TextInput
                        style={styles.inputText}
                        placeholder={'Rua*'}
                    />
                    <TextInput
                        style={styles.inputText}
                        placeholder={'Bairro*'}
                    />
                    <TextInput
                        style={styles.inputText}
                        placeholder={'Estado*'}
                    />
                    <TextInput
                        style={styles.inputText}
                        placeholder={'Número*'}
                    />
                    <TextInput
                        style={styles.inputText}
                        placeholder={'CNPJ'}
                    />
                    <TextInput
                        style={styles.inputText}
                        placeholder={'Telefone'}
                    />
                    <TextInput
                        style={styles.inputText}
                        placeholder={'Telefone'}
                    />
                    <TextInput
                        style={styles.inputText}
                        placeholder={'Sobre nós'}
                    />
                </>
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

export default PerfilStab;