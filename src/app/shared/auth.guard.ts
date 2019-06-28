import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable, } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../core/store/state/app.state';
import { selectLoggedInUser } from '../core/store/selectors/user.selector';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    return this.store.select(selectLoggedInUser).pipe(
      map(u => u ? true : false)
    );
    // return true;
    // throw new Error("Method not implemented.");
  }

  constructor(private store: Store<AppState>) {

  }

}
