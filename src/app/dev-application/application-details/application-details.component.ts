import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/store/state/app.state';
import { Observable, Subscription } from 'rxjs';
import { Application } from 'src/app/shared/models/application.model';
import { GetApplication, UpdateApplication } from 'src/app/core/store/actions/application.action';
import { selectApplication } from 'src/app/core/store/selectors/application.selectors';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.scss']
})
export class ApplicationDetailsComponent implements OnInit, OnDestroy {

  selectedApplication$: Observable<Application>;
  private subscription: Subscription;

  applicationDetailsForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.selectedApplication$ = this.store.pipe(select(selectApplication));
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe( p => {
      if (p['applicationId']) {
        this.store.dispatch(new GetApplication(p['applicationId']));
      }
    });

    this.subscription = this.selectedApplication$.subscribe((a: Application) => {
      if (a) {
        this.applicationDetailsForm = new FormGroup({
          _id: new FormControl(a._id),
          name: new FormControl(a.name),
          description: new FormControl(a.description ? a.description : ''),
          uuid: new FormControl({value: a.uuid, disabled: true}),
          application_url: new FormControl(a.application_url ? a.application_url : ''),
          privacy_policy_url: new FormControl(a.privacy_policy_url ? a.privacy_policy_url : ''),
          status: new FormControl(a.status ? a.status : '')
        });
      } else {
        // this.router.navigate(['../']);
      }
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  updateApplication(appStatus?: string, notifyAdmin?: boolean) {
    if (appStatus) {
      this.applicationDetailsForm.get('status').setValue(appStatus);
    }
    this.store.dispatch(new UpdateApplication(this.applicationDetailsForm.value, notifyAdmin));
  }

}
