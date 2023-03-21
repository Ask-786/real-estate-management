import { MaterialModule } from './../material/material.module';
import { EnquiryEffects } from './store/effects';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './store/reducers';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnquiriesRoutingModule } from './enquiries-routing.module';
import { EnquiriesComponent } from './enquiries.component';
import { EnquiryComponent } from './components/enquiry/enquiry.component';
import { EnquiryDetailsComponent } from './components/enquiry-details/enquiry-details.component';
import { EnquiryReplayDialogComponent } from './components/enquiry-replay-dialog/enquiry-replay-dialog.component';
import { DiscussionComponent } from './components/discussion/discussion.component';

@NgModule({
  declarations: [EnquiriesComponent, EnquiryComponent, EnquiryDetailsComponent, EnquiryReplayDialogComponent, DiscussionComponent],
  imports: [
    MaterialModule,
    CommonModule,
    EnquiriesRoutingModule,
    StoreModule.forFeature('enquiries', reducers),
    EffectsModule.forFeature([EnquiryEffects]),
  ],
})
export class EnquiriesModule {}
