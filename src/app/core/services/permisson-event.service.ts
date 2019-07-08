import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../store/state/app.state';
import { selectLoggedInUser } from '../store/selectors/user.selector';
import { map, tap } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user.model';

@Injectable()
export class PermissionEvents {
  private readonly WORKFLOW_EVENTS = environment.permissions;
  private userRoles: Set<string>;

  constructor(private store: Store<AppState>) {
  }
  // returns a boolean observable
  public checkAuthorization(path: any): Observable<boolean> {
    // we are loading the roles only once
   if (!this.userRoles) {
      return this.store.pipe(
        select(selectLoggedInUser),
        map((currentUser: User) => currentUser ? currentUser.roles : []),
        tap((roles: any[]) => {
        //   const uRoles = roles.map(role => role.name);
          this.userRoles = new Set(roles);
        }),
        map(roles => this.doCheckAuthorization(path))
      );

    }
   return of(this.doCheckAuthorization(path));
  }

  private doCheckAuthorization(path: string[]): boolean {
    if (path.length) {
      const entry = this.findEntry(this.WORKFLOW_EVENTS, path);
      if (entry && entry.permittedRoles
             && this.userRoles.size) {
        return entry.permittedRoles
        .some(permittedRole => this.userRoles.has(permittedRole));
      }
      return false;
    }
    return false;
  }
/**
 * Recursively find workflow-map entry based on the path strings
 */
private findEntry(currentObject: any, keys: string[], index = 0) {
    const key = keys[index];
    if (currentObject[key] && index < keys.length - 1) {
      return this.findEntry(currentObject[key], keys, index + 1);
    } else if (currentObject[key] && index === keys.length - 1) {
      return currentObject[key];
    } else {
      return false;
    }
  }

}
