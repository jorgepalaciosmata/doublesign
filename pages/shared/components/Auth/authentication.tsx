import React, { useState } from "react";
import { View, Image, TouchableOpacity, Alert, Linking, Modal, Text, Pressable, Button } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import AuthService from "../../services/authService";
import { AxiosError } from "axios";
import Constants from "../../constants";
import { style } from "./style";

WebBrowser.maybeCompleteAuthSession();

const Authentication = () => {
    const [onboardingModalVisible, setOnboardingModalVisible] = useState(false);
    const [idToken, setIdToken] = useState<string>("");
    const [accessToken, setAccessToken] = useState<string>("");

    const getClientSecret = () => {
        return "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";
    };

    const [_request, response, promptAsync] = Google.useAuthRequest({
        responseType: "code",
        clientSecret: getClientSecret(),        
        webClientId: Constants.GoogleAuth.webClientId,
        scopes: [
            'email', 
            'profile',
            'openid',
            'https://www.googleapis.com/auth/user.birthday.read',
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
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
                    <Text style={style.welcomeMessage}>
                        Welcome to Double Sign, signin with Google to know about more about yourself and explore compatibility.
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
                    <Text>
                        © 2024 DoubleSign
                    </Text>
                </View>
            </View>
        </>
    );
}

export default Authentication;