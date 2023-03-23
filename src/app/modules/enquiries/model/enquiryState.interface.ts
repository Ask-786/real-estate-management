import { EnquiryDiscussionInterface } from './enquiryDiscussion.interfact';
import { PropertyPopulatedEnquiryModelInterface } from './enquiryform.interface';

export interface EnquiryStateInterface {
  enquiries: PropertyPopulatedEnquiryModelInterface[];
  userEnquiries: PropertyPopulatedEnquiryModelInterface[];
  selectedEnquiry: SelectedEnquiryDataInterface;
}

export interface SelectedEnquiryDataInterface {
  enquiry: PropertyPopulatedEnquiryModelInterface | null;
  discussons: EnquiryDiscussionInterface[];
}
