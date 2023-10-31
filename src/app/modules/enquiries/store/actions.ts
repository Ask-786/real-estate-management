import { EnquiryDiscussionInterface } from './../model/enquiryDiscussion.interfact';
import {
  CreateEnquiryFormInterface,
  EnquiryModelInterface,
  PropertyPopulatedEnquiryModelInterface,
} from './../model/enquiryform.interface';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const EnquiriesAction = createActionGroup({
  source: '[Enquiries]',
  events: {
    'Create Enquiry': props<{ data: CreateEnquiryFormInterface }>(),
    'Create Enquiry Success': props<{
      createdEnquiry: EnquiryModelInterface;
    }>(),
    'Get Enquiries': emptyProps(),
    'Create Enquiry Failure': emptyProps(),
    'Get Enquiries Success': props<{
      enquiries: PropertyPopulatedEnquiryModelInterface[];
    }>(),
    'Get Enquiries Failure': emptyProps(),
    'Get User Enquiries': emptyProps(),
    'Get User Enquiries Success': props<{
      enquiries: PropertyPopulatedEnquiryModelInterface[];
    }>(),
    'Get User Enquiries Failure': emptyProps(),
    'Get One Enquiry': props<{ id: string }>(),
    'Get One Enquiry Success': props<{
      enquiry: PropertyPopulatedEnquiryModelInterface;
      discussions: EnquiryDiscussionInterface[];
    }>(),
    'Get One Enquiry Failure': emptyProps(),
    'Got New Message': props<{
      newMessage: EnquiryDiscussionInterface;
    }>(),
    'Sent New Message': props<{
      newMessage: EnquiryDiscussionInterface;
    }>(),
  },
});
