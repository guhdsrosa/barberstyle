import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    userContent: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 70,
        marginLeft: 50,
    },

    userPhoto: {
        borderRadius: 100,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#f0f0f0',
        marginRight: 20,

        shadowColor: "#000",
        shadowOffset:{
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },

    userTextContent: {
        alignSelf: 'center'
    },

    userTextTitle: {
        fontSize: 16,
        color: '#fff'
    },

    userText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#fff'
    },

    optionContainer: {
        marginHorizontal: 10,
        marginTop: 30,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },

    touchOptions: {
        marginVertical: 20,
        marginHorizontal: 20
    },

    logoImage: {
        height: 100,
        width: 100,
        backgroundColor: '#fff',
        borderRadius: 100
    },

    optionText: {
        color: '#fff',
        marginTop: 10,
        fontSize: 15,
        alignSelf: 'center'
    },

    bodyContainer: {
        paddingHorizontal: 20,
        marginTop: 30,
        paddingBottom: 20,
        backgroundColor: '#fff',
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        
        shadowColor: "#000",
        shadowOffset:{
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },

    textBody: {
        textAlign: 'center',
        fontSize: 17,
        marginVertical: 20,
        color: '#000',
    },

    storeTouch: {
        marginHorizontal: 10
    },

    storeImage: {
        height: 100,
        width: 190
    },

    textImage: {
        color: '#000',
        textAlign: 'center',
        fontSize: 17,
        marginTop: 5
    }
})