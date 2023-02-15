import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16
    },

    menuContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        alignItems: 'center'
    },

    menuTitle: {
        color: '#000',
        fontSize: 30,
        fontWeight: '600',
    },

    loginTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#FA5300',
    },

    inputContainer: {
        marginTop: 32
    },

    inputText: {
        borderWidth: 1.5,
        borderColor: '#E8E8E8',
        color: '#BDBDBD',
        fontWeight: '500',
        borderRadius: 12,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 10,
        paddingVertical: 7,
        paddingVertical: 10,
        backgroundColor: '#F6F6F6'
    },

    servicesConfirm: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 35
    },

    checkText: {
        color: '#666666',
    },

    checkTextServices: {
        color: '#C64200',
    },

    buttonConfirm: {
        position: 'absolute',
        bottom: 49,
        alignSelf: 'center',
        backgroundColor: '#FA5300',
        width: '100%',
        borderRadius: 100
    },

    buttonConfirmText: {
        textAlign: 'center',
        marginVertical: 16,
        color: '#fff',
        fontSize: 16,
        fontWeight: '600'
    }
})