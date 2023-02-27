import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../material/material.module';
import { PropertiesService } from './properties.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertiesRoutingModule } from './properties-routing.module';

import { PropertiesComponent } from './properties.component';
import { PropertyComponent } from './components/property/property.component';
import { AddPropertyDialogComponent } from './components/add-property-dialog/add-property-dialog.component';
import { PropertyDetailsComponent } from './components/property-details/property-details.component';

@NgModule({
  declarations: [
    PropertiesComponent,
    PropertyComponent,
    AddPropertyDialogComponent,
    PropertyDetailsComponent,
  ],
  imports: [
    CommonModule,
    PropertiesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [PropertiesService],
})
export class PropertiesModule {}
