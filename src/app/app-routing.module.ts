import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';

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
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
