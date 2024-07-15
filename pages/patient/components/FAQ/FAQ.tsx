import {View, Text, StyleSheet} from 'react-native';

export default function FAQ() {

    return (
        <View>
            <View style={styles.mainContainer}>
                <View style={styles.paragraph}>
                    <Text style={styles.title}>Cómo cerrar mi cuenta?</Text>
                    <Text style={styles.answer}>
                        Para cerrar tu cuenta envía un correo electrónico
                        a esta dirección cuentas@hcpromedical.awsapps.com.
                    </Text>
                </View>
                
                <View style={styles.paragraph}>
                    <Text style={styles.title}>Cómo reportar un error?</Text>
                    <Text style={styles.answer}>
                        Si encuentras dificultades técnicas puedes enviar un 
                        correo electrónico a esta dirección soporte@hcpromedical.awsapps.com
                        y comenzaremos a resolver el problema.
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 20
    },
    answer: {
        marginTop: 10
    },  
    mainContainer: {
        minHeight: 700,
        height: "100%",
        backgroundColor: "#F1F2F6",
        paddingLeft: 50,
        paddingRight: 50,
        paddingTop: 30,
        paddingBottom: 30,
    },
    paragraph:{
        marginTop: 20,
        maxWidth: 600,
        width: '100%'
    }
  });
  