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
        color: '#14fff4',
        fontSize: 24
    },

    userName: {
        fontFamily: 'Quicksand-Medium',
        color: '#fff',
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
        borderRadius: 10,
        //padding: 15,
        marginRight: 6,
        marginLeft: 6,
        maxWidth: 177
    },

    storeImage: {
        width: 177,
        height: 183,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignSelf: 'center',
        marginBottom: 5,
        marginHorizontal: 5
    },

    textContent: {
        paddingLeft: 9,
        paddingBottom: 20
    },

    textStore: {
        fontFamily: 'Quicksand-Medium',
        color: '#131313',
        paddingRight: 9
    },

    descriptionStore: {
        fontFamily: 'Quicksand-Light',
        color: '#131313',
    },

    starContent: {
        flexDirection: 'row',
        position: 'absolute',
        right: 10,
        bottom: 10
    }
})