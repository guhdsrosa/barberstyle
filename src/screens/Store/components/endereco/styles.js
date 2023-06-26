import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        marginVertical: 20
    },

    twoOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1
    },

    title: {
        color: '#141414',
        paddingHorizontal: 5,
        marginVertical: 5
    },

    textInput: {
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
    }
})

export default styles