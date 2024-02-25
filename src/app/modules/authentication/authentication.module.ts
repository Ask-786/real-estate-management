import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { reducers } from './store/reducers';
import { AuthenticationEffects } from './store/effects';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    StoreModule.forFeature('authentication', reducers),
    EffectsModule.forFeature([AuthenticationEffects]),
  ],
  providers: [],
})
export class AuthenticationModule {}
