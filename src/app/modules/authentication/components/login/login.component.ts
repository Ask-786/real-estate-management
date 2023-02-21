import { LoginService } from './login.service';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnDestroy {
  loginResponse!: Subscription;

  constructor(private loginService: LoginService, private router: Router) {}
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    if (this.loginForm.invalid) return;
    this.loginResponse = this.loginService
      .userLogin(this.loginForm.value)
      .subscribe({
        next: (v) => {
          console.log(v);
          this.router.navigate(['map']);
        },
        error: (e: HttpErrorResponse) => {
          console.log(e.error.message);
        },
      });
  }

  ngOnDestroy() {
    this.loginResponse.unsubscribe();
  }
}
