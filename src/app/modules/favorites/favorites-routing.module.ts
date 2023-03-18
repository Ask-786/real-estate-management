import { PropertyDetailsComponent } from './../properties/components/property-details/property-details.component';
import { FavoritesComponent } from './favorites.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: FavoritesComponent },
  { path: 'fav-properties/:id', component: PropertyDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoritesRoutingModule {}
