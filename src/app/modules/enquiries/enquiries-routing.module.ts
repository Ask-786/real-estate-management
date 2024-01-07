import { UserEnquiriesComponent } from './components/user-enquiries/user-enquiries.component';
import { EnquiriesComponent } from './enquiries.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnquiryDetailsComponent } from './components/enquiry-details/enquiry-details.component';
import { AppRoutes } from 'src/app/shared/routes/routes';

const routes: Routes = [
  {
    path: AppRoutes.enquiries.children.home.template,
    component: EnquiriesComponent,
  },
  {
    path: AppRoutes.enquiries.children.enquiry.template,
    component: EnquiryDetailsComponent,
  },
  {
    path: AppRoutes.enquiries.children.ownEnquiries.template,
    component: UserEnquiriesComponent,
  },
  {
    path: AppRoutes.enquiries.children.ownEnquiry.template,
    component: EnquiryDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnquiriesRoutingModule {}
