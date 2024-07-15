import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    shareLink: {
      marginTop: 10,
    },
    copyShareLink: {
      fontWeight: 'bold',
      marginTop: 10
    },
    logoContainer: {
        height: 150,
        width: 190
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        height: '100%',
        backgroundColor: '#F2F2F2'
    },
    containerItem: {
        flex:1, 
        width: '50%',
    },
    buttonsContainer: {
      marginTop: 30
    },
    instructionsLabel: {
      marginTop: 20,
      marginBottom: 20
    },  
    cancelButton: {
        marginTop: 10, 
        color:'#2196F3',
        textDecorationLine: 'underline'
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22
    },
    modalView: {
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
      maxWidth: 500,
      width: '100%'
    },
    modalText: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 20
    },
  });