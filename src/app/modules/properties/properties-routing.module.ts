import { AllPropertiesComponent } from './components/all-properties/all-properties.component';
import { AuthGuardService } from './../../guards/auth.guard.service';
import { OwnPropertiesComponent } from './components/own-properties/own-properties.component';
import { PropertyDetailsComponent } from './components/property-details/property-details.component';
import { PropertiesComponent } from './properties.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavPropertyComponent } from './components/fav-property/fav-property.component';

const routes: Routes = [
  {
    path: '',
    component: PropertiesComponent,
    children: [
      { path: '', component: AllPropertiesComponent },

      { path: 'property/:id', component: PropertyDetailsComponent },
      {
        path: 'own-properties',
        component: OwnPropertiesComponent,
        canActivate: [AuthGuardService],
      },
      { path: 'own-properties/:id', component: PropertyDetailsComponent },
      {
        path: 'favorites',
        component: FavPropertyComponent,
        canActivate: [AuthGuardService],
      },
      { path: 'favorites/:id', component: PropertyDetailsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropertiesRoutingModule {}
