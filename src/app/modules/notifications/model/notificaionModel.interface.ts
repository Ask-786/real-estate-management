import { UserModelInterface } from 'src/app/shared/models/user.interface';
import { PropertyModelInterface } from '../../properties/model/property.model';
import { EnquiryModelInterface } from '../../enquiries/model/enquiryform.interface';

export interface NotificationsModelInterface {
  _id: string;
  content: string;
  title: string;
  from: UserModelInterface;
  user: string;
  type: string;
  enquiry: EnquiryModelInterface;
  property: PropertyModelInterface;
  readStatus: boolean;
  createdAt: string;
  updatedAt: string;
}
