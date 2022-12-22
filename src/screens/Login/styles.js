import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    Container: {
        paddingHorizontal: 30,
        height: '100%',
        backgroundColor: '#28333F',
        justifyContent: 'center'
    },

    TitleLogo: {
        height: 90,
        width: '100%',
        marginBottom: 68,
    },

    Text: {
        fontSize: 21,
        color: '#fff',
        fontWeight: "bold",
        textAlign: 'center',
        marginBottom: 10,
    },

    TextInput: {
        borderWidth: 1,
        borderColor: 'rgba(123,97,255,0.6)',
        color: '#fff',
        fontWeight: "bold",
        borderRadius: 12,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 10,
        paddingVertical: 7,
        paddingVertical: 10
    },

    ContentOptions: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginTop: 12,
        marginBottom: 24
    },

    ContentRemember: {
        color: '#fff'
    },

    ContentRecover: {
        color: '#7B61FF'
    },

    Button: {
        alignSelf: 'center',
        backgroundColor: '#7b61ff',
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
        marginTop: 12,
        marginBottom: 24
    }
})

/*
export const ButtonStyle = styled.Button`
    margin-top: 5px;
`;*/