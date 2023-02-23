import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { SignupService } from './signup.service';
import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(
    private signUpService: SignupService,
    public dialog: MatDialog,
    private router: Router
  ) {}
  registerForm = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  onSubmit() {
    if (this.registerForm.invalid) return;
    this.signUpService.registerUser(this.registerForm.value).subscribe({
      next: (v: any) => {
        console.log(v);
        if (v.status === 400) {
          console.log('bad request mann');
        } else {
          this.router.navigateByUrl('auth/login');
        }
      },
      error: (e: HttpErrorResponse) => {
        console.log(e);
        this.dialog.open(DialogComponent, {
          data: 'something',
        });
      },
    });
  }
}
