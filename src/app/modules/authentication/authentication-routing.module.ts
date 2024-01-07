import { LogoutComponent } from './components/logout/logout.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from 'src/app/shared/routes/routes';

const routes: Routes = [
  { path: AppRoutes.auth.children.login.template, component: LoginComponent },
  {
    path: AppRoutes.auth.children.signup.template,
    component: SignupComponent,
  },
  { path: AppRoutes.auth.children.logout.template, component: LogoutComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
