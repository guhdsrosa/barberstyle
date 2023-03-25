import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 18
    },

    touchOption: {
        marginHorizontal: 10,
        marginVertical: 10
    },

    textOption: {
        fontSize: 16,
        color: '#141414',
        fontFamily: 'Quicksand-SemiBold',
        textAlign: 'center'
    },

    hourContainer: {
        marginHorizontal: 20,
        flex: 1,
    },

    weekTouch: {
        backgroundColor: '#F6F6F6',
        marginVertical: 10,
        marginHorizontal: 0,
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingBottom: 10,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },

    weekText: {
        fontSize: 20,
        color: '#141414',
        fontFamily: 'Quicksand-SemiBold',
        textAlign: 'center',
        paddingVertical: 10
    },

    inputStyle: {
        fontFamily: 'Quicksand-SemiBold',
        color: '#141414',
        backgroundColor: '#f6f6f6',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E8E8E8',
        marginVertical: 5,
        marginHorizontal: 50,
        paddingHorizontal: 10,
    }

})

export default styles;