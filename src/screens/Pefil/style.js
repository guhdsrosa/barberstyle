import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        //flex: 1,
    },

    headerColor: ['#191919', '#000'],

    exitButton: {
        position: 'absolute',
        right: 0,
        marginRight: 16,
        marginTop: 24,
        backgroundColor: '#cc0000',
        paddingHorizontal: 10,
        paddingBottom: 2,
        borderRadius: 10,
        zIndex: 2000
    },

    exitButtonText: {
        fontSize: 16,
        color: '#fff',
        fontFamily: 'Quicksand-Bold',
        paddingVertical: 2
    },

    titleText: {
        fontSize: 30,
        textAlign: 'center',
        marginTop: 16,
        fontFamily: 'Quicksand-SemiBold',
        color: '#fff',
    },

    containerUserLogo: {
        zIndex: 1000, 
        position: 'absolute', 
        alignSelf: 'center', 
    },

    userLogo: {
        width: 158,
        height: 158,
        alignSelf: 'center',
        borderWidth: 3,
        borderColor: '#ffffff90',
        borderRadius: 100,
        marginTop: 68,
        zIndex: 1000,
    },

    body: {
        backgroundColor: '#f0f0f0',
        marginTop: 135,
        paddingBottom: 15,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        flex: 1
    },

    titleName: {
        textAlign: 'center',
        marginTop: 45,
        fontSize: 30,
        fontFamily: 'Quicksand-SemiBold',
        color: '#131313',
    },

    inputText: {
        borderRadius: 10,
        marginHorizontal: 18,
        marginTop: 15,
        borderWidth: 2,
        borderColor: '#E8E8E8',
        backgroundColor: '#F6F6F6',
        paddingHorizontal: 15,
        color: '#141414',
        fontSize: 16,
        fontFamily: 'Quicksand-SemiBold',
    },

    saveButton: {
        backgroundColor: '#12dbc5',
        marginTop: 15,
        marginHorizontal: 54,
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

    saveButtonText: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 19,
        color: '#fff',
        fontFamily: 'Quicksand-Bold',
    }
})

export default styles;