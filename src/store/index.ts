import { userStoreModel, UserStoreModel } from "./models/user.model";

export interface StoreModel {
    user: UserStoreModel
}

export const storeModel: StoreModel = {
    user: userStoreModel,
}

