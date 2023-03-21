import {
  EnquiryModelInterface,
  PropertyPopulatedEnquiryModelInterface,
} from './enquiryform.interface';

export interface EnquiryStateInterface {
  enquiries: PropertyPopulatedEnquiryModelInterface[];
  ownEnquiries: EnquiryModelInterface[];
  selectedEnquiry: PropertyPopulatedEnquiryModelInterface | null;
}
