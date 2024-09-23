export interface UserModelState {
  name: string,
  course: string,
}

export interface UserModelActions {
}

export interface UserModelThunks {
}

export interface UserModel extends UserModelState, UserModelActions, UserModelThunks{};

const user: UserModel  = {
  name: 'lf',
  course: 'easy-peasy',
}

export default user;
