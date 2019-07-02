import { Action } from '@ngrx/store';
import { Application } from 'src/app/shared/models/application.model';

export enum EApplicationActions {
    CreateApplication = '[Application] Create Application',
    GetApplications = '[Application] Get Applications',
    UpdateApplicationsList = '[Application] Update Applications List',
    GetApplication = '[Application] Get Application',
    SetSelectedApp = '[Application] Set Selected Application'
}

export class CreateApplication implements Action {
    public readonly type = EApplicationActions.CreateApplication;
    constructor(public payload: Application) {}
}

export class GetApplications implements Action {
    public readonly type = EApplicationActions.GetApplications;
    constructor(public payload: string) {}
}

export class UpdateApplicationsList implements Action {
    public readonly type = EApplicationActions.UpdateApplicationsList;
    constructor(public payload: Application[]) {}
}

export class GetApplication implements Action {
    public readonly type = EApplicationActions.GetApplication;
    constructor(public id: string) {}
}

export class SetSelectedApp implements Action {
    public readonly type = EApplicationActions.SetSelectedApp;
    constructor(public app: Application) {}
}


export type ApplicationActions = CreateApplication | GetApplications | UpdateApplicationsList | GetApplication | SetSelectedApp;
