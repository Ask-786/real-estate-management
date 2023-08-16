import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  config: MatSnackBarConfig = {
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
    duration: 3000,
  };

  sucess(msg = 'Sucess') {
    this.snackBar.open(msg, '', {
      ...this.config,
      panelClass: ['notification', 'success'],
    });
  }

  warn(msg = 'Something went wrong!!') {
    this.snackBar.open(msg, '', {
      ...this.config,
      panelClass: ['notification', 'warn'],
    });
  }
}
