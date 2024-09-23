import user, { UserModelState } from "./user";

export interface StoreModelState {
  user : UserModelState
}

export interface StoreModelActions {
}

export interface StoreModelThunks {
}

export interface StoreModel extends StoreModelState, StoreModelActions, StoreModelThunks{};

const model: StoreModel  = {
  user : user,
}

export default model;
