import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        justifyContent: 'center',
        backgroundColor: '#fff'
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
        borderRadius: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },

    buttonText: {
        color: '#fff',
        fontSize: 16,
        marginVertical: 16,
        textAlign: 'center',
        fontFamily: 'Quicksand-Bold',
    },
})