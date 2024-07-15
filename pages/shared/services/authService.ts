
import { jwtDecode, JwtPayload } from 'jwt-decode';

const userItemKey = "user";
const accessTokenKey = "access_token";

// This is done to extend the JwtPayload to match the values from the
// Google token schema that we are using. This interface is intended
// to be the token contract when adding additional identity providers.
interface JwtToken extends JwtPayload {
    given_name: string,
    family_name: string,
    picture: string,
    email: string,
}

function getCurrentUserTokenString(): string {
    try {
        return localStorage.getItem(userItemKey) ?? "";
    } catch (e) {
        console.log(e);
        throw new Error("There was an error retrieving the token.");
    }
}

function getCurrentUserToken(): JwtToken {
    try {
        const userTokenValue = localStorage.getItem(userItemKey) ?? "";
        return jwtDecode(userTokenValue) as JwtToken;
    } catch (e) {
        console.log(e);
        throw new Error("Token not found");
    }
}

function parseToken(idToken: string): JwtToken {
    return jwtDecode(idToken) as JwtToken;
}

function setCurrentUserTokenString(jwtToken: string) {
    localStorage.setItem(userItemKey, jwtToken);
}

function setCurrentAccessToken(accessToken: string) {
    localStorage.setItem(accessTokenKey, accessToken);
}

function getCurrentAccessToken()
{
    return localStorage.getItem(accessTokenKey);
}

function logOut() {
    localStorage.removeItem(userItemKey);
    localStorage.removeItem(accessTokenKey);
    location.href = location.host;
    location.reload();
}

const AuthService = {
    parseToken,
    getCurrentUserTokenString,
    setCurrentUserTokenString,
    getCurrentAccessToken,
    setCurrentAccessToken,
    getCurrentUserToken,
    logOut
}

export default AuthService;