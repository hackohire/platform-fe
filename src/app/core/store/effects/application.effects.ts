import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { AuthService } from '../../services/auth.service';
import { AppState } from '../state/app.state';
import { CreateApplication, EApplicationActions, UpdateApplicationsList, GetApplication, SetSelectedApp } from '../actions/application.action';
import { switchMap, map, tap, filter, withLatestFrom } from 'rxjs/operators';
import { DevApplicationService } from 'src/app/dev-application/dev-application.service';
import { Application } from 'src/app/shared/models/application.model';
import { of, Subscription } from 'rxjs';
import { selectApplicationList } from '../selectors/application.selectors';
// import { of } from 'zen-observable';

@Injectable()
export class ApplicationEffects {


    subscription: Subscription;

    @Effect()
    createApplication$ = this._actions$.pipe(
        ofType<CreateApplication>(EApplicationActions.CreateApplication),
        map(action => action.payload),
        // tap(t => console.log(t)),
        switchMap((payload) => this.devApplicationService.createApplication(payload)),
        tap(t => console.log(t)),
        switchMap((app: Application[]) =>  of(new UpdateApplicationsList(app)))
    );

    @Effect()
    getApplicationList$ = this._actions$.pipe(
        ofType<CreateApplication>(EApplicationActions.GetApplications),
        map(action => action.payload),
        // tap(t => console.log(t)),
        switchMap((payload) => this.devApplicationService.getApplicationList(payload)),
        tap(t => console.log(t)),
        switchMap((app: Application[]) =>  of(new UpdateApplicationsList(app)))
    );

    @Effect()
    getSelectedApplication$ = this._actions$.pipe(
        ofType<GetApplication>(EApplicationActions.GetApplication),
        map(action => action.id),
        tap(a => console.log(a)),
        withLatestFrom(this._store.pipe(select(selectApplicationList))),
        tap(a => console.log(a)),
        switchMap(([id, applications]) => {
            if (!applications.length) {
                return this.devApplicationService.getApplicationById(id);
            } else {
                const selectedApp = applications.filter((a) => a && a._id === id )[0];
                return of(selectedApp);
            }
        }),
        tap(a => console.log(a)),
        switchMap((app: Application) =>  of(new SetSelectedApp(app)))
    );


    constructor(
        private _actions$: Actions,
        private _store: Store<AppState>,
        private devApplicationService: DevApplicationService,
        private auth: AuthService
    ) {

    }
}
