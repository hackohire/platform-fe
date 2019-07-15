import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import gql from 'graphql-tag';

import { Apollo } from 'apollo-angular';

import { Application } from '../shared/models/application.model';

@Injectable({
  providedIn: 'root'
})
export class DevApplicationService {

  queryFileds = `{
    _id
    name,
    description
    createdBy
    uuid
    application_url
    privacy_policy_url
    status
  }`;

  constructor(
    private apollo: Apollo
  ) { }

  createApplication(app): Observable<any> {
    return this.apollo.mutate(
      {
        mutation: gql`
          mutation createApplication($app: ApplicationInput) {
            createApplication(application: $app)
            ${this.queryFileds}
          }`,
        variables: {
          'app': app,
        }
      }
    ).pipe(
      switchMap((d: any) => {
        // console.log('check', d);
        return [d.data.createApplication];
      }),
      catchError(e => of(e))
    );
  }

  getApplicationList(userId): Observable<any> {
    return this.apollo.query(
      {
        query: gql`
          query getApplications($userId: String) {
            getApplications(userId: $userId)
            ${this.queryFileds}
          }`,
        variables: {
          'userId': userId,
        }
      }
    ).pipe(
      switchMap((d: any) => {
        // console.log('check', d);
        return [d.data.getApplications];
      }),
      catchError(e => of(e))
    );
  }

  getApplicationById(appId: string): Observable<any> {
    return this.apollo.query(
      {
        query: gql`
          query getApplicationById($appId: String) {
            getApplicationById(appId: $appId)
            ${this.queryFileds}
          }`,
        variables: {
          'appId': appId,
        }
      }
    ).pipe(
      map((d: any) => {
        // console.log('check', d);
        return d.data.getApplicationById;
      }),
      catchError(e => of(e))
    );
  }

  updateApplication(application: Application, notifyAdmin?: boolean): Observable<any> {

    return this.apollo.mutate(
      {
        mutation: gql`
          mutation updateApplication($app: ApplicationInput, $notifyAdmin: Boolean) {
            updateApplication(application: $app, notifyAdmin: $notifyAdmin)
            ${this.queryFileds}
          }`,
        variables: {
          'app': application,
          'notifyAdmin': notifyAdmin ? notifyAdmin : false
        }
      }
    ).pipe(
      map((d: any) => {
        // console.log('check', d);
        return d.data.updateApplication;
      }),
      catchError(e => of(e))
    );
  }
}
