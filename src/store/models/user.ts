import { Action, action } from "easy-peasy";
import { LoginResponse } from "../../models/user/loginResponse";

// export interface UserModelState {
//   userName: string | undefined,
//   email: string | undefined, 
// }

// export interface UserModelActions {
//   setUser: Action<this, LoginResponse>;
// }

// export interface UserModelThunks {
// }

// export interface UserModel extends UserModelState, UserModelActions, UserModelThunks{};

export interface UserModel {
  userName: string | undefined,
  email: string | undefined, 
  // setUser: Action<UserModel, LoginResponse>;
};



const user: UserModel  = {
  userName: undefined,
  email: undefined,
  // setUser: action((state, payload) => {
  //   state.userName = payload.userName;
  //   state.email = payload.email;
  // }),
}

export default user;
