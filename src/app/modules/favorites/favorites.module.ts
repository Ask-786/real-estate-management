import { PropertiesModule } from './../properties/properties.module';
import { PropertiesEffects } from './../properties/store/effects';
import { MaterialModule } from './../material/material.module';
import { FavoritesComponent } from './favorites.component';
import { FavoritesEffects } from './store/effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { reducers } from './store/reducers';

import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavPropertyComponent } from './components/fav-property/fav-property.component';

@NgModule({
  declarations: [FavoritesComponent, FavPropertyComponent],
  imports: [
    CommonModule,
    FavoritesRoutingModule,
    MaterialModule,
    PropertiesModule,
    StoreModule.forFeature('favorites', reducers),
    EffectsModule.forFeature([FavoritesEffects, PropertiesEffects]),
  ],
})
export class FavoritesModule {}
