import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 20
    },
    
    title: {
        fontSize: 20,
        fontFamily: 'Quicksand-Bold',
        alignSelf: 'center',
        color: '#12dbc5',
        marginBottom: 20
    },

    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        marginHorizontal: 10,
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 10,
        borderColor: '#cccccc',
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 2,
    },

    textOptions: {
        fontFamily: 'Quicksand-Medium',
        fontSize: 16,
        color: '#000',
        alignSelf: 'center'
    },

    plusButton: {
        backgroundColor: '#131313',
        borderRadius: 100,
        marginTop: 4,
    },

    plusIcon: {
        paddingVertical: 3,
        paddingHorizontal: 20
    }
})

export default styles