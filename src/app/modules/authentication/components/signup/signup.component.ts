import { SignupService } from './signup.service';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(private signUpService: SignupService) {}
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
      next: (v) => {
        console.log(v);
        console.log('You have successfully signed in');
      },
      error: () => {
        console.log('something went wrong');
      },
    });
  }
}
