import { Component } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [SidebarComponent]
})
export class AppComponent {
  title = 'Real Estate Management';
}
