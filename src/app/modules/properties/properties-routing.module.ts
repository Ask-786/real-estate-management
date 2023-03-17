import { AuthGuardService } from './../../guards/auth.guard.service';
import { OwnPropertiesComponent } from './components/own-properties/own-properties.component';
import { PropertyDetailsComponent } from './components/property-details/property-details.component';
import { PropertiesComponent } from './properties.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PropertiesComponent,
  },
  { path: 'property/:id', component: PropertyDetailsComponent },
  {
    path: 'own-properties',
    component: OwnPropertiesComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'own-properties/:id', component: PropertyDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropertiesRoutingModule {}
