import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

const material = [
  MatSidenavModule,
  MatDialogModule,
  MatFormFieldModule,
  MatSelectModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatInputModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, material],
  exports: [material],
})
export class MaterialModule {}
