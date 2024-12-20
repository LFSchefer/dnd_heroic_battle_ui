import { TokenRenewal } from "../models/user/TokenRenewal";
import axiosClient from "./AxiosClient";

export default async function renewalToken() {
    const oldTokens: TokenRenewal = {
        token: sessionStorage.getItem('access_token')!,
        refreshToken: sessionStorage.getItem('refresh_token')!,
        expiration: Number(sessionStorage.getItem('expiration')!)
    }
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    sessionStorage.removeItem('expiration');
    const {data, status} = await axiosClient.post<TokenRenewal>("/users/token-renewal", oldTokens);
    if (status === 201) {
        sessionStorage.setItem('access_token', data.token);
        sessionStorage.setItem('refresh_token', data.refreshToken);
        sessionStorage.setItem('expiration', data.expiration.toString());
    } else {
        // TODO dynamique link
        const baseURL = window.location.origin;
        window.location.replace(baseURL + "/sign-in")
    }
}