import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    Container: {
        paddingHorizontal: 30,
        height: '100%',
        backgroundColor: '#fff',
        justifyContent: 'center'
    },

    TitleLogo: {
        height: 90,
        width: '100%',
        marginBottom: 38,
    },

    Text: {
        fontSize: 21,
        color: '#fff',
        fontWeight: "bold",
        textAlign: 'center',
        marginBottom: 10,
    },

    TextInput: {
        borderWidth: 1.5,
        borderColor: 'rgba(135,11,182,0.6)',
        color: '#fff',
        fontWeight: "bold",
        borderRadius: 12,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 10,
        paddingVertical: 7,
        paddingVertical: 10,
        backgroundColor: '#2f3c50'
    },

    eyeStyle: {
        position: "absolute",
        right: 10,
        bottom: 13,
        color: '#870bb6'
    },

    ContentOptions: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginTop: 20,
        marginBottom: 24
    },

    ContentRemember: {
        color: '#fff'
    },

    ContentRecover: {
        color: '#870bb6'
    },

    Button: {
        alignSelf: 'center',
        backgroundColor: '#870bb6',
        borderRadius: 12
    },

    ButtonText: {
        fontSize: 18,
        fontWeight: "600",
        color: '#fff',
        marginHorizontal: 136,
        marginVertical: 17
    },

    FooterOptions: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 22,
        marginBottom: 24
    }
})