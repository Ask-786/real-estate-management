import { AllPropertiesComponent } from './components/all-properties/all-properties.component';
import { AuthGuardService } from './../../guards/auth.guard.service';
import { OwnPropertiesComponent } from './components/own-properties/own-properties.component';
import { PropertyDetailsComponent } from './components/property-details/property-details.component';
import { PropertiesComponent } from './properties.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavPropertyComponent } from './components/fav-property/fav-property.component';
import { AppRoutes } from 'src/app/shared/routes/routes';

const routes: Routes = [
  {
    path: AppRoutes.properties.children.home.template,
    component: PropertiesComponent,
    children: [
      {
        path: AppRoutes.properties.children.home.template,
        component: AllPropertiesComponent,
      },

      {
        path: AppRoutes.properties.children.property.template,
        component: PropertyDetailsComponent,
      },
      {
        path: AppRoutes.properties.children.ownProperties.template,
        component: OwnPropertiesComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: AppRoutes.properties.children.ownProperty.template,
        component: PropertyDetailsComponent,
      },
      {
        path: AppRoutes.properties.children.favorites.template,
        component: FavPropertyComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: AppRoutes.properties.children.favorite.template,
        component: PropertyDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropertiesRoutingModule {}
