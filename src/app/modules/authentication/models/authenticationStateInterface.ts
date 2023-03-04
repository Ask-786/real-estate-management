import { UserModelInterface } from './../../../shared/models/User';

export interface AuthenticationStateInterface {
  isLoggedIn: boolean;
  token: string | null;
  user: UserModelInterface | null;
  isLoading: boolean;
  registeredUser: UserModelInterface | null;
}
