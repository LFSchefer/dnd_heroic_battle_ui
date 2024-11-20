import axios from "axios";
import { SignInForm } from "../models/user/SignInForm";
import axiosClient from "./AxiosClient";

export default class UserService {

    static signIn = async (input: SignInForm) => {
        try {
            const { data } = await axiosClient.post("/users", input);
            return data;
        } catch (error) {
            if(axios.isAxiosError(error)) {
                return {
                    error: error.code
                }
            } 
                return {
                    error: 'error'
                }
        }
    }
}