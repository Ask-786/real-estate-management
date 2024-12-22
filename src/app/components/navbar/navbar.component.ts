import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, EventEmitter, Output } from '@angular/core';
import { isLoadingSelector, selectHeader } from '../../shared/store/selectors';
import { AppStateInterface } from 'src/app/models/appState.interface';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { NgIf, AsyncPipe } from '@angular/common';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [
    MatToolbar,
    MatIconButton,
    MatIcon,
    NgIf,
    MatProgressBar,
    AsyncPipe,
  ],
})
export class NavbarComponent {
  @Output() toggleSide = new EventEmitter();

  isPropertiesRoute!: boolean;
  isLoading$: Observable<boolean>;
  header$: Observable<string>;

  title!: string;

  constructor(private store: Store<AppStateInterface>) {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.header$ = this.store.pipe(select(selectHeader));
  }

  toPascalCase(string: string | undefined) {
    if (string)
      return string.replace(/(\w)(\w*)/g, function (_g0, g1, g2) {
        return g1.toUpperCase() + g2.toLowerCase();
      });
    else return '';
  }

  toggleSideBar() {
    this.toggleSide.emit();
  }
}
