import { MatDialogRef, MatDialogClose } from '@angular/material/dialog';
import { Component } from '@angular/core';
import {
  MatCard,
  MatCardHeader,
  MatCardTitle,
  MatCardContent,
  MatCardActions,
} from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatRadioGroup, MatRadioButton } from '@angular/material/radio';
import { NgFor } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-sort-option-dialog',
  templateUrl: './sort-option-dialog.component.html',
  styleUrls: ['./sort-option-dialog.component.css'],
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatDivider,
    MatCardContent,
    ReactiveFormsModule,
    FormsModule,
    MatSlideToggle,
    MatRadioGroup,
    NgFor,
    MatRadioButton,
    MatCardActions,
    MatButton,
    MatDialogClose,
  ],
})
export class SortOptionDialogComponent {
  sortOption!: string;
  desc = false as boolean;
  sortOptions: string[] = ['Date', 'Name', 'Price'];

  constructor(private dialogRef: MatDialogRef<SortOptionDialogComponent>) {}

  onCancel() {
    this.dialogRef.close();
  }
}
