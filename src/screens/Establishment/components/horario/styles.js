import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    textOption: {
        fontSize: 13,
        color: '#141414',
        fontFamily: 'Quicksand-SemiBold',
        textAlign: 'center',
        paddingHorizontal: 30
    },

    hourContainer: {
        //marginHorizontal: 20,
        marginVertical: 8
    },

    weekTouch: {
        //backgroundColor: '#F6F6F6',
        marginVertical: 10,
        marginHorizontal: 0,
        borderRadius: 20,

        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 3,
        // },
        // shadowOpacity: 0.27,
        // shadowRadius: 4.65,

        // elevation: 6,
    },

    weekText: {
        fontSize: 15,
        color: '#141414',
        fontFamily: 'Quicksand-SemiBold',
        textAlign: 'center',
        paddingVertical: 13
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
export default styles