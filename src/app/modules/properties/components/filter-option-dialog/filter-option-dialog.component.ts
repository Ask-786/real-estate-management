import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-filter-option-dialog',
  templateUrl: './filter-option-dialog.component.html',
  styleUrls: ['./filter-option-dialog.component.css'],
})
export class FilterOptionDialogComponent implements OnInit {
  toppings!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<FilterOptionDialogComponent>
  ) {}

  ngOnInit() {
    this.toppings = this._formBuilder.group({
      pepperoni: false,
      extracheese: false,
      mushroom: false,
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onOk(value: { pepperoni: boolean; extracheese: boolean; mushroom: boolean }) {
    console.log(value);
    this.dialogRef.close();
  }
}
