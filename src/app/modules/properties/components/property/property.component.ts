import { Component } from '@angular/core';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css'],
})
export class PropertyComponent {
  propertyUrl!: string;

  getPropertyId(id: string) {
    this.propertyUrl = `property/${id}`;
  }
}
