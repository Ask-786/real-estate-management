import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  config: MatSnackBarConfig = {
    horizontalPosition: 'right',
    verticalPosition: 'top',
    duration: 3000,
  };

  sucess(msg: string) {
    this.config['panelClass'] = ['notification', 'success'];
    this.snackBar.open(msg, '', this.config);
  }

  warn(msg: string) {
    this.config['panelClass'] = ['notification', 'warn'];
    this.snackBar.open(msg, '', this.config);
  }
}
