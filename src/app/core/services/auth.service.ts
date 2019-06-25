import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag'
import { tap, switchMap, map } from 'rxjs/operators';


@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient,
    private apollo: Apollo
  ) {

  }

  getUsers(): Observable<any> {
    return this.apollo.query(
      {
        query: gql`
          query getUsers {
            getUsers
            {
              _id
            }
          }`
      }
    ).pipe(
      switchMap((d: any) => {
         return [d.data.getUsers];
      })
    );
  }
}
