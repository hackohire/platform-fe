import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AuthService } from '../../services/auth.service';
import { AppState } from '../state/app.state';
import { CreateApplication, EApplicationActions, UpdateApplicationsList } from '../actions/application.action';
import { switchMap, map, tap } from 'rxjs/operators';
import { DevApplicationService } from 'src/app/dev-application/dev-application.service';
import { Application } from 'src/app/shared/models/application.model';
import { of } from 'rxjs';
// import { of } from 'zen-observable';

@Injectable()
export class ApplicationEffects {
    @Effect()
    createApplication$ = this._actions$.pipe(
        ofType<CreateApplication>(EApplicationActions.CreateApplication),
        map(action => action.payload),
        // tap(t => console.log(t)),
        switchMap((payload) => this.devApplicationService.createApplication(payload)),
        // tap(t => console.log(t)),
        switchMap((app: Application[]) =>  of(new UpdateApplicationsList(app)))
    );


    constructor(
        private _actions$: Actions,
        private _store: Store<AppState>,
        private devApplicationService: DevApplicationService,
        private auth: AuthService
    ) {

    }
}
