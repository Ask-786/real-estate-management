import { MapViewComponent } from './components/map-view/map-view.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'enquiry',
    loadChildren: () =>
      import('./modules/enquiries/enquiries.module').then(
        (m) => m.EnquiriesModule
      ),
  },
  {
    path: 'property',
    loadChildren: () =>
      import('./modules/properties/properties.module').then(
        (m) => m.PropertiesModule
      ),
  },
  { path: 'map', component: MapViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
