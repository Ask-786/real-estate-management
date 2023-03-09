import { UserModelInterface } from '../../../shared/models/user.interface';

export interface AuthenticationStateInterface {
  registeredUser: UserModelInterface | null;
}
