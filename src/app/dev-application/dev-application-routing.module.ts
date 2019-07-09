import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationsComponent } from './applications/applications.component';
import { ApplicationDetailsComponent } from './application-details/application-details.component';

const devApplicationRoutes: Routes = [
  {
    path: '',
    redirectTo: 'applications'
  },
  {
    path: 'applications',
    component: ApplicationsComponent,
  },
  {
    path: 'applications/:applicationId',
    component: ApplicationDetailsComponent,
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
