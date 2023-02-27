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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropertiesRoutingModule {}
