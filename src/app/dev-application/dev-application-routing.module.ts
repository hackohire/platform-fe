import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationsComponent } from './applications/applications.component';
import { ApplicationDetailsComponent } from './application-details/application-details.component';
import { AuthGuard } from '../shared/auth.guard';

const devApplicationRoutes: Routes = [
  {
    path: '',
    redirectTo: 'applications',
    pathMatch: 'full'
  },
  {
    path: 'applications',
    component: ApplicationsComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'applications/:applicationId',
    component: ApplicationDetailsComponent,
    canActivate: [AuthGuard]
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
