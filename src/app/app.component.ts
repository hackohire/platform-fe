import { Component, OnInit } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';
import { Store, select } from '@ngrx/store';
import { AppState } from './core/store/state/app.state';
import { selectUserList, selectSelectedUser } from './core/store/selectors/user.selector';
import { GetUsers, GetUserSuccess, GetUser } from './core/store/actions/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'platform-fe';
  usernameAttributes = 'email';
  signUpConfig = {
    // header: 'My Customized Sign Up',
    hideAllDefaults: true,
    defaultCountryCode: '91',
    signUpFields: [
      {
        label: 'Name',
        key: 'name',
        required: true,
        displayOrder: 1,
        type: 'string'
      },
      {
        label: 'Email',
        key: 'email',
        required: true,
        displayOrder: 2,
        type: 'string',
      },
      {
        label: 'Password',
        key: 'password',
        required: true,
        displayOrder: 3,
        type: 'password'
      },
    ]
  };

  users$ = this.store.pipe(select(selectUserList));
  user$ = this.store.pipe(select(selectSelectedUser))

  constructor(
    private amplifyService: AmplifyService,
    private store: Store<AppState>
  ) {



    // this.amplifyService.auth();          // AWS Amplify Auth
    /** now you can access category APIs:
     * this.amplifyService.analytics();     // AWS Amplify Analytics
     * this.amplifyService.storage();       // AWS Amplify Storage
     * this.amplifyService.api();           // AWS Amplify API
     * this.amplifyService.cache();         // AWS Amplify Cache
     * this.amplifyService.pubsub();        // AWS Amplify PubSub
     **/
  }

  ngOnInit() {
    this.store.dispatch(new GetUsers());

    setInterval(() => {
      this.store.dispatch(new GetUser('5d0c8a2386e7b800067b5664'));
    }, 10000);
    
    // this.amplifyService.auth();
  }
}
