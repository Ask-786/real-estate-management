import { EnquiryDiscussionInterface } from './../model/enquiryDiscussion.interfact';
import {
  CreateEnquiryFormInterface,
  EnquiryModelInterface,
  PropertyPopulatedEnquiryModelInterface,
} from './../model/enquiryform.interface';
import { createAction, props } from '@ngrx/store';

export const createEnquiry = createAction(
  '[Enquiries] Create Enquiry',
  props<{ data: CreateEnquiryFormInterface }>()
);

export const createEnquirySuccess = createAction(
  '[Enquiries] Create Enquiry Success',
  props<{ createdEnquiry: EnquiryModelInterface }>()
);
export const createEnquiryFailure = createAction(
  '[Enquiries] Create Enquiry Failure'
);
export const getEnquiries = createAction('[Enquiries] Get Enquiries');
export const getEnquiriesSuccess = createAction(
  '[Enquiries] Get Enquiries Success',
  props<{ enquiries: PropertyPopulatedEnquiryModelInterface[] }>()
);
export const getEnquiriesFailure = createAction(
  '[Enquiries] Get Enquiries Failure'
);

export const getUserEnquiries = createAction('[Enquiries] Get User Enquiries');
export const getUserEnquiriesSuccess = createAction(
  '[Enquiries] Get User Enquiries Success',
  props<{ enquiries: PropertyPopulatedEnquiryModelInterface[] }>()
);
export const getUserEnquiriesFailure = createAction(
  '[Enquiries] Get User Enquiries Failure'
);

export const getOneEnquiry = createAction(
  '[Enquiries] Get One Enquiry',
  props<{ id: string }>()
);
export const getOneEnquirySuccess = createAction(
  '[Enquiries] Get One Enquiry Success',
  props<{
    enquiry: PropertyPopulatedEnquiryModelInterface;
    discussions: EnquiryDiscussionInterface[];
  }>()
);
export const getOneEnquiryFailure = createAction(
  '[Enquiries] Get One Enquiry Failure'
);

export const gotNewMessage = createAction(
  '[Enquiries] Got New Message',
  props<{ newMessage: EnquiryDiscussionInterface }>()
);

export const sentNewMessage = createAction(
  '[Enquiries] Sent New Message',
  props<{ newMessage: EnquiryDiscussionInterface }>()
);
