import { UserRoutingModule } from './user-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';

@NgModule({
    imports: [CommonModule, UserRoutingModule, UserComponent],
})

export class UserModule {}
