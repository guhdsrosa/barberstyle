import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    header: {
        marginHorizontal: 6,
        paddingBottom: 20,
    },

    filterHeader: {
        marginRight: 16,
        marginTop: 10
    },

    filterText: {
        color: '#FA5300',
        fontWeight: '500',
        fontSize: 16,
        textAlign: 'right',
    },

    titleContent: {
        textAlign: 'center',
        marginTop: 11,
        marginBottom: 18,
        color: '#000',
        fontWeight: '600',
        fontSize: 24
    },

    searchbarStyle: {
        marginHorizontal: 10,
        borderRadius: 100
    },

    bodyContainer: {
        marginHorizontal: 6
    },

    touchStore: {
        backgroundColor: '#fdfdfd',
        borderRadius: 8,
        marginBottom: 10,
        flexDirection: 'row',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },

    storeImage: {
        height: 110,
        width: 110,
        borderRadius: 8,
        marginRight: 5,
        alignSelf: 'center'
    },

    textContent: {
        width: '70%',
        marginVertical: 10
    },  

    textStore: {
        color: '#000',
        fontSize: 17,
        fontWeight: '600',
    },

    descriptionStore: {
        color: '#000',
        fontSize: 15,
        marginTop: 3,
        marginLeft: 3
    },

    iconStore: {
        alignSelf: 'center',
        backgroundColor: '#000',
        position: 'absolute',
        right: 140
    },
})