import { UserModelInterface } from '../../../shared/models/user.interface';

export interface AuthenticationStateInterface {
  isLoggedIn: boolean;
  token: string | null;
  user: UserModelInterface | null;
  registeredUser: UserModelInterface | null;
}
