interface UserBase {
  username: string;
}

export interface UserLoginType extends UserBase {
  password: string;
}

export interface UserDataType extends UserBase {
  id: string;
  token: string;
  name: string;
  username: string;
}
