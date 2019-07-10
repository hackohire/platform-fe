import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { User } from './models/user.model';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  loggedInUser: User;

  constructor(
    private router: Router,
    private authService: AuthService
    ) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
              boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const redirectUrl = route['_routerState']['url'];
    this.authService.setRedirectURI(redirectUrl);


    if (this.loggedInUser) {
      return true;
    }

    return false;

  }

}
