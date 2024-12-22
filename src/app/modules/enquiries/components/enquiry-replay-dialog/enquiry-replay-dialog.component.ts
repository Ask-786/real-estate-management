import { Component } from '@angular/core';
import {
  MatCard,
  MatCardHeader,
  MatCardTitle,
  MatCardContent,
  MatCardActions,
} from '@angular/material/card';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-enquiry-replay-dialog',
  templateUrl: './enquiry-replay-dialog.component.html',
  styleUrls: ['./enquiry-replay-dialog.component.css'],
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatButton,
  ],
})
export class EnquiryReplayDialogComponent {}
