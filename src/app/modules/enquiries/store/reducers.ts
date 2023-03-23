import {
  EnquiryStateInterface,
  SelectedEnquiryDataInterface,
} from './../model/enquiryState.interface';
import { createReducer, on } from '@ngrx/store';
import * as EnquiryActions from './actions';

const selectedEnquiryInitialState: SelectedEnquiryDataInterface = {
  enquiry: null,
  discussons: [],
};

const initialState: EnquiryStateInterface = {
  enquiries: [],
  userEnquiries: [],
  selectedEnquiry: selectedEnquiryInitialState,
};

export const reducers = createReducer(
  initialState,
  on(EnquiryActions.getEnquiriesSuccess, (state, action) => ({
    ...state,
    enquiries: action.enquiries,
  })),
  on(EnquiryActions.getOneEnquirySuccess, (state, action) => {
    return {
      ...state,
      selectedEnquiry: {
        enquiry: action.enquiry,
        discussons: action.discussions,
      },
    };
  }),
  on(EnquiryActions.getUserEnquiriesSuccess, (state, action) => ({
    ...state,
    userEnquiries: action.enquiries,
  })),
  on(EnquiryActions.gotNewMessage, (state, action) => ({
    ...state,
    selectedEnquiry: {
      ...state.selectedEnquiry,
      discussons: [...state.selectedEnquiry.discussons, action.newMessage],
    },
  })),
  on(EnquiryActions.sentNewMessage, (state, action) => ({
    ...state,
    selectedEnquiry: {
      ...state.selectedEnquiry,
      discussons: [...state.selectedEnquiry.discussons, action.newMessage],
    },
  }))
);
