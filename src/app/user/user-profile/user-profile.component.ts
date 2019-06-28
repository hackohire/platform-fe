import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/state/app.state';
import { selectLoggedInUser } from 'src/app/core/store/selectors/user.selector';
import { UpdateUser } from 'src/app/core/store/actions/user.actions';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userProfileForm: FormGroup;
  loggedInUser: User;
  user$: Observable<User>;
  constructor(
    private store: Store<AppState>,
    public authService: AuthService
  ) {

    this.user$ = this.store.select(selectLoggedInUser);
    this.store.select(selectLoggedInUser).subscribe((u: User) => {
      console.log(u);
      this.loggedInUser = u;
      if (u) {
        // this.userProfileForm.setValue(u);
        this.userProfileForm = new FormGroup({
          name: new FormControl({value: this.loggedInUser ? this.loggedInUser.name : '', disabled: true}),
          email: new FormControl({value: this.loggedInUser ? this.loggedInUser.email : '', disabled: true}),
          linkedin_url: new FormControl(this.loggedInUser ? this.loggedInUser.linkedin_url : ''),
          github_url: new FormControl(this.loggedInUser ? this.loggedInUser.github_url : ''),
          stackoverflow_url: new FormControl(this.loggedInUser ? this.loggedInUser.stackoverflow_url : ''),
          location: new FormControl(this.loggedInUser ? this.loggedInUser.location : ''),
          currentJobDetails: new FormGroup({
            jobProfile: new FormControl(this.loggedInUser && this.loggedInUser.currentJobDetails ?
              this.loggedInUser.currentJobDetails.jobProfile : ''),
            companyName: new FormControl(this.loggedInUser && this.loggedInUser.currentJobDetails ?
              this.loggedInUser.currentJobDetails.companyName : ''),
            companyLocation: new FormControl(this.loggedInUser && this.loggedInUser.currentJobDetails ?
              this.loggedInUser.currentJobDetails.companyLocation : '')
          }),
          _id: new FormControl(this.loggedInUser ? this.loggedInUser._id : '')
    
        });
      }
    });
  }

  ngOnInit() {

  }

  updateUser(): void {
    console.log(this.userProfileForm.value);
    this.store.dispatch(new UpdateUser(this.userProfileForm.value));
  }

}
