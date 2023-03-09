import { EnquiryEffects } from './store/effects';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './store/reducers';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnquiriesRoutingModule } from './enquiries-routing.module';
import { EnquiriesComponent } from './enquiries.component';
import { EnquiryComponent } from './components/enquiry/enquiry.component';

@NgModule({
  declarations: [EnquiriesComponent, EnquiryComponent],
  imports: [
    CommonModule,
    EnquiriesRoutingModule,
    StoreModule.forFeature('enquiry', reducers),
    EffectsModule.forFeature([EnquiryEffects]),
  ],
})
export class EnquiriesModule {}
