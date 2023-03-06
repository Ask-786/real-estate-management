import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, HostListener } from '@angular/core';
import { AppStateInterface } from 'src/app/models/appState.interface';
import * as GlobalSelectors from '../../shared/store/selectors';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  public screenWidth: boolean = window.innerWidth > 768;
  isLoading$: Observable<boolean>;

  constructor(private store: Store<AppStateInterface>) {
    this.isLoading$ = this.store.pipe(
      select(GlobalSelectors.isLoadingSelector)
    );
  }

  @HostListener('window:resize', ['event'])
  onWindowResize() {
    this.screenWidth = window.innerWidth > 768;
  }
}
