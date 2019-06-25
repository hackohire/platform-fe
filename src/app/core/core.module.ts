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

import { ApolloModule, Apollo } from 'apollo-angular'
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    AmplifyAngularModule,
    StoreModule.forRoot(appReducesrs),
    EffectsModule.forRoot([UserEffects]),
    StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
    StoreDevtoolsModule.instrument(),
    ApolloModule,
    HttpLinkModule,
  ],
  providers: [
    AuthService,
    AmplifyService
  ],
  exports: [AmplifyAngularModule]
})
export class CoreModule extends EnsureModuleLoadedOnlyOnceGuard {
  // Looks for the module in the parent injector to see if it's already been loaded
  constructor(@Optional() @SkipSelf() parentModule: CoreModule, apollo: Apollo, httpLink: HttpLink) {
    super(parentModule);
    apollo.create({
      link: httpLink.create({ uri: 'http://localhost:3000/graphql' }),
      cache: new InMemoryCache(),
    })
  }
}
