import { PropertiesService } from './properties.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertiesRoutingModule } from './properties-routing.module';
import { PropertiesComponent } from './properties.component';
import { PropertyComponent } from './components/property/property.component';

@NgModule({
  declarations: [PropertiesComponent, PropertyComponent],
  imports: [CommonModule, PropertiesRoutingModule],
  providers: [PropertiesService],
})
export class PropertiesModule {}
