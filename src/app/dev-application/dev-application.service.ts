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
    // console.log(app);
    app = {
      name: 'T',
      // createdBy: ""
    };
    return this.apollo.mutate(
      {
        mutation: gql`
          mutation createApplication($app: ApplicationInput) {
            createApplication(application: $app)
            {
              _id
              name
            }
          }`,
        variables: {
          'app': app,
        }
      }
    ).pipe(
      switchMap((d: any) => {
        // console.log('check', d);
        return [[d.data.createApplication]];
      }),
      catchError(e => of(e))
    );
    // return of({});
  }
}
