import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    backButton: {
        position: 'absolute',
        margin: 14,
        zIndex: 1,
        backgroundColor: '#141414',
        borderRadius: 200,
    },

    titleText: {
        color: '#000',
        alignSelf: 'flex-start',
        fontSize: 17,
        fontFamily: 'Quicksand-Regular',
        marginVertical: 15,
        alignSelf: 'center'
    },

    barberContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },

    barberImage: {
        width: 50,
        height: 50,
        borderRadius: 100,
        marginHorizontal: 10,
        marginVertical: 5
    },

    barberText: {
        color: '#000',
        fontSize: 15,
        fontFamily: 'Quicksand-SemiBold',
    },

    bottomConfirm: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 40,
        alignItems: 'center',
    },

    buttomAccept: {
        marginVertical: 20,
        marginHorizontal: 10
    },

    buttomAcceptText: {
        backgroundColor: '#141414',
        paddingHorizontal: 50,
        paddingVertical: 10,
        borderRadius: 10,
        fontSize: 17,
        fontFamily: 'Quicksand-SemiBold',
        textAlign: 'center',
        color: '#fff',
    },

    hourContainer: { 
        marginHorizontal: 10, 
        flexDirection: 'row', 
        flexWrap: 'wrap' ,
        justifyContent: 'space-evenly'
    },

    hourContent: {
        marginHorizontal: 5,
        marginVertical: 5
    },

    hourText: {
        color: '#fff',
        fontSize: 17,
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 10
    }
})

export default styles