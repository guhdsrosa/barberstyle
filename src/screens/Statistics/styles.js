import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: '100%',
    },

    loading: {
        flex: 1,
        alignSelf: 'center',
        paddingTop: '60%',
    },

    loadingText: {
        fontSize: 20,
        fontFamily: 'Quicksand-Medium',
        color: '#131313',
        textAlign: 'center',
        marginTop: -30
    },

    title: {
        fontSize: 24,
        margin: 10,
    },
})