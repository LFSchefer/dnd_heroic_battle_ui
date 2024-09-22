export interface StoreModelState {
  name: string,
  course: string,
}

export interface StoreModelActions {
}

export interface StoreModelThunks {
}

export interface StoreModel extends StoreModelState, StoreModelActions, StoreModelThunks{};

const model: StoreModel  = {
  name: 'lf',
  course: 'easy-peasy',
}

export default model;
