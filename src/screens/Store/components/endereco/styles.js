import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        marginVertical: 20
    },

    buttonAddress: { 
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 10,
        borderColor: '#0000007f'
    },

    textAddress: { 
        width: '45%',
        height: 50,
        alignSelf: 'center'
    },

    twoOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1
    },

    title: {
        color: '#181818',
        fontSize: 18,
        fontFamily: 'Quicksand-Regular',
    },
    
    textInput: {
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        color: '#181818'
    }
})

export default styles