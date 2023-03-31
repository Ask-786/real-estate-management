import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-filter-option-dialog',
  templateUrl: './filter-option-dialog.component.html',
  styleUrls: ['./filter-option-dialog.component.css'],
})
export class FilterOptionDialogComponent implements OnInit {
  propertyType!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<FilterOptionDialogComponent>
  ) {}

  ngOnInit() {
    this.propertyType = this._formBuilder.group({
      land: false,
      residential: false,
      commercial: false,
      industrial: false,
    });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
