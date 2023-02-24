import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20
    },

    menuContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1
    },

    userContent: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    userLogo: {
        width: 65, 
        height: 65,
        borderRadius: 100
    },

    userTextContent: {
        marginLeft: 16
    },

    filterHeader: {
        alignSelf: 'center'
    },

    filterLogo: {
        tintColor: '#05293c',
        width: 25,
        height: 25,
    },

    header: {
        marginVertical: 30
    },
})