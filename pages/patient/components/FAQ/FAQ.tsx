import {View, Text, StyleSheet} from 'react-native';

export default function FAQ() {

    return (
        <View>
            <View style={styles.mainContainer}>
                <View style={styles.paragraph}>
                    <Text style={styles.title}>About DoubleSign</Text>
                    <Text style={styles.answer}>
                        DoubleSign connects you with compatible friends through astrology, comics, matchmaking and social networking by horoscope.
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
  