import React, { useState } from "react";
import { View, Image, TouchableOpacity, Alert, Linking, Modal, Text, Pressable, Button } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import AuthService from "../../services/authService";
import { ApiService } from "../../services/apiService";
import { AxiosError } from "axios";
import Constants from "../../constants";
import { style } from "./style";
import { Onboarding } from "../Onboarding/onboarding";

WebBrowser.maybeCompleteAuthSession();

const Authentication = () => {
    const [onboardingModalVisible, setOnboardingModalVisible] = useState(false);
    const [idToken, setIdToken] = useState<string>("");
    const [accessToken, setAccessToken] = useState<string>("");

    const getClientSecret = () => {
        return "";
    };

    const [_request, response, promptAsync] = Google.useAuthRequest({
        responseType: "code",
        clientSecret: getClientSecret(),        
        webClientId: Constants.GoogleAuth.webClientId,
        scopes: [
            'email', 
            'profile',
            'openid',
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/drive.metadata.readonly',
            'https://www.googleapis.com/auth/drive'
        ],
    });

    /*
        The supported scenarios are:
        1. No token in local storage --> proceed to show authentication screen.
        2. Token is acquired but the call to the backend returns not found --> the user
            needs to be onboarded (first time).
        3. Token is acquired and the call to the backend returns the user --> refresh the 
            page so App.tsx can redirect to the Patient ir Provider pages accordingly.
    */
    async function processAuthResponse() {
        if (!response)
            return;

        if (response?.type !== "success") {
            throw new Error ("The authentication process could not be completed.");
        }

        try { 
            const _idToken = response.params["id_token"];
            const _accessToken = response?.authentication?.accessToken!;
            setIdToken(_idToken);
            setAccessToken(_accessToken);
            
            await ApiService.create.get('/personalInfo/self', {
                headers: {
                    "Authorization": _idToken
                }
            });

            // If the authentication process produced an id_token and the user was found
            // in the backend, proceed to the set the token string in the localStorage
            // and reload to the page to redirect the user to their page.
            AuthService.setCurrentAccessToken(_accessToken);
            AuthService.setCurrentUserTokenString(_idToken);
            location.reload();

        } catch (error) {

            // If the user does not exist in the database yet, proceed to show the 
            // onboarding screen.
            if ((error as AxiosError)?.response?.status === 404) {
                setOnboardingModalVisible(true);
                return;
            }  

            console.log(error);
            throw new Error("An unexpected error has occurred");
        }
    }

    React.useEffect(() => { 
        processAuthResponse();
    }, [response]);

    return (
        <>
            <View style={style.container} testID="mainContainer">
                <View style={style.innerContainer}>
                    <Image style={style.logo} source={require('./logo.png')} />

                    <Text style={style.welcomeMessage}>
                        Bienvenido a <b>HC Folder</b>! tu historial médico electrónico 
                        que te permite alamcenar, compartir y analizar tu información 
                        para el cuidado de tu salud. Inicia sesión para comenzar.
                    </Text>

                    <View style={style.loginButtonContainer}>
                        <TouchableOpacity onPress={() => {
                            promptAsync({ showInRecents: true,  });
                        }}>
                            <Image style={style.loginButton}
                                source={require('./google_logo.png')} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={style.footer}>
                    <Text style={{color: 'blue'}} 
                        onPress={() => Linking.openURL('https://www.hcpromedical.com/aviso-de-privacidad.html')}>
                        Aviso de privacidad.
                    </Text>
                    <Text>
                        Todos los derechos reservados.                        
                    </Text>
                    <Text>
                        HC Promedical ©.
                    </Text>
                </View>
            </View>

            {/* Onboarding modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={onboardingModalVisible}
                onRequestClose={() => {
                    setOnboardingModalVisible(!onboardingModalVisible);
                }}>
                <Onboarding idToken={idToken} accessToken={accessToken} />
            </Modal>
        </>
    );
}

export default Authentication;