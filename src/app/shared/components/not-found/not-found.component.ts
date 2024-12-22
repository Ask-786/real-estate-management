import { Component, inject } from '@angular/core';
import { GlobalActions } from '../../store/actions';
import { Store } from '@ngrx/store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
  imports: [RouterLink],
})
export class NotFoundComponent {
  store = inject(Store);

  constructor() {
    this.store.dispatch(GlobalActions.setHeader({ header: 'Not Found' }));
  }
}
