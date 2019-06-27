import { RouterReducerState } from '@ngrx/router-store';
import { UserState } from './user.state';
import { ApplicationState } from './application.state';

export interface AppState {
    router?: RouterReducerState;
    users: UserState;
    applications: ApplicationState;
}

export const initialAppState: AppState = {
    users: null,
    applications: null,
};

export function getInitialAppState(): AppState {
    return initialAppState;
}

