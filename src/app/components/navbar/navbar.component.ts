import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Component, EventEmitter, Output } from '@angular/core';
import { AddPropertyDialogComponent } from 'src/app/modules/properties/components/add-property-dialog/add-property-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @Output() toggleSide = new EventEmitter();
  isPropertiesRoute!: boolean;

  title!: string;

  constructor(private dialog: MatDialog, private router: Router) {}

  hasRoute(route: string) {
    return this.router.url === route;
  }

  toggleSideBar() {
    this.toggleSide.emit();
  }
  addProperty() {
    this.dialog.open(AddPropertyDialogComponent);
  }
}
