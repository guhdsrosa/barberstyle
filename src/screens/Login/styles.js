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
        fontWeight: "bold",
        textAlign: 'center',
        marginBottom: 10,
    },

    TextInput: {
        borderWidth: 1.5,
        borderColor: '#E8E8E8',
        color: '#BDBDBD',
        fontWeight: "bold",
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
        color: '#FA5300'
    },

    ContentOptions: {
        marginTop: 16,
        alignSelf: 'center'
    },

    ContentRemember: {
        color: '#BDBDBD',
        fontSize: 16
    },

    ContentRecover: {
        color: '#FA5300',
        fontSize: 16
    },

    Button: {
        alignSelf: 'center',
        backgroundColor: '#FA5300',
        borderRadius: 100,
        marginTop: 79,
    },

    ButtonText: {
        fontSize: 16,
        fontWeight: "600",
        color: '#fff',
        paddingHorizontal: 138,
        paddingVertical: 16
    },

    FooterOptions: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 14,
    }
})