export interface UserModelState {
  userName: string,
  email: string,
}

export interface UserModelActions {
}

export interface UserModelThunks {
}

export interface UserModel extends UserModelState, UserModelActions, UserModelThunks{};

const user: UserModel  = {
  userName: 'toto',
  email: 'admin@mail.com',
}

export default user;
