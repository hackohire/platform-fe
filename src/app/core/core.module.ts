import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';

import { EnsureModuleLoadedOnlyOnceGuard } from './guards/ensure-module-loaded-only-once.guard';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { appReducesrs } from './store/reducers/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/effects/user.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { ApplicationEffects } from './store/effects/application.effects';
import { MaterialModule } from './material.module';
import { environment } from 'src/environments/environment';
import { PermissionEvents } from './services/permisson-event.service';
import { EPlatformActions } from './store/actions/app.actions';

export function clearState(reducer) {
  return (state, action) => {

    if (action.type === EPlatformActions.ResetPlatFormState) {
      state = undefined;
    }

    return reducer(state, action);
  };
}


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    AmplifyAngularModule,
    StoreModule.forRoot(appReducesrs(), { metaReducers: [clearState] }),
    EffectsModule.forRoot([UserEffects, ApplicationEffects]),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    StoreDevtoolsModule.instrument(),
    ApolloModule,
    HttpLinkModule,
    MaterialModule
  ],
  providers: [
    AuthService,
    AmplifyService,
    PermissionEvents
  ],
  exports: [
    AmplifyAngularModule
  ]
})
export class CoreModule extends EnsureModuleLoadedOnlyOnceGuard {
  // Looks for the module in the parent injector to see if it's already been loaded
  constructor(@Optional() @SkipSelf() parentModule: CoreModule, apollo: Apollo, httpLink: HttpLink) {
    super(parentModule);

    // Apollo Server Configuration
    const http = httpLink.create({ uri: environment.graphql_url });

    let token = '';
    const authLink = new ApolloLink((operation, forward) => {


      // Get the authentication token from local storage if it exists
      token = localStorage.getItem('idToken');

      // Use the setContext method to set the HTTP headers.
      operation.setContext({
        headers: {
          Authorization: token ? token : ''
        }
      });
      // Call the next link in the middleware chain.
      return forward(operation);
    });

    apollo.create({
      link: authLink.concat(http),
      cache: new InMemoryCache({
        addTypename: false
      }),
    });

    // apollo.create({
    //   link: httpLink.create({ uri: 'http://localhost:3000/graphql' }),
    //   cache: new InMemoryCache(),
    // });
  }
}
