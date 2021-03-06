import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/state/app.state';
import { selectLoggedInUser } from 'src/app/core/store/selectors/user.selector';
import { UpdateUser } from 'src/app/core/store/actions/user.actions';
import { AuthService } from 'src/app/core/services/auth.service';
import {COMMA, ENTER, SPACE} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips/typings/chip-input';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
  userProfileForm: FormGroup;
  loggedInUser: User;
  user$: Observable<User>;

  // Profile Picture
  // image: Base64;
  s3BucketUrl = environment.s3BucketURL;
  currentAvatarUrl: string;

  get avatar() { return this.userProfileForm.get('avatar'); }

  constructor(
    private store: Store<AppState>,
    public authService: AuthService,
  ) {

    // if (this.loggedInUser && !this.loggedInUser.programming_languages) {
    //   this.loggedInUser.programming_languages = [];
    // }

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
          programming_languages: new FormControl(this.loggedInUser ? this.loggedInUser.programming_languages : []),
          currentJobDetails: new FormGroup({
            jobProfile: new FormControl(this.loggedInUser && this.loggedInUser.currentJobDetails ?
              this.loggedInUser.currentJobDetails.jobProfile : ''),
            companyName: new FormControl(this.loggedInUser && this.loggedInUser.currentJobDetails ?
              this.loggedInUser.currentJobDetails.companyName : ''),
            companyLocation: new FormControl(this.loggedInUser && this.loggedInUser.currentJobDetails ?
              this.loggedInUser.currentJobDetails.companyLocation : '')
          }),
          _id: new FormControl(this.loggedInUser ? this.loggedInUser._id : ''),
          avatar: new FormControl(this.loggedInUser && this.loggedInUser.avatar ? this.loggedInUser.avatar : '')
        });

        if (this.avatar.value) {
          this.currentAvatarUrl = this.s3BucketUrl + this.avatar.value;
        }
      }
    });
  }

  ngOnInit() {

  }

  updateUser(): void {
    console.log(this.userProfileForm.value);
    this.store.dispatch(new UpdateUser(this.userProfileForm.value));
  }

  addProgrammingLanguage(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;
    if ((value.trim() !== '')) {
      this.loggedInUser.programming_languages.push(value);
      this.userProfileForm.controls.programming_languages.markAsDirty();
      input.value = '';
    }
  }

  onRemoveProgrammingLanguage(email: any) {
    const controller = this.userProfileForm.controls.programming_languages;
    const index = this.loggedInUser.programming_languages.indexOf(email, 0);
    if (index > -1) {
      this.loggedInUser.programming_languages.splice(index, 1);
    }
    controller.markAsDirty();
  }

  avatarUploaded(event) {
    console.log(event);
    this.avatar.setValue(event.key);
    this.currentAvatarUrl = this.s3BucketUrl + event.key;
  }

}
