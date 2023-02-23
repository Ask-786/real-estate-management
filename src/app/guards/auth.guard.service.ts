import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardService implements CanActivate {
  canActivate(): boolean | Observable<boolean | UrlTree> {
    return true;
  }
}
