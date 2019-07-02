import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/store/state/app.state';
import { Observable } from 'rxjs';
import { Application } from 'src/app/shared/models/application.model';
import { GetApplication } from 'src/app/core/store/actions/application.action';
import { selectApplication } from 'src/app/core/store/selectors/application.selectors';

@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.scss']
})
export class ApplicationDetailsComponent implements OnInit {

  selectedApplication$: Observable<Application>;

  constructor(
    private router: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.selectedApplication$ = this.store.pipe(select(selectApplication));
  }

  ngOnInit() {
    this.router.params.subscribe( p => {
      if (p['applicationId']) {
        this.store.dispatch(new GetApplication(p['applicationId']));
      }
    });
  }

}
