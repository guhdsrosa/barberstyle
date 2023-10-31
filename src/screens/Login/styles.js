import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    Container: {
        paddingHorizontal: 30,
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        paddingBottom: 40
    },

    TitleLogo: {
        height: 90,
        width: '100%',
        marginTop: 80,
    },

    TextWelcome: {
        fontSize: 35,
        color: '#fff',
        fontFamily: 'Quicksand-Light',
        textAlign: 'left',
        marginBottom: 30,
    },

    Text: {
        fontSize: 26,
        color: '#fff',
        fontFamily: 'Quicksand-Regular',
        textAlign: 'center',
        marginBottom: 10,
    },

    TextInput: {
        borderWidth: 1.5,
        borderColor: '#E8E8E8',
        color: '#141414',
        fontFamily: 'Quicksand-Medium',
        borderRadius: 12,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 10,
        paddingVertical: 7,
        paddingVertical: 10,
        backgroundColor: '#F6F6F6',
    },

    eyeStyle: {
        position: "absolute",
        right: 10,
        bottom: 13,
        color: '#131313'
    },

    ContentOptions: {
        marginTop: 16,
        alignSelf: 'center'
    },

    ContentRemember: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Quicksand-Medium',
    },

    ContentRecover: {
        color: '#12dbc5',
        fontSize: 16,
        fontFamily: 'Quicksand-Medium',
    },

    Button: {
        alignSelf: 'center',
        backgroundColor: '#12dbc5',
        borderRadius: 10,
        marginTop: 15,
        width: '100%'
    },

    ButtonText: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        paddingVertical: 14,
        fontFamily: 'Quicksand-Bold',
    },

    FooterOptions: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 14,
    }
})