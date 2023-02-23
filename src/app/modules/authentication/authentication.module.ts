import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent, SignupComponent, LogoutComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class AuthenticationModule {}
