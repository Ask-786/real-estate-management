import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { AuthGuardService } from './app/guards/auth.guard.service';
import { ProtectLoginService } from './app/guards/protectLogin.service';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TokenInterceptor } from './app/interceptors/token.interceptor';
import { FormsModule } from '@angular/forms';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppRoutingModule } from './app/app-routing.module';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NotificationsModule } from './app/modules/notifications/notifications.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './app/shared/store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { GlobalEffects } from './app/shared/store/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { isDevMode, importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(FormsModule, BrowserModule, AppRoutingModule, NotificationsModule, StoreModule.forRoot({ global: reducers }), EffectsModule.forRoot([GlobalEffects]), StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: !isDevMode(),
            autoPause: true,
            connectInZone: true,
        })),
        AuthGuardService,
        ProtectLoginService,
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations()
    ]
})
  .catch((err) => console.error(err));
