import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import gql from 'graphql-tag';
import { switchMap } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { User } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apollo: Apollo) {}

  getUsers(): Observable<any> {
    return this.apollo.query(
      {
        query: gql`
          query getUsers {
            getUsers
            {
              _id,
              name
            }
          }`
      }
    ).pipe(
      switchMap((d: any) => {
        console.log('check', d)
        return [d.data.getUsers];
      })
    );
  }

  createUser(u: User) {
    console.log(u);

    return this.apollo.mutate(
      {
        mutation: gql`
          mutation createUser($user: UserInput!) {
            createUser(user: $user)
            {
              _id
              name
            }
          }`,
        variables: {
          'user': u,
        }
      }
    ).pipe(
      switchMap((d: any) => {
        return [d.data.createUser];
      })
    );
    // return of({});
  }
}
