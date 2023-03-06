import { GlobalStateInterface } from '../shared/models/globalStateInterface';
import { AuthenticationStateInterface } from './../modules/authentication/models/authenticationStateInterface';
import { PropertyStateInterface } from './../modules/properties/model/propertyState.interface';

export interface AppStateInterface {
  properties: PropertyStateInterface;
  authentication: AuthenticationStateInterface;
  global: GlobalStateInterface;
}
