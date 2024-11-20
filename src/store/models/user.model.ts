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
    setUser: action((state, payload) => {
        state.userName = payload.userName;
        state.email = payload.email;
        state.isLogin = true;
    }),
    logout: action((state) => {
        state.userName = undefined;
        state.email = undefined;
        state.isLogin = false;
    })
}