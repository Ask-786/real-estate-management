import { EnquiryStateInterface } from './../model/enquiryState.interface';
import { createReducer, on } from '@ngrx/store';
import * as EnquiryActions from './actions';

const initialState: EnquiryStateInterface = {
  enquiries: [],
  ownEnquiries: [],
  selectedEnquiry: null,
};

export const reducers = createReducer(
  initialState,
  on(EnquiryActions.getEnquiriesSuccess, (state, action) => ({
    ...state,
    enquiries: action.enquiries,
  })),
  on(EnquiryActions.getOneEnquirySuccess, (state, action) => ({
    ...state,
    selectedEnquiry: action.enquiry,
  }))
);
