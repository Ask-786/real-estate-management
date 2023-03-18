import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiscussionsRoutingModule } from './discussions-routing.module';
import { DiscussionsComponent } from './discussions.component';

@NgModule({
  declarations: [
    DiscussionsComponent
  ],
  imports: [CommonModule, DiscussionsRoutingModule],
})
export class DiscussionsModule {}
