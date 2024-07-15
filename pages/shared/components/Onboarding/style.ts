import { StyleSheet} from 'react-native';

export const style = StyleSheet.create({
    outerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },
    innerContainer: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: 500
    },
    title: {
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20
    },
    cancelButton: {
        float: 'left', 
        marginTop: 10, 
        marginRight: 30, 
        color:'#2196F3',
        textDecorationLine: 'underline'
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: '#2196F3',
    },
    buttonDisambiguation: {
        margin: 20,
        maxHeight: 38,
        width: 180
    },
    disamButton1: {
        flex: 1
    },
    disamButton2: {
        flex: 2
    },
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonsContainer: {
        marginTop: 30
    },
    disambiguationCta: {
        textAlign: "center", 
        marginTop: 10
    },
    disambiguationButtonsContainer: {
        height: 160, 
        display: "flex", 
        alignItems: "center"
    }
});