import { MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sort-option-dialog',
  templateUrl: './sort-option-dialog.component.html',
  styleUrls: ['./sort-option-dialog.component.css'],
})
export class SortOptionDialogComponent {
  favoriteSeason!: string;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

  constructor(private dialogRef: MatDialogRef<SortOptionDialogComponent>) {}

  onCancel() {
    this.dialogRef.close();
  }

  onOk(value: string) {
    console.log(value);
    this.dialogRef.close();
  }
}
