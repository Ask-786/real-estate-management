import { EnquiryEffects } from './../enquiries/store/effects';
import { PropertiesEffects } from './store/effects';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './store/reducers';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PropertiesService } from './services/properties.service';
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
import { FavPropertyComponent } from './components/fav-property/fav-property.component';
import { EnquiriesModule } from '../enquiries/enquiries.module';
import { AllPropertiesComponent } from './components/all-properties/all-properties.component';
import { SortOptionDialogComponent } from './components/sort-option-dialog/sort-option-dialog.component';
import { FilterOptionDialogComponent } from './components/filter-option-dialog/filter-option-dialog.component';
import { MapComponent } from './components/map/map.component';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    PropertiesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    EnquiriesModule,
    FilterPipe,
    StoreModule.forFeature('properties', reducers),
    EffectsModule.forFeature([PropertiesEffects, EnquiryEffects]),
    PropertiesComponent,
    PropertyComponent,
    AddPropertyDialogComponent,
    PropertyDetailsComponent,
    MaskImageDirective,
    OwnPropertiesComponent,
    EditPropertyDialogComponent,
    DeleteWarningComponent,
    FavPropertyComponent,
    AllPropertiesComponent,
    SortOptionDialogComponent,
    FilterOptionDialogComponent,
    MapComponent,
  ],
  providers: [PropertiesService],
})
export class PropertiesModule {}
