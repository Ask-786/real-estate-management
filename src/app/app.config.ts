import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { reducers } from '../app/shared/store/reducers';
import { provideEffects } from '@ngrx/effects';
import { GlobalEffects } from '../app/shared/store/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { isDevMode } from '@angular/core';
import { AuthGuardService } from '../app/guards/auth.guard.service';
import { ProtectLoginService } from '../app/guards/protectLogin.service';
import {
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { tokenInterceptor } from '../app/interceptors/token.interceptor';
import { provideRouter } from '@angular/router';
import { routes } from '../app/app.routes';

export const config: ApplicationConfig = {
  providers: [
    provideStore({ global: reducers }),
    provideEffects([GlobalEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      connectInZone: true,
    }),
    AuthGuardService,
    ProtectLoginService,
    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([tokenInterceptor]),
    ),
    provideAnimations(),
    provideRouter(routes),
  ],
};
