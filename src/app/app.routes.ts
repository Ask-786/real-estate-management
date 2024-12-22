import { ProtectLoginService } from './guards/protectLogin.service';
import { AuthGuardService } from './guards/auth.guard.service';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { MapViewComponent } from './components/map-view/map-view.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'map', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/authentication/authentication.module').then(
        (m) => m.AuthenticationModule,
      ),
    canActivate: [ProtectLoginService],
  },
  {
    path: 'enquiries',
    loadChildren: () =>
      import('./modules/enquiries/enquiries.module').then(
        (m) => m.EnquiriesModule,
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'properties',
    loadChildren: () =>
      import('./modules/properties/properties.module').then(
        (m) => m.PropertiesModule,
      ),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./modules/user/user.routes').then((r) => r.routes),
    canActivate: [AuthGuardService],
  },
  {
    path: 'notifications',
    loadChildren: () =>
      import('./modules/notifications/notifications.module').then(
        (m) => m.NotificationsModule,
      ),
    canActivate: [AuthGuardService],
  },
  { path: 'map', component: MapViewComponent },
  { path: '**', component: NotFoundComponent },
];
