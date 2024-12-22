import { Component } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css'],
  imports: [MatCard, MatCardContent],
})
export class PropertyComponent {
  propertyUrl!: string;

  getPropertyId(id: string) {
    this.propertyUrl = `property/${id}`;
  }
}
