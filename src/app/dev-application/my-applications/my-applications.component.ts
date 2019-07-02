import { Component, OnInit } from '@angular/core';
import { CreateApplicationDialogComponent } from '../create-application-dialog/create-application-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Application } from 'src/app/shared/models/application.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/state/app.state';
import { selectApplicationList } from 'src/app/core/store/selectors/application.selectors';
import { GetApplications } from 'src/app/core/store/actions/application.action';
import { AuthService } from 'src/app/core/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-applications',
  templateUrl: './my-applications.component.html',
  styleUrls: ['./my-applications.component.scss']
})
export class MyApplicationsComponent implements OnInit {

  myApplications$: Observable<Application[]>;
  userId: string;

  constructor(
    public dialog: MatDialog,
    private store: Store<AppState>,
    private authService: AuthService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.myApplications$ = this.store.select(selectApplicationList);

    this.route.params.subscribe(params => {
      console.log(params);
      this.userId = params['id'];
      this.store.dispatch(new GetApplications(this.userId));
    });

  }

  openCreateAppDialog() {
    const dialogRef = this.dialog.open(CreateApplicationDialogComponent, {
      width: '500px',
      height: '250px'
    });
  }

}
