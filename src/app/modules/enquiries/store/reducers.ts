import {
  EnquiryStateInterface,
  SelectedEnquiryDataInterface,
} from './../model/enquiryState.interface';
import { createReducer, on } from '@ngrx/store';
import { EnquiriesAction } from './actions';

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
  on(EnquiriesAction.getEnquiriesSuccess, (state, action) => ({
    ...state,
    enquiries: action.enquiries,
  })),
  on(EnquiriesAction.getOneEnquirySuccess, (state, action) => {
    return {
      ...state,
      selectedEnquiry: {
        enquiry: action.enquiry,
        discussons: action.discussions,
      },
    };
  }),
  on(EnquiriesAction.getUserEnquiriesSuccess, (state, action) => ({
    ...state,
    userEnquiries: action.enquiries,
  })),
  on(EnquiriesAction.gotNewMessage, (state, action) => ({
    ...state,
    selectedEnquiry: {
      ...state.selectedEnquiry,
      discussons: [...state.selectedEnquiry.discussons, action.newMessage],
    },
  })),
  on(EnquiriesAction.sentNewMessage, (state, action) => ({
    ...state,
    selectedEnquiry: {
      ...state.selectedEnquiry,
      discussons: [...state.selectedEnquiry.discussons, action.newMessage],
    },
  })),
);
