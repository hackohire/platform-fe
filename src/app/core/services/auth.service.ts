import { Injectable } from '@angular/core';
import { Hub, ICredentials } from '@aws-amplify/core';
import { AmplifyService } from 'aws-amplify-angular';
import { UserService } from 'src/app/user/user.service';
import { State, Store } from '@ngrx/store';
import { AppState } from '../store/state/app.state';
import { CreateUser, SetLoggedInUser } from '../store/actions/user.actions';
import { Router } from '@angular/router';


@Injectable()
export class AuthService {
  signedIn: boolean;
  user: any;
  // greeting: string;
  authStatus: string;

  constructor(
    private amplifyService: AmplifyService,
    private userService: UserService,
    private store: Store<AppState>,
    private router: Router
  ) {

    Hub.listen('auth',(data) => {
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

    this.amplifyService.authState().subscribe(authState => {
      console.log('authState', authState);
      // console.log(authState);
      // console.log(authState.user.signInUserSession.idToken.jwtToken);
      this.authStatus = authState.state;
      this.signedIn = this.authStatus === 'signedIn';
      switch (this.authStatus) {
        case 'signedIn':
          if (!authState.user) {
            this.user = null;
          } else {
            // Once the user is signed In, Set the token in localstorage as "idToken"
            localStorage.setItem('idToken', authState.user.signInUserSession.idToken.jwtToken);
            this.user = authState.user;

            // Update set with Loggedin User
            this.store.dispatch(new CreateUser(this.user.attributes));
            // this.router.navigateByUrl(`/user/edit`);
          }
          break;

        case 'confirmSignUp':
          break;

        case 'signedOut':
          localStorage.removeItem('idToken');
          this.store.dispatch(new SetLoggedInUser(null));
      }
    });

    // Authentication Management Logic
    // this.amplifyService.authStateChange$
    //   .subscribe(authState => {
    //     console.log(authState);
    //     console.log(authState.user.signInUserSession.idToken.jwtToken);
    //     this.authStatus = authState.state;
    //     this.signedIn = this.authStatus === 'signIn';
    //     switch (this.authStatus) {
    //       case 'signIn':
    //         if (!authState.user) {
    //           this.user = null;
    //         } else {
    //           // Once the user is signed In, Set the token in localstorage as "idToken"
    //           localStorage.setItem('idToken', authState.user.signInUserSession.idToken.jwtToken);
    //           this.user = authState.user;
    //           console.log(this.user.name);
    //         }
    //         break;

    //       case 'signUp':
    //         this.store.dispatch(new CreateUser(this.user.username));
    //         break;

    //       case 'signOut':
    //         localStorage.removeItem('idToken');
    //     }

    //   });
  }


}
