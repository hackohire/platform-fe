import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/state/app.state';
import { CreateApplication } from 'src/app/core/store/actions/application.action';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-create-application-dialog',
  templateUrl: './create-application-dialog.component.html',
  styleUrls: ['./create-application-dialog.component.scss']
})
export class CreateApplicationDialogComponent implements OnInit {

  createApplicationForm: FormGroup;


  constructor(
    private store: Store<AppState>,
    private authService: AuthService
  ) {
    this.createApplicationForm = new FormGroup({
      name: new FormControl({value: '', disabled: false}, Validators.required),
      description: new FormControl({value: '', disabled: false}),
      createdBy: new FormControl(this.authService.loggedInUser._id)
    });
  }

  ngOnInit() {
  }

  createApplication() {
    this.store.dispatch(new CreateApplication(this.createApplicationForm.value));
  }

}
