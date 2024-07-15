import { StyleSheet} from 'react-native';

export const style = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    width: '100%',
    backgroundColor: '#F7F7F7'
  },
  logo: {
    width: 190, 
    height: 150
  },
  welcomeMessage: {
    width: '100%', 
    maxWidth: 400,
    marginTop: 20
  },
  innerContainer: {
    alignContent: 'center',
    alignItems: 'center'
  },
  loginButtonContainer: {
    marginTop: 50, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  loginButton: {
    width: 191, 
    height:46
  },
  footer: {
    width: '100%', 
    marginBottom: 20, 
    textAlign: 'center', 
    position: 'absolute', 
    bottom: 0,
    alignContent: 'center',
    alignItems: 'center'
  },  
    cancelButton: {
        float: 'left', 
        marginTop: 10, 
        marginRight: 30, 
        color:'#2196F3',
        textDecorationLine: 'underline'
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
      width: 500
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 20
    },
  });