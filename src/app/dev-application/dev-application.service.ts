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

  constructor(
    private apollo: Apollo
  ) { }

  createApplication(app): Observable<any> {
    return this.apollo.mutate(
      {
        mutation: gql`
          mutation createApplication($app: ApplicationInput) {
            createApplication(application: $app)
            {
              _id
              name
              createdBy
              description
            }
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
            {
              _id
              name,
              description
              createdBy
            }
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
            {
              _id
              name,
              description
              createdBy
            }
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
}
