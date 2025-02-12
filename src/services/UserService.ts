import axios from "axios";
import { SignInForm } from "../models/user/SignInForm";
import axiosClient from "./AxiosClient";
import { signUpForm } from "../models/user/signUpForm";
import { SignInResponse } from "../models/user/SignInResponse";

export default class UserService {


    static signUp = async (input: signUpForm) => {
        try {
            const {data} = await axiosClient.post("/users", input)
            return data;
        } catch (error) {
            if ( axios.isAxiosError(error)) {
                return {error: error.code}
            }
            return console.error("oups")
        }
    }

    static signIn = async (input: SignInForm): Promise<SignInResponse> => {
        try {
            const { data } = await axiosClient.post("/users/sign-in", input);
            return data;
        } catch (error) {
            if(axios.isAxiosError(error)) {
                return {
                    userName: undefined,
                    email: undefined,
                    tokens: undefined,
                    error: error.code
                }
            } 
                return {
                    userName: undefined,
                    email: undefined,
                    tokens: undefined,
                    error: 'error'
                }
        }
    }
}