import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AmplifyAngularModule } from 'aws-amplify-angular';
import { UserAvatarComponent } from './user-profile/user-avatar/user-avatar.component';

@NgModule({
  declarations: [UserProfileComponent, UserAvatarComponent],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule
  ],
  providers: [],
  exports: [
    // UserRoutingModule
  ]
})
export class UserModule { }
