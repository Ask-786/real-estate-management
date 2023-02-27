import { AddPropertyDialogComponent } from './components/add-property-dialog/add-property-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { PropertiesService } from './properties.service';
import { Component, OnInit } from '@angular/core';
import { PropertyModelInterface } from './model/property.model';
import * as moment from 'moment';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css'],
})
export class PropertiesComponent implements OnInit {
  properties$!: Observable<PropertyModelInterface[]>;
  moment = moment;

  constructor(
    private propertiesService: PropertiesService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.properties$ = this.propertiesService.getProperties();
  }

  addProperty() {
    this.dialog.open(AddPropertyDialogComponent);
  }

  getPropertyUrl(id: string) {
    return `property/${id}`;
  }
}
