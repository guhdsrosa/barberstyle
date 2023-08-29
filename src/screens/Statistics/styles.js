import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#fff',
    },

    loading: {
        flex: 1,
        alignSelf: 'center',
        paddingTop: '60%',
    },

    loadingText: {
        fontSize: 20,
        fontFamily: 'Quicksand-Medium',
        color: '#131313',
        textAlign: 'center',
        marginTop: -30
    },

    body: {
        paddingHorizontal: 10,
        paddingTop: 10,
        flex: 1
    },

    searchbarStyle: {
        marginVertical: 10,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
    },

    establishmentContent: {
        backgroundColor: '#fff',
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 15,
        padding: 10,
        flexDirection: 'row',
        borderWidth: 0.5,
        borderColor: '#d0d0d0',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 3,
    },

    establishmentPhoto: {
        height: 70,
        width: 70,
        borderRadius: 12
    },

    addressContent: {
        marginLeft: 15
    },

    establishmentTitle: {
        fontSize: 16,
        fontFamily: 'Quicksand-Bold',
        color: '#131313',
    },

    addressStore: {
        position: 'absolute',
        bottom: '10%'
    },

    establishmenAdress: {
        fontSize: 13,
        fontFamily: 'Quicksand-Light',
        color: '#131313',
    }
})