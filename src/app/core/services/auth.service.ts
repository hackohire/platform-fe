import { Injectable } from '@angular/core';
import { Hub, ICredentials, AWS } from '@aws-amplify/core';
import { AmplifyService } from 'aws-amplify-angular';
import { UserService } from 'src/app/user/user.service';
import { State, Store } from '@ngrx/store';
import { AppState } from '../store/state/app.state';
import { CreateUser, SetLoggedInUser } from '../store/actions/user.actions';
import { Router } from '@angular/router';
import { selectLoggedInUser } from '../store/selectors/user.selector';
import { User } from 'src/app/shared/models/user.model';
import { CognitoIdentityServiceProvider } from 'aws-sdk/clients/all';
import { Auth } from 'aws-amplify';
import { AuthState } from 'aws-amplify-angular/dist/src/providers';
import { CognitoUser } from '@aws-amplify/auth';
import { ResetPlatFormState } from '../store/actions/app.actions';
import { Apollo } from 'apollo-angular';


@Injectable()
export class AuthService {
  signedIn: boolean;
  loggedInUser: User;
  // greeting: string;
  authStatus: string;

  redirectURL: string;

  constructor(
    private amplifyService: AmplifyService,
    private userService: UserService,
    private store: Store<AppState>,
    private router: Router,
    private apollo: Apollo
  ) {

    if (localStorage.getItem('loggedInUser')) {
      this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    }

    Hub.listen('auth', (data) => {
      const { channel, payload } = data;
      const state = {
        state: payload.event,
        user: payload.data
      };
      console.log('Hub', data);
      if (channel === 'auth') {
        // this.amplifyService.authState().next(state);
      }
    });

    this.amplifyService.authStateChange$.subscribe((authState: AuthState) => {
      console.log('authState', authState);

      this.authStatus = authState.state;
      const user: CognitoUser = authState.user;
      this.signedIn = this.authStatus === 'signedIn';
      switch (this.authStatus) {
        case 'signedIn':
          if (!authState.user) {
            this.store.dispatch(new SetLoggedInUser(null));
          } else {
            // Once the user is signed In, Set the token in localstorage as "idToken"
            localStorage.setItem('idToken', authState.user.signInUserSession.idToken.jwtToken);
            // this.loggedInUser = authState.user;

            // Add registered user by default in the 'Developers' group in userpool
            let config = null;

            Auth.currentCredentials().then(async (credentials: ICredentials) => {
              // console.log(credentials);
              // Constructor for the global config.
              config = new AWS.Config({
                'credentials': credentials,
                region: 'us-east-1'
              });

              if (!user.getSignInUserSession().getIdToken().payload['cognito:groups'] ||
                (this.getUserFromLocalStorage() && !this.getUserFromLocalStorage().roles.length)
              ) {
                const cognitoIdentityServiceProvider = await new CognitoIdentityServiceProvider(config);
                const params = {
                  GroupName: 'Developer',
                  UserPoolId: authState.user.pool.userPoolId,
                  Username: authState.user.username,
                };
                await cognitoIdentityServiceProvider.adminAddUserToGroup(params).promise();
              }

              await Auth.currentAuthenticatedUser({
                bypassCache: true
              }).then( (user) => {
                // console.log(user);
                // Update set with Loggedin User
                const userToBeSent: User = user.attributes;
                const token = user.getSignInUserSession().getIdToken().payload;
                userToBeSent.roles = (token && token['cognito:groups']) ? token['cognito:groups'] : [];

                if (this.getUserFromLocalStorage()) {
                  this.store.dispatch(new SetLoggedInUser(this.getUserFromLocalStorage()));
                } else {
                  this.store.dispatch(new CreateUser(userToBeSent));
                }
                localStorage.setItem('idToken', user.signInUserSession.idToken.jwtToken);

              })
                .catch(err => console.log(err));

            });
          }
          break;

        case 'confirmSignUp':
          break;

        case 'signedOut':
          localStorage.clear();
          // this.store.dispatch(new SetLoggedInUser(null));
          this.store.dispatch(new ResetPlatFormState());
          this.apollo.getClient().resetStore();
        // this.router.navigate(['/']);
      }
    });

    this.store.select(selectLoggedInUser).subscribe((u: User) => {
      if (u) {
        this.setUserForLocalStorage(u);

        // If the redirect url is there, redirect the user
        if (this.redirectURL) {
          this.router.navigateByUrl(this.redirectURL).then(d => {
            if (d) {
              this.redirectURL = '';
            }
          });
        }

      } else {
        // localStorage.clear();
      }
      this.loggedInUser = u;
    });
  }

  setUserForLocalStorage(user) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  getUserFromLocalStorage() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    return loggedInUser ? JSON.parse(loggedInUser) : '';
  }

  // Set the redirect URL for user to be redirected after login
  setRedirectURI(url: string) {
    this.redirectURL = url;
  }
}
