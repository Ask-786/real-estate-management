import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogClose } from '@angular/material/dialog';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-filter-option-dialog',
    templateUrl: './filter-option-dialog.component.html',
    styleUrls: ['./filter-option-dialog.component.css'],
    imports: [MatCard, MatCardHeader, MatCardTitle, MatDivider, MatCardContent, ReactiveFormsModule, FormsModule, MatCheckbox, MatCardActions, MatButton, MatDialogClose]
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
