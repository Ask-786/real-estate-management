import { Observable } from 'rxjs';
import { PropertiesService } from './properties.service';
import { Component, OnInit } from '@angular/core';
import { PropertyModelInterface } from './model/property.model';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css'],
})
export class PropertiesComponent implements OnInit {
  properties$!: Observable<PropertyModelInterface[]>;

  constructor(private propertiesService: PropertiesService) {}
  ngOnInit(): void {
    this.properties$ = this.propertiesService.getProperties();
  }
}
