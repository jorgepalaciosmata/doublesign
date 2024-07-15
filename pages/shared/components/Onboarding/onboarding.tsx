import React, { useState } from "react";
import { IUserInfo, IUserType } from "../../interfaces/IUserInfo";
import { Pressable, Text, View } from "react-native";
import PatientDisclaimer from "../Disclaimer/patientDisclaimer";
import DoctorDisclaimer from "../Disclaimer/doctorDisclaimer";
import { style } from "./style";
import AuthService from "../../services/authService";
import { ApiService } from "../../services/apiService";
import GoogleApiService from "../../services/googleApiService";

export const Onboarding = (props: {idToken: string, accessToken: string}) => {

    const [userType, setUserType] = useState<IUserType>(IUserType.Onboarder);

    async function OnboardUser() {
        const token = AuthService.parseToken(props.idToken);
        const userInfo: IUserInfo = {
            id: token.email,
            name: token.given_name,
            firstLastName: token.family_name,
            profilePicture: token.picture,
            type: userType.toString()
        };

        AuthService.setCurrentAccessToken(props.accessToken);
        AuthService.setCurrentUserTokenString(props.idToken);

        try {
            let response = await GoogleApiService.createFolder(props.accessToken, "HC Folder");
            userInfo.folderId = response.data["id"];

            await ApiService.setPersonalInfo(userInfo);

        } catch {
            AuthService.logOut();
        }

        location.reload();
    }

    function CancelOnboarding() {
        AuthService.logOut();
    }
    
    return (
        <>  
            <View style={style.outerContainer}>
                <View style={style.innerContainer}>                    
                    {userType === IUserType.Onboarder ? (
                        <>
                            {/* disambiguation */}
                            <Text style={style.title}>HC Promedical</Text>
                            <Text style={style.disambiguationCta}>Elige tu tipo de perfil.</Text>

                            <div style={style.disambiguationButtonsContainer}>
                                <Pressable  
                                    style={[style.button, style.buttonDisambiguation]}
                                    onPress={() => {
                                        setUserType(IUserType.Patient);
                                    }}>
                                    <Text style={style.submitButtonText}>Paciente</Text>
                                </Pressable>
                                <Pressable
                                    style={[style.button, style.buttonDisambiguation]}
                                    onPress={() => {setUserType(IUserType.Doctor);}}>
                                    <Text style={style.submitButtonText}>Profesional de la salud</Text>
                                </Pressable>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* disclaimer */}
                            <Text style={style.title}>HC Promedical - Aviso de privacidad</Text>
                            
                            {userType === IUserType.Patient ? <PatientDisclaimer /> : <></> }
                            {userType === IUserType.Doctor  ? <DoctorDisclaimer /> : <></> }
                            
                            <div style={style.buttonsContainer}>
                                <Text style={style.cancelButton} onPress={() => CancelOnboarding()}>
                                    Cancelar
                                </Text>
                                <Pressable
                                    style={[style.button]}
                                    onPress={async () => OnboardUser()}>
                                    <Text style={style.submitButtonText}>Aceptar</Text>
                                </Pressable>
                            </div>
                        </>)}
                </View>
            </View>
        </>
    );
};