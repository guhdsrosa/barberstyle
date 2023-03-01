import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },

    header: {

    },

    backButton: {
        position: 'absolute',
        margin: 14,
        zIndex: 1,
    },

    storePhoto: {
        width: '100%',
        height: 305,
    },

    storeName: {
        color: '#fff',
        bottom: '60%',
        alignSelf: 'center',
        fontSize: 30,
        fontFamily: 'Quicksand-Bold',
    }
})

export default styles;