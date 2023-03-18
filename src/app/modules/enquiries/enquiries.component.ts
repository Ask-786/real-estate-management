import { EnquiryModelInterface } from './model/enquiryform.interface';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as EnquiriesActions from './store/actions';
import * as EnquiriesSelectors from './store/selectors';
import { AppStateInterface } from 'src/app/models/appState.interface';
import * as moment from 'moment';

@Component({
  selector: 'app-enquiries',
  templateUrl: './enquiries.component.html',
  styleUrls: ['./enquiries.component.css'],
})
export class EnquiriesComponent implements OnInit {
  enquiries$: Observable<EnquiryModelInterface[]>;
  moment = moment;

  constructor(private store: Store<AppStateInterface>) {
    this.enquiries$ = this.store.pipe(
      select(EnquiriesSelectors.enquiriesSelector)
    );
  }

  ngOnInit(): void {
    this.store.dispatch(EnquiriesActions.getEnquiries());
  }
}
