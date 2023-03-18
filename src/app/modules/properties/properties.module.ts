import { FavoritesEffects } from './../favorites/store/effects';
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
import { OwnPropertiesComponent } from './components/own-properties/own-properties.component';
import { EditPropertyDialogComponent } from './components/edit-property-dialog/edit-property-dialog.component';
import { DeleteWarningComponent } from './components/delete-warning/delete-warning.component';

@NgModule({
  declarations: [
    PropertiesComponent,
    PropertyComponent,
    AddPropertyDialogComponent,
    PropertyDetailsComponent,
    MaskImageDirective,
    OwnPropertiesComponent,
    EditPropertyDialogComponent,
    DeleteWarningComponent,
  ],
  imports: [
    CommonModule,
    PropertiesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forFeature('properties', reducers),
    EffectsModule.forFeature([
      PropertiesEffects,
      EnquiryEffects,
      FavoritesEffects,
    ]),
  ],
  providers: [PropertiesService],
})
export class PropertiesModule {}
