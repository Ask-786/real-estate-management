import { Component } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { Store } from '@ngrx/store';
import { AppStateInterface } from './models/appState.interface';
import { GlobalActions } from './shared/store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [SidebarComponent],
})
export class AppComponent {
  title = 'Real Estate Management';
  constructor(private store: Store<AppStateInterface>) {
    this.store.dispatch(GlobalActions.checkAuth());
  }
}
