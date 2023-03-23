import { UserEnquiriesComponent } from './components/user-enquiries/user-enquiries.component';
import { EnquiriesComponent } from './enquiries.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnquiryDetailsComponent } from './components/enquiry-details/enquiry-details.component';

const routes: Routes = [
  { path: '', component: EnquiriesComponent },
  { path: 'enquiry/:id', component: EnquiryDetailsComponent },
  { path: 'own-enquiries', component: UserEnquiriesComponent },
  { path: 'own-enquiries/:id', component: EnquiryDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnquiriesRoutingModule {}
