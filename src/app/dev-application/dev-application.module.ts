import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyApplicationsComponent } from './my-applications/my-applications.component';
import { DevApplicationRoutingModule } from './dev-application-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CreateApplicationDialogComponent } from './create-application-dialog/create-application-dialog.component';

@NgModule({
  declarations: [MyApplicationsComponent, CreateApplicationDialogComponent],
  imports: [
    CommonModule,
    DevApplicationRoutingModule,
    SharedModule
  ],
  entryComponents: [
    CreateApplicationDialogComponent
  ]
})
export class DevApplicationModule { }
