import { AppState } from "../state/app.state";
import { createSelector } from '@ngrx/store';
import { ApplicationState } from '../state/application.state';

const selectApplications = (state: AppState) => state.applications;

export const selectApplicationList = createSelector(
    selectApplications,
    (state: ApplicationState) => state.applications
);

export const selectApplication = createSelector(
    selectApplications,
    (state: ApplicationState) => state.selectedApplication
);
