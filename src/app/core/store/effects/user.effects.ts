import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { switchMap, map, withLatestFrom, tap } from 'rxjs/operators/';
import { GetUser, EUserActions, GetUsersSuccess, GetUsers, GetUserSuccess, CreateUser } from '../actions/user.actions';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { selectUserList } from '../selectors/user.selector';
import { UserService } from 'src/app/user/user.service';

@Injectable()
export class UserEffects {
    @Effect()
    getUsers$ = this.actions$.pipe(
        ofType<GetUsers>(EUserActions.GetUsers),
        switchMap(() => this.userService.getUsers()),
        tap(t => console.log(t)),
        switchMap((userHttp: User[]) => of(new GetUsersSuccess(userHttp)))
    );

    @Effect()
    getUser$ = this.actions$.pipe(
        ofType<GetUser>(EUserActions.GetUser),
        map(action => action.payload),
        tap(t => console.log(t)),
        withLatestFrom(this._store.pipe(select(selectUserList))),
        tap(t => console.log(t)),
        switchMap(([id, users]) => {
            console.log(users);
            const selectedUser = users.filter(user => user && user._id === id.toString())[0];
            return of(new GetUserSuccess(selectedUser));
        })
    );

    @Effect()
    createUser$ = this.actions$.pipe(
        ofType<CreateUser>(EUserActions.CreateUser),
        map(action => action.payload),
        switchMap((user) => this.userService.createUser(user)),
        switchMap((user: User) => of(user))
    );

    constructor(
        private actions$: Actions,
        private _store: Store<AppState>,
        private auth: AuthService,
        private userService: UserService
    ) {

    }
}
