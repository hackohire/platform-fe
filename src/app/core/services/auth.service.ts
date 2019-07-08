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


@Injectable()
export class AuthService {
  signedIn: boolean;
  loggedInUser: User;
  // greeting: string;
  authStatus: string;

  constructor(
    private amplifyService: AmplifyService,
    private userService: UserService,
    private store: Store<AppState>,
    private router: Router
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

    this.amplifyService.authStateChange$.subscribe(authState => {
      console.log('authState', authState);

      this.authStatus = authState.state;
      this.signedIn = this.authStatus === 'signedIn';
      switch (this.authStatus) {
        case 'signedIn':
          if (!authState.user) {
            this.store.dispatch(new SetLoggedInUser(null));
          } else {
            // Once the user is signed In, Set the token in localstorage as "idToken"
            // localStorage.setItem('idToken', authState.user.signInUserSession.idToken.jwtToken);
            // this.loggedInUser = authState.user;

            // this.router.navigateByUrl(`/user/edit`);

            // Add registered user by default in the 'Developers' group in userpool
            let config = null;

            Auth.currentCredentials().then(async (credentials: ICredentials) => {
              // console.log(credentials);
              // Constructor for the global config.
              config = new AWS.Config({
                'credentials': credentials,
                region: 'us-east-1'
              });
              const cognitoIdentityServiceProvider = await new CognitoIdentityServiceProvider(config);
              const params = {
                GroupName: 'Developer',
                UserPoolId: authState.user.pool.userPoolId,
                Username: authState.user.username,
              };
              await cognitoIdentityServiceProvider.adminAddUserToGroup(params).promise();

              await Auth.currentAuthenticatedUser({
                bypassCache: true
              }).then((user) => {
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

              })
                .catch(err => console.log(err));
            });
          }
          break;

        case 'confirmSignUp':
          break;

        case 'signedOut':
          this.store.dispatch(new SetLoggedInUser(null));
          this.router.navigateByUrl('/');
      }
    });

    this.store.select(selectLoggedInUser).subscribe((u: User) => {
      this.setUserForLocalStorage(u);
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
}
