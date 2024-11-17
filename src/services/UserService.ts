import axios from "axios";
import { LoginForm } from "../models/user/loginForm";
import axiosClient from "./AxiosClient";
import { LoginResponse } from "../models/user/loginResponse";

export default class UserService {

    static login = async (input: LoginForm) => {
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