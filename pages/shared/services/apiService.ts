import axios from "axios"
import AuthService from "./authService";
import Constants from "../constants";
import { IUserInfo } from "../interfaces/IUserInfo";

const client = axios.create({
    baseURL: Constants.Api.baseUrl,
    headers: {
        "Authorization": AuthService.getCurrentUserTokenString()
    }
});

function getPersonalInfo() {
    return client.get('/personalInfo/self');
}


function setPersonalInfo(userInfo: IUserInfo) {

    var client_ = axios.create({
        baseURL: Constants.Api.baseUrl,
        headers: {
            "Authorization": AuthService.getCurrentUserTokenString()
        }
    });

    return client_.post('/personalinfo', userInfo);
}

export const ApiService = {
    create: client,
    getPersonalInfo,
    setPersonalInfo,
};
