import { Component, inject } from '@angular/core';
import { GlobalActions } from '../../store/actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent {
  store = inject(Store);

  constructor() {
    this.store.dispatch(GlobalActions.setHeader({ header: 'Not Found' }));
  }
}
