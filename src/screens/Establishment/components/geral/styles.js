import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },

    header: {
        minHeight: 50
    },

    storePhoto: {
        width: '100%',
        height: 305,
    },

    storeName: {
        color: '#000',
        alignSelf: 'flex-start',
        fontSize: 30,
        fontFamily: 'Quicksand-Regular',
        marginHorizontal: 15,
        marginVertical: 10
    },

    body: {
        marginHorizontal: 15
    },

    options: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

    optionsText: {
        fontSize: 16,
        //color: '#000',
        fontFamily: 'Quicksand-SemiBold',
    },

    //services
    cardServiceContainer: {
        paddingVertical: 10
    },

    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#181818',
        marginVertical: 10
    },

    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        alignItems: 'center',
        marginBottom: 50,
    },



    buttomAdd: {
        textAlign: 'center',
        backgroundColor: '#29ddc9',
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 10
    },

    text: {
        color: '#181818'
    },

    //Modal

    inputModal: {
        maxWidth: '90%',
        minWidth: '90%',
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 10,
        marginVertical: 5,
        borderColor: '#000000af'
    },

    titleModal: {
        color: '#181818',
        textAlign: 'center',
        fontSize: 17,
        marginBottom: 10
    },

    //Infor
    infoText: {
        color: '#000',
        fontWeight: 'bold',
    },

    inputInfoText: {
        color: '#000',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 2,
        marginBottom: 20,
        paddingHorizontal: 10
    }
})

export default styles