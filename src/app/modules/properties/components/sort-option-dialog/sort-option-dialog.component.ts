import { MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sort-option-dialog',
  templateUrl: './sort-option-dialog.component.html',
  styleUrls: ['./sort-option-dialog.component.css'],
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
