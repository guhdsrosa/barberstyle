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
        backgroundColor: '#141414',
        borderRadius: 200,
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
        marginHorizontal:15
    },

    options: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

    optionsText: {
        fontSize: 16,
        color: '#000',
        fontFamily: 'Quicksand-SemiBold',
    }
})

export default styles;