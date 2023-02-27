import { AuthenticationService } from './../../authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(
    private authenticationService: AuthenticationService,
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
    this.authenticationService.registerUser(this.registerForm.value).subscribe({
      next: () => {
        this.router.navigateByUrl('auth/login');
      },
      error: (e: HttpErrorResponse) => {
        this.dialog.open(DialogComponent, {
          data: e.error.message,
        });
      },
    });
  }
}
