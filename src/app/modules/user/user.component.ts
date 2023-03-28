import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { UserModelInterface } from 'src/app/shared/models/user.interface';
import { AppStateInterface } from 'src/app/models/appState.interface';
import * as GlobalSelectors from '../../shared/store/selectors';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  user$: Observable<UserModelInterface | null>;
  constructor(private store: Store<AppStateInterface>) {
    this.user$ = this.store.pipe(select(GlobalSelectors.userSelector));
  }
}
