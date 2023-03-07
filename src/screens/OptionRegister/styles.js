import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16,
        justifyContent: 'center'
    },

    titleContent: {
        color: '#000',
        fontSize: 30,
        textAlign: 'center',
        fontFamily: 'Quicksand-Bold',
        marginBottom: 50
    },

    button: {
        alignSelf: 'center',
        backgroundColor: '#12dbc5',
        marginBottom: 17,
        width: '100%',
        borderRadius: 100
    },

    buttonText: {
        color: '#fff',
        fontSize: 16,
        marginVertical: 16,
        textAlign: 'center',
        fontFamily: 'Quicksand-Bold',
    },
})