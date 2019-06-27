import { Action } from '@ngrx/store';
import { Application } from 'src/app/shared/models/application.model';

export enum EApplicationActions {
    CreateApplication = '[Application] Create Application',
    GetApplications = '[Application] Get Applications',
    UpdateApplicationsList = '[Application] Update Applications List'
}

export class CreateApplication implements Action {
    public readonly type = EApplicationActions.CreateApplication;
    constructor(public payload: Application) {}
}

export class GetApplications implements Action {
    public readonly type = EApplicationActions.GetApplications;
    constructor(public payload: Application[]) {}
}

export class UpdateApplicationsList implements Action {
    public readonly type = EApplicationActions.UpdateApplicationsList;
    constructor(public payload: Application[]) {}
}

export type ApplicationActions = CreateApplication | GetApplications | UpdateApplicationsList;
