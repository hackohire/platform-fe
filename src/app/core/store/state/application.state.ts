import { Application } from 'src/app/shared/models/application.model';

export interface ApplicationState {
    applications: Application[];
    application: Application;
}

export const initialApplicationState: ApplicationState = {
    applications: null,
    application: null
};

