import { Component, OnInit } from '@angular/core';
import { CreateApplicationDialogComponent } from '../create-application-dialog/create-application-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Application, ApplicationStatus } from 'src/app/shared/models/application.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/state/app.state';
import { selectApplicationList } from 'src/app/core/store/selectors/application.selectors';
import { GetApplications, UpdateApplication } from 'src/app/core/store/actions/application.action';
import { AuthService } from 'src/app/core/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { selectLoggedInUser } from 'src/app/core/store/selectors/user.selector';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {

  applications$: Observable<Application[]>;
  appStatus = ApplicationStatus;
  userId: string;

  constructor(
    public dialog: MatDialog,
    private store: Store<AppState>,
    private authService: AuthService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.applications$ = this.store.select(selectApplicationList);

    // this.route.params.subscribe(params => {
    //   console.log(params);
    //   this.userId = params['id'];
    //   this.store.dispatch(new GetApplications(this.userId));
    // });

    this.store.select(selectLoggedInUser).subscribe((user) => {
      if (user) {
        this.store.dispatch(new GetApplications(user._id));
      }
    });

  }

  openCreateAppDialog() {
    const dialogRef = this.dialog.open(CreateApplicationDialogComponent, {
      width: '500px',
      height: '250px'
    });
  }

  updateApplication(application, appStatus: string) {
    application = {...application};
    application.status = ApplicationStatus[appStatus];
    this.store.dispatch(new UpdateApplication(application));
  }

}
