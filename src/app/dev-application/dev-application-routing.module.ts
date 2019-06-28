import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MyApplicationsComponent } from './my-applications/my-applications.component';

const devApplicationRoutes: Routes = [
  {
    path: 'my-applications/:id',
    component: MyApplicationsComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(devApplicationRoutes)
  ]
})
export class DevApplicationRoutingModule { }
