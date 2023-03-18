import { ProtectLoginService } from './guards/protectLogin.service';
import { AuthGuardService } from './guards/auth.guard.service';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { MapViewComponent } from './components/map-view/map-view.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'map', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
    canActivate: [ProtectLoginService],
  },
  {
    path: 'enquiries',
    loadChildren: () =>
      import('./modules/enquiries/enquiries.module').then(
        (m) => m.EnquiriesModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'properties',
    loadChildren: () =>
      import('./modules/properties/properties.module').then(
        (m) => m.PropertiesModule
      ),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./modules/user/user.module').then((m) => m.UserModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'favorites',
    loadChildren: () =>
      import('./modules/favorites/favorites.module').then(
        (m) => m.FavoritesModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'discussions',
    loadChildren: () =>
      import('./modules/discussions/discussions.module').then(
        (m) => m.DiscussionsModule
      ),
  },
  { path: 'map', component: MapViewComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
