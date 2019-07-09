import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';
import { AppComponent } from './app.component';
import { SideNavbarComponent } from './core/side-navbar/side-navbar.component';

const routes: Routes = [
  {
    path: 'user',
    // canLoad: [AuthGuard],
    loadChildren: () => import('./user/user.module').then(module => module.UserModule)
  },
  {
    path: 'application',
    loadChildren: () => import('./dev-application/dev-application.module').then(module => module.DevApplicationModule)
  },
  {
    path: '',
    component: AppComponent,
    outlet: 'main'
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
