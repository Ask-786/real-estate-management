import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { GlobalActions } from 'src/app/shared/store/actions';
import { AuthActions } from '../../store/actions';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [ReactiveFormsModule, RouterLink],
})
export class SignupComponent implements OnInit {
  registerForm!: FormGroup;
  constructor(
    public dialog: MatDialog,
    private store: Store,
  ) {}

  ngOnInit() {
    this.store.dispatch(GlobalActions.setHeader({ header: 'Register' }));
    this.registerForm = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) return;
    this.store.dispatch(
      AuthActions.signup({ userData: this.registerForm.value }),
    );
  }
}
