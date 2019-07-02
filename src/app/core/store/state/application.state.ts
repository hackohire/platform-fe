import { Application } from 'src/app/shared/models/application.model';

export interface ApplicationState {
    applications: Application[];
    selectedApplication: Application;
}

export const initialApplicationState: ApplicationState = {
    applications: [],
    selectedApplication: null
};

