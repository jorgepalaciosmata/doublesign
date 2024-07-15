import axios from "axios";
import Constants from "../constants";
import AuthService from "./authService";

const createClient = (params: object, accessToken: string) => {
    return axios.create({
        baseURL: 'https://www.googleapis.com/',
        headers: { 
            "Authorization": `Bearer ${accessToken}`,
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        params: params
    });
};

enum MimeTypes {
    folder = "application/vnd.google-apps.folder"
}

const createFolder = async (accessToken: string, folderName: string) => {     
    
    let params = {
        "ignoreDefaultVisibility": true,
        "includeLabels": "uno",
        "keepRevisionForever": true,
        "supportsAllDrives": true,
        "supportsTeamDrives": true,
        "useContentAsIndexableText": true,
        "key": Constants.GoogleAuth.webClientId,
    };

    let client = createClient(params, accessToken);
    
    const response = (await client.post("drive/v3/files", {
        "mimeType": MimeTypes.folder,
        "name": folderName
    }));

    return response;
}

// const createAndOpenForm = async () => {
//     let client = axios.create({
//         baseURL: 'https://www.googleapis.com/',
//         headers: { 
//             "Authorization": `Bearer ${AuthService.getCurrentAccessToken()}`,
//             "Accept": "application/json",
//             "Content-Type": "application/json",
//         },
//         params: {
//             "ignoreDefaultVisibility": true,
//             "keepRevisionForever": true,
//             "supportsAllDrives": true,
//             "supportsTeamDrives": true,
//             "useContentAsIndexableText": true,
//             "key": Constants.GoogleAuth.webClientId,
//         }
//     });
    
//     await client.post("drive/v3/files", {
//         "mimeType": "application/vnd.google-apps.form",
//         "name": "HC Forma Dos",
//         "parents": [hcfolderId]
//     }).then(async (response) => {
//         const formId = response.data["id"];
//         var formDetails = await getFormDetails(formId);

//         window.open(formDetails.data["webViewLink"], '_blank');
//     });

// };

const getFormDetails = async (fileId: string ) => {
    let client = axios.create({
        baseURL: 'https://www.googleapis.com/',
        headers: { 
            "Authorization": `Bearer ${AuthService.getCurrentAccessToken()}`,
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        params: {
            "key": Constants.GoogleAuth.webClientId,
            "fields": "webViewLink"
        }
    });
    const response = (await client.get("drive/v3/files/" + fileId));
    console.log(response);
    return response;
};

const listForms = async (hcfolderId: string) => {
    const query = "mimeType='application/vnd.google-apps.form'" +
        "parents in '" + hcfolderId +"'";

    let client = axios.create({
        baseURL: 'https://www.googleapis.com/',
        headers: { 
            "Authorization": `Bearer ${AuthService.getCurrentAccessToken()}`,
            "Accept": "application/json"
        },
        params: {
            "key": Constants.GoogleAuth.webClientId,
            "q": "parents in '" + hcfolderId + "' and mimeType='application/vnd.google-apps.form'"
        }
    });
    const response = await client.get("drive/v3/files");
    console.log(response);
    return response;
}

const GoogleApiService = {
    createFolder,
    listForms,
    getFormDetails
};

export default GoogleApiService;