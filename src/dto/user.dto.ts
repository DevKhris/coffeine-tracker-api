export type createUserDTO = {
  username: string;
  password: string;
  email: string;
};

export type updateUserDTO = {
  username?: string;
  password?: string;
  email?: string;
};
