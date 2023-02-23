import { PropertiesService } from './properties.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertiesRoutingModule } from './properties-routing.module';

import { PropertiesComponent } from './properties.component';
import { PropertyComponent } from './components/property/property.component';

//material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [PropertiesComponent, PropertyComponent],
  imports: [
    CommonModule,
    PropertiesRoutingModule,
    MatCardModule,
    MatButtonModule,
  ],
  providers: [PropertiesService],
})
export class PropertiesModule {}
