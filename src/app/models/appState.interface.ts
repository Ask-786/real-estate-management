import { EnquiryStateInterface } from './../modules/enquiries/model/enquiryState.interface';
import { GlobalStateInterface } from '../shared/models/globalStateInterface';
import { AuthenticationStateInterface } from './../modules/authentication/models/authenticationStateInterface';
import { PropertyStateInterface } from './../modules/properties/model/propertyState.interface';
import { NotificationStateInterface } from '../modules/notifications/model/notificationState.interface';

export interface AppStateInterface {
  properties: PropertyStateInterface;
  authentication: AuthenticationStateInterface;
  global: GlobalStateInterface;
  enquiries: EnquiryStateInterface;
  notifications: NotificationStateInterface;
}
