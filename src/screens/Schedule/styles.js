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
    }
})

export default styles