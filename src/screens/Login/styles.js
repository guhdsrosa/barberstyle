import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    Container: {
        paddingHorizontal: 30,
        flex: 1,
        backgroundColor: '#fff',
        //justifyContent: 'center'
    },

    TitleLogo: {
        height: 90,
        width: '100%',
        marginTop: 80
    },

    Text: {
        fontSize: 30,
        color: '#000',
        fontFamily: 'Quicksand-Bold',
        textAlign: 'center',
        marginBottom: 10,
    },

    TextInput: {
        borderWidth: 1.5,
        borderColor: '#E8E8E8',
        color: '#BDBDBD',
        fontFamily: 'Quicksand-Bold',
        borderRadius: 12,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 10,
        paddingVertical: 7,
        paddingVertical: 10,
        backgroundColor: '#F6F6F6'
    },

    eyeStyle: {
        position: "absolute",
        right: 10,
        bottom: 13,
        color: '#12dbc5'
    },

    ContentOptions: {
        marginTop: 16,
        alignSelf: 'center'
    },

    ContentRemember: {
        color: '#BDBDBD',
        fontSize: 16,
        fontFamily: 'Quicksand-Bold',
    },

    ContentRecover: {
        color: '#12dbc5',
        fontSize: 16,
        fontFamily: 'Quicksand-Bold',
    },

    Button: {
        alignSelf: 'center',
        backgroundColor: '#12dbc5',
        borderRadius: 100,
        marginTop: 79,
    },

    ButtonText: {
        fontSize: 16,
        color: '#fff',
        paddingHorizontal: 138,
        paddingVertical: 16,
        fontFamily: 'Quicksand-Bold',
    },

    FooterOptions: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 14,
    }
})