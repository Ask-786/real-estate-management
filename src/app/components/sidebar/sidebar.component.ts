import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  public screenWidth: boolean = window.innerWidth > 768;

  @HostListener('window:resize', ['event'])
  onWindowResize() {
    this.screenWidth = window.innerWidth > 768;
  }
}
