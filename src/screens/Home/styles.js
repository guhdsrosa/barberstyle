import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    menuContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        marginHorizontal: 20,
        paddingTop: 10
    },

    userContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20
    },

    userLogo: {
        width: 65,
        height: 65,
        borderRadius: 100,
    },

    userTextContent: {
        marginLeft: 16
    },

    userHello: {
        fontFamily: 'Quicksand-Bold',
        color: '#131313',
        fontSize: 24
    },

    userName: {
        fontFamily: 'Quicksand-Medium',
        color: '#131313',
        fontSize: 24
    },

    filterHeader: {
        alignSelf: 'center'
    },

    filterLogo: {
        tintColor: '#191622',
        width: 25,
        height: 25,
    },

    header: {
        marginVertical: 30,
        marginHorizontal: 20,
    },

    titleText: {
        fontFamily: 'Quicksand-SemiBold',
        color: '#fff',
        fontSize: 16
    },

    searchbarStyle: {
        borderRadius: 50,
        marginHorizontal: 20,
        backgroundColor: '#f2f2f2',
    },

    body: {
        marginVertical: 20
    },

    bodyContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginHorizontal: 20,
    },

    seeAllContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    seeAllIcon: {
        paddingTop: 4,
        marginLeft: 3
    },

    touchStore: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 15,
        marginRight: 6,
        marginLeft: 6,
        marginBottom: 25,
        flex: 1,

        shadowColor: "#131313",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },

    storeImage: {
        width: 177,
        height: 183,
        borderRadius: 20,
    },

    textContent: {
        paddingLeft: 9,
        marginTop: 8,
    },

    textStore: {
        fontFamily: 'Quicksand-SemiBold',
        color: '#131313'
    },

    descriptionStore: {
        fontFamily: 'Quicksand-Medium',
        color: '#131313',
    }
})