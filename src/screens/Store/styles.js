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
    },
    
    bottomConfirm: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 40,
        alignItems: 'center',
    },

    confirmButton: {
        backgroundColor: '#000',
        borderRadius: 100,
    },

    textButton: {
        paddingHorizontal: 36,
        paddingVertical: 13.5,
        color: '#fff',
        fontFamily: 'Quicksand-SemiBold',
        fontSize: 16,
        textAlign: 'center'
    },

    textPrice: {
        fontFamily: 'Quicksand-SemiBold',
        color: '#000',
        fontSize: 17,
    }
})

export default styles;