// import user, { UserModel, UserModelActions, UserModelState } from "./user";

import user, { UserModel } from "./user";

// export interface StoreModelState {
//   user : UserModel
// }

// export interface StoreModelActions {
// }

// export interface StoreModelThunks {
// }

// export interface StoreModel extends StoreModelState, StoreModelActions, StoreModelThunks{};

// const model: StoreModel  = {
//   user,
// }

// export default model;

export interface StoreModel {
  user: UserModel
}

const model: StoreModel = {
  user,
}

export default model;