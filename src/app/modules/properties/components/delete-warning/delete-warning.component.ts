import { Store } from '@ngrx/store';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { deleteProperty } from '../../store/actions';

@Component({
  selector: 'app-delete-warning',
  templateUrl: './delete-warning.component.html',
  styleUrls: ['./delete-warning.component.css'],
})
export class DeleteWarningComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string; id: string },
    private dialogRef: MatDialogRef<DeleteWarningComponent>,
    private _store: Store
  ) {}

  onDelete() {
    this._store.dispatch(
      deleteProperty({ id: this.data.id })
    );
    this.dialogRef.close();
  }
}
