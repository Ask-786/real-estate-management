import { EnquiryEffects } from './../enquiries/store/effects';
import { PropertiesEffects } from './store/effects';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './store/reducers';
import { StoreModule } from '@ngrx/store';
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
import { MaskImageDirective } from './directives/mask-image.directive';

@NgModule({
  declarations: [
    PropertiesComponent,
    PropertyComponent,
    AddPropertyDialogComponent,
    PropertyDetailsComponent,
    MaskImageDirective,
  ],
  imports: [
    CommonModule,
    PropertiesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forFeature('properties', reducers),
    EffectsModule.forFeature([PropertiesEffects, EnquiryEffects]),
  ],
  providers: [PropertiesService],
})
export class PropertiesModule {}
