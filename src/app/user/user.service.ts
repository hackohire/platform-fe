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

  createUserQuery = gql`
    mutation user($user: UserInput!) {
      createUser(user: $user)
      {
        _id
        name
        email
        linkedin_url
        github_url
        stackoverflow_url
        location
        currentJobDetails {
          jobProfile
          companyName
          companyLocation
        }
        programming_languages
        avatar
        roles,
        applications
      }
    }`;

  updateUserQuery = gql`
    mutation user($user: UserInput!) {
      updateUser(user: $user)
      {
        _id
        name
        email
        linkedin_url
        github_url
        stackoverflow_url
        location
        currentJobDetails {
          jobProfile
          companyName
          companyLocation
        }
        programming_languages
        avatar
        roles
        applications
      }
    }`;

  constructor(private apollo: Apollo) { }

  getUsers(): Observable<any> {
    return this.apollo.query(
      {
        query: gql`
          query getUsers {
            getUsers
            {
              _id,
              name,
            }
          }`
      }
    ).pipe(
      switchMap((d: any) => {
        console.log('check', d);
        return [d.data.getUsers];
      })
    );
  }

  createUser(u: User) {
    console.log(u);

    return this.apollo.mutate(
      {
        mutation: this.createUserQuery,
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

  updateUser(u: User) {
    console.log(u);

    return this.apollo.mutate(
      {
        mutation: this.updateUserQuery,
        variables: {
          'user': u,
        }
      }
    ).pipe(
      switchMap((d: any) => {
        return [d.data.updateUser];
      })
    );
  }
}
