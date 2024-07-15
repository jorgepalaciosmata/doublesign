import { StyleSheet} from 'react-native';

export const style = StyleSheet.create({
    title: {
        fontSize: 20
    },
    mainContainer: {
        minHeight: 700,
        height: "100%",
        backgroundColor: 'white',
        paddingLeft: 50,
        paddingRight: 50,
        paddingTop: 30,
        paddingBottom: 30,
    },
    paragraph:{
        marginTop: 20,
        maxWidth: 300,
        width: '100%'
    },

    // --------------------------------------
    // Artifact Card
    // --------------------------------------

    artifactCardContainer: {
        width: 300,
        height: 60,
        borderCurve: "circular",
        borderRadius: 10,
        padding: 5,
        flexDirection: 'row',
        backgroundColor: '#FFF',
        marginTop: 10
    },
    artifactCardLogoContainer: {
        backgroundColor: "#F1F2F6",
        borderRadius: 10,
        flex: 1,
    },
    artifactCardMetadataContainer: {
        flex: 5,
        marginLeft: 15,
        justifyContent: 'center'
    },
    artifactCardName: {
        fontWeight: 'bold'
    },
    artifactCardCreated: {
        color: "#8f8f8f"
    }
  });
  