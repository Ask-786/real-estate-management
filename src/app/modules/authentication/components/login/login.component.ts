import { UserModelInterface } from '../../../../shared/models/user.interface';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/models/appState.interface';
import { registeredUserSelector } from '../../store/selectors';
import { GlobalActions } from 'src/app/shared/store/actions';
import { AuthActions } from '../../store/actions';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, RouterLink],
})
export class LoginComponent implements OnInit, OnDestroy {
  registeredUser$: Observable<UserModelInterface | null>;
  email: string | undefined;
  loginForm!: FormGroup;
  subscriptions: Subscription[] = [];

  constructor(private store: Store<AppStateInterface>) {
    this.registeredUser$ = this.store.pipe(select(registeredUserSelector));
  }

  ngOnInit() {
    this.store.dispatch(GlobalActions.setHeader({ header: 'Login' }));
    this.subscriptions.push(
      this.registeredUser$.subscribe((registeredUser) => {
        this.email = registeredUser?.email;
      }),
    );
    this.loginForm = new FormGroup({
      username: new FormControl(this.email, [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    this.store.dispatch(AuthActions.login({ loginData: this.loginForm.value }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((el) => el.unsubscribe());
  }
}
