import { TokenRenewal } from "../models/user/TokenRenewal";
import axiosClient from "./AxiosClient";

export default async function renewalToken(url: string) {
    const oldToken = sessionStorage.getItem('access_token');
    sessionStorage.removeItem('access_token');
    const {data, status} = await axiosClient.post<TokenRenewal>(url, oldToken);
    return {status, data}
}