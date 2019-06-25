import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { routerReducer } from '@ngrx/router-store';
import { userReducers } from './user.reducers';

export const appReducesrs: ActionReducerMap<AppState, any> = {
    router: routerReducer,
    users: userReducers
};

