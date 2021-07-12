import { User } from "./user.model";

export class LoginResData {
      code: string;
      user: User;
      token: string;
      loginData: LoginData;
}

export class LoginData {
      userName: string;
      password: string;
      rememberMe: string;
}