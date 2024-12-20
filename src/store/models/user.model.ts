import { action, Action } from "easy-peasy";
import { SignInResponse } from "../../models/user/SignInResponse";

export interface UserStoreModel {
    userName: string | undefined,
    email: string | undefined,
    isLogin: boolean,
    setUser: Action<UserStoreModel, SignInResponse>,
    logout: Action<UserStoreModel>,
}

export const userStoreModel: UserStoreModel = {
    userName: undefined,
    email: undefined,
    isLogin: false,
    setUser: action((state, payload: SignInResponse) => {
        state.userName = payload.userName;
        state.email = payload.email;
        state.isLogin = true;
        sessionStorage.setItem('access_token',payload.tokens?.token!);
        sessionStorage.setItem('refresh_token',payload.tokens?.refreshToken!);
        if (payload.tokens?.expiration ) {
            sessionStorage.setItem('expiration', payload.tokens?.expiration!.toString());
        }
    }),
    logout: action((state) => {
        state.userName = undefined;
        state.email = undefined;
        state.isLogin = false;
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('refresh_token');
        sessionStorage.removeItem('expiration');
    })
}