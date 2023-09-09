import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";
import { SelectList } from "react-native-dropdown-select-list";

import AntDesign from "react-native-vector-icons/AntDesign";

const Profissionais = () => {

    const data = [
        { key: '1', value: 'toutou85@uorak.com' },
        { key: '2', value: 'toutou81@uorak.com' },
        { key: '3', value: 'toutou83@uorak.com' },
        { key: '4', value: 'toutou65@uorak.com' },
        { key: '5', value: 'toutou15@uorak.com' },
        { key: '7', value: 'toutou35@uorak.com' }
    ]

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Vincule um funcionário a sua empresa inserindo seu E-mail:</Text>

            <SelectList
                setSelected={(val) => console.log(val)}
                data={data}
                save="value"
                search={true}
                dropdownTextStyles={{ color: '#181818' }}
                disabledTextStyles={{ color: '#b3b3b3' }}
                placeholder="Pesquisar E-mail"
                fontFamily="Quicksand-Medium"
                boxStyles={{ backgroundColor: '#f4f4f4', marginTop: 30, borderRadius: 100, paddingVertical: 15 }}
                inputStyles={{ color: '#181818', fontSize: 15 }}
                arrowicon={<AntDesign name="search1" color={'#181818'} size={20} />}
                searchPlaceholder="Procurar"
                notFoundText="Não encontrado"
                searchicon={<AntDesign name="search1" color={'#181818'} style={{marginRight: 10}} size={20} />}
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