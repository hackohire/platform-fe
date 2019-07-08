import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../core/material.module';
import { CanAccessDirective } from './directives/appcanaaccess.directive';

@NgModule({
  declarations: [
    CanAccessDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    CanAccessDirective
  ]
})
export class SharedModule { }
