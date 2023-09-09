import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";

const Horario = () => {
    const [week, setWeek] = useState({
        segunda: false,
        terca: false,
        quarta: false,
        quinta: false,
        sexta: false,
        sabado: false,
    })

    return (
        <View style={styles.hourContainer}>
            <TouchableOpacity style={styles.weekTouch}>
                <Text style={styles.weekText}>Insira o horário de funcionamento</Text>
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

            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.weekTouch} onPress={() => setWeek({ ...week, segunda: !week.segunda })}>
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
            </TouchableOpacity> */}
        </View>
    )
}

export default Horario;

const styles = StyleSheet.create({
    textOption: {
        fontSize: 13,
        color: '#141414',
        fontFamily: 'Quicksand-SemiBold',
        textAlign: 'center',
        paddingHorizontal: 30
    },

    hourContainer: {
        //marginHorizontal: 20,
        marginVertical: 8
    },

    weekTouch: {
        //backgroundColor: '#F6F6F6',
        marginVertical: 10,
        marginHorizontal: 0,
        borderRadius: 20,

        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 3,
        // },
        // shadowOpacity: 0.27,
        // shadowRadius: 4.65,

        // elevation: 6,
    },

    weekText: {
        fontSize: 15,
        color: '#141414',
        fontFamily: 'Quicksand-SemiBold',
        textAlign: 'center',
        paddingVertical: 13
    },

    inputStyle: {
        fontFamily: 'Quicksand-SemiBold',
        color: '#141414',
        backgroundColor: '#f6f6f6',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E8E8E8',
        marginVertical: 5,
        marginHorizontal: 50,
        paddingHorizontal: 10,
    }
})