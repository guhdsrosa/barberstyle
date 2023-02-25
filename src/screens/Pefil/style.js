import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    headerColor: ['#11dbc5', '#9ef9f2'],

    exitButton: {
        position: 'absolute',
        right: 0,
        marginRight: 16,
        marginTop: 24
    },

    exitButtonText: {
        fontSize: 16,
        color: '#fff',
        fontFamily: 'Quicksand-Bold',
    },

    titleText: {
        fontSize: 30,
        textAlign: 'center',
        marginTop: 16,
        fontFamily: 'Quicksand-SemiBold',
        color: '#fff',
    },

    userLogo: {
        width: 158,
        height: 158,
        alignSelf: 'center',
        borderWidth: 3,
        borderColor: '#fff',
        borderRadius: 100,
        position: 'absolute',
        marginTop: 68,
        zIndex: 1,
    },

    body: {
        backgroundColor: '#f0f0f0',
        marginTop: 135,
        //borderRadius: 20,
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
        color: '#BDBDBD',
        fontSize: 16,
    },

    saveButton: {
        backgroundColor: '#12dbc5',
        marginVertical: 15,
        marginHorizontal: 54,
        borderRadius: 100
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