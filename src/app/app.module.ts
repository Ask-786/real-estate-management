import { GlobalEffects } from './shared/store/effects';
import { TokenInterceptor } from './token.interceptor';
import { AuthGuardService } from './guards/auth.guard.service';
import { ButtonComponent } from './shared/components/button/button.component';
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MaterialModule } from './modules/material/material.module';
import { MapViewComponent } from './components/map-view/map-view.component';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DialogComponent } from './shared/components/dialog/dialog.component';
import { MapDialogComponent } from './shared/components/map-dialog/map-dialog.component';
import { reducers } from './shared/store/reducers';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { ProtectLoginService } from './guards/protectLogin.service';
import { AppStateInterface } from './models/appState.interface';
import * as GlobalActions from './shared/store/actions'

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    MapViewComponent,
    ButtonComponent,
    DialogComponent,
    MapDialogComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    StoreModule.forRoot({ global: reducers }),
    EffectsModule.forRoot([GlobalEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
    }),
  ],
  providers: [
    AuthGuardService,
    ProtectLoginService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private store:Store<AppStateInterface>){
    this.store.dispatch(GlobalActions.checkAuth())
  }
}
