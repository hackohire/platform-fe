import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MyApplicationsComponent } from './my-applications/my-applications.component';
import { ApplicationDetailsComponent } from './application-details/application-details.component';

const devApplicationRoutes: Routes = [
  {
    path: 'my-applications/:id/:applicationId',
    component: ApplicationDetailsComponent
  },
  {
    path: 'my-applications/:id',
    component: MyApplicationsComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(devApplicationRoutes)
  ]
})
export class DevApplicationRoutingModule { }
