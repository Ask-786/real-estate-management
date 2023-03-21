import { createSelector } from '@ngrx/store';
import { AppStateInterface } from './../../../models/appState.interface';

const selectFeature = (state: AppStateInterface) => state.enquiries;

export const enquiriesSelector = createSelector(
  selectFeature,
  (state) => state.enquiries
);
export const selectedEnquirySelector = createSelector(
  selectFeature,
  (state) => state.selectedEnquiry
);
