import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingHorizontal: 20, 
    width: "95%", 
    maxWidth: 400, 
    marginTop: 20, 
    marginBottom: 30, 
    borderRadius: 8,
    alignSelf: "center",
  },
  Textinput: {
    borderWidth: 1.5,
    marginBottom: 25, 
    height: 50,
    alignSelf:"auto",
    width: "100%", 
    borderRadius: 8,
    color: "#1E436F",
    borderColor:"#73859A",
    paddingLeft: 11,
    placeholderTextColor:"gray"
  },
  SubtitleText: {
    fontSize: 15,
    paddingBottom: 20, 
    paddinginTop: -5, 
    alignSelf:"auto",
    color: "#1E436F",
  },
  missingField: {
    position: 'relative',
    borderRadius: 8,
    borderColor:'#E20902',
    borderWidth: 2,
  },
  errorMessage:{
    color:"#E20902",
    paddingLeft:"45%",
    top: -10,
   

  },

  button: {
    backgroundColor: "#007bff",
    borderRadius: 20,
    alignItems: "center",
    width: "100%", 
    height: 40,
    marginTop: 20,
    marginBottom: 12,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    paddingVertical: 10,
    fontWeight: 'bold',
    
  },
  title: {
    fontSize: 35, 
    fontWeight: 'bold',
    color: "#1E436F",
    paddingVertical: "1%",
    paddingLeft:"23%",
    
  },
  label: {
    position: 'absolute',
    top: -30,
    left: 10,
    color: "#1E436F",
    paddingHorizontal: 10,
    backgroundColor: 'white',
    transform: [{ translateY: 20 }],
    fontSize: 13,
    zIndex: 1,
    fontWeight: 'bold'
  },
  inputdropdown: {
    width: "80%", // Cambiar a un ancho del 80% del contenedor
    color: "#121855",
    paddingLeft: 11,
    fontSize: 15,
  }
});

export default styles;