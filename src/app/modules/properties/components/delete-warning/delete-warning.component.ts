import { Store } from '@ngrx/store';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogClose } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { PropertiesActions} from '../../store/actions';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions } from '@angular/material/card';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-delete-warning',
    templateUrl: './delete-warning.component.html',
    styleUrls: ['./delete-warning.component.css'],
    imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions, MatButton, MatDialogClose]
})
export class DeleteWarningComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string; id: string },
    private dialogRef: MatDialogRef<DeleteWarningComponent>,
    private _store: Store
  ) {}

  onDelete() {
    this._store.dispatch(
      PropertiesActions.deleteProperty({ id: this.data.id })
    );
    this.dialogRef.close();
  }
}
