import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnquiriesRoutingModule } from './enquiries-routing.module';
import { EnquiriesComponent } from './enquiries.component';
import { EnquiryComponent } from './components/enquiry/enquiry.component';


@NgModule({
  declarations: [
    EnquiriesComponent,
    EnquiryComponent
  ],
  imports: [
    CommonModule,
    EnquiriesRoutingModule
  ]
})
export class EnquiriesModule { }
