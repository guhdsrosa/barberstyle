import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingBottom: 14,
    },

    menuContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        alignItems: 'center'
    },

    menuTitle: {
        color: '#000',
        fontSize: 30,
        fontFamily: 'Quicksand-Bold',
    },

    loginTitle: {
        fontSize: 16,
        fontFamily: 'Quicksand-Bold',
        color: '#12dbc5',
    },

    inputContainer: {
        marginTop: 32
    },

    inputText: {
        borderWidth: 1.5,
        borderColor: '#E8E8E8',
        color: '#141414',
        fontFamily: 'Quicksand-Bold',
        borderRadius: 12,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 10,
        paddingVertical: 7,
        paddingVertical: 10,
        backgroundColor: '#F6F6F6'
    },

    servicesConfirm: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },

    checkText: {
        color: '#666666',
        fontFamily: 'Quicksand-Bold',
        marginBottom: 4
    },

    checkTextServices: {
        color: '#12dbc5',
        fontFamily: 'Quicksand-Bold',
    },

    buttonConfirm: {
        alignSelf: 'center',
        backgroundColor: '#12dbc5',
        width: '100%',
        borderRadius: 100,
        marginTop: 10,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },

    buttonConfirmText: {
        textAlign: 'center',
        marginVertical: 16,
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    containerUserLogo: {
        alignSelf: 'center', 
    },

    userLogo: {
        width: 158,
        height: 158,
        alignSelf: 'center',
        borderWidth: 3,
        borderColor: '#ffffff90',
        borderRadius: 100,
        marginTop: 5,
        zIndex: 1000,
    },
})