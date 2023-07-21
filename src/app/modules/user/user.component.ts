import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, inject } from '@angular/core';
import { UserModelInterface } from 'src/app/shared/models/user.interface';
import { AppStateInterface } from 'src/app/models/appState.interface';
import * as GlobalSelectors from '../../shared/store/selectors';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  private store = inject(Store<AppStateInterface>)

  user$: Observable<UserModelInterface | null>;

  constructor() {
    this.user$ = this.store.pipe(select(GlobalSelectors.userSelector));
  }
}
