import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationsComponent } from './applications/applications.component';
import { DevApplicationRoutingModule } from './dev-application-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CreateApplicationDialogComponent } from './create-application-dialog/create-application-dialog.component';
import { ApplicationDetailsComponent } from './application-details/application-details.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ApplicationsComponent, CreateApplicationDialogComponent, ApplicationDetailsComponent],
  imports: [
    CommonModule,
    RouterModule,
    DevApplicationRoutingModule,
    SharedModule
  ],
  entryComponents: [
    CreateApplicationDialogComponent
  ]
})
export class DevApplicationModule { }
