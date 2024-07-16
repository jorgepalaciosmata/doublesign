import axios from "axios"
import AuthService from "./authService";
import Constants from "../constants";

const client = axios.create({
    baseURL: Constants.Api.baseUrl,
    headers: {
        "Authorization": AuthService.getCurrentUserTokenString()
    }
});

export const ApiService = {
    create: client
};
