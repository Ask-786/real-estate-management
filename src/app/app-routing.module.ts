import { ProtectLoginService } from './guards/protectLogin.service';
import { AuthGuardService } from './guards/auth.guard.service';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { MapViewComponent } from './components/map-view/map-view.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from './shared/routes/routes';

const routes: Routes = [
  { path: AppRoutes.home.template, redirectTo: 'map', pathMatch: 'full' },
  {
    path: AppRoutes.auth.template,
    loadChildren: () =>
      import('./modules/authentication/authentication.module').then(
        (m) => m.AuthenticationModule,
      ),
    canActivate: [ProtectLoginService],
  },
  {
    path: AppRoutes.enquiries.template,
    loadChildren: () =>
      import('./modules/enquiries/enquiries.module').then(
        (m) => m.EnquiriesModule,
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: AppRoutes.properties.template,
    loadChildren: () =>
      import('./modules/properties/properties.module').then(
        (m) => m.PropertiesModule,
      ),
  },
  {
    path: AppRoutes.user.template,
    loadChildren: () =>
      import('./modules/user/user.module').then((m) => m.UserModule),
    canActivate: [AuthGuardService],
  },
  {
    path: AppRoutes.notification.template,
    loadChildren: () =>
      import('./modules/notifications/notifications.module').then(
        (m) => m.NotificationsModule,
      ),
    canActivate: [AuthGuardService],
  },
  { path: AppRoutes.map.template, component: MapViewComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
