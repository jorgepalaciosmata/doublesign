import { UserInfoContext } from "../../../shared/context/userInfoContext";
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GoogleApiService from '../../../shared/services/googleApiService';

export default function ProviderForms() {

    const userInfo = React.useContext(UserInfoContext);
    const [forms, setForms] = React.useState<object[]>([]);
    
    const getProviderForms = async () => {
        const response = GoogleApiService.listForms(userInfo?.folderId!);
        setForms((await response).data.files);
    };

    const getFormDetails = async (fileId: string) => {
        const response = await GoogleApiService.getFormDetails(fileId);
        window.open(response.data.webViewLink, '_blank');
    };

    React.useEffect(() => {
        getProviderForms();
    }, []);

    return (
        <View style={{marginTop: 20, marginLeft: 20}}>
            {forms.map((form: any) => (
                <View key={form.id} style={{ padding: 5 }}>
                    <div style={{ 
                        border: "1px solid black",
                        width: "200px",
                        padding: "10px",
                        cursor: "pointer"
                        }}>
                        <Text onPress={() => {getFormDetails(form.id)}}>
                            {form.name}
                        </Text>
                    </div>
                </View>
            ))}
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });