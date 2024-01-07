import { PropertyPopulatedEnquiryModelInterface } from './model/enquiryform.interface';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { EnquiriesAction } from './store/actions';
import { enquiriesSelector } from './store/selectors';
import { GlobalActions } from 'src/app/shared/store/actions';
import { AppStateInterface } from 'src/app/models/appState.interface';
import { AppRoutes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'app-enquiries',
  templateUrl: './enquiries.component.html',
  styleUrls: ['./enquiries.component.css'],
})
export class EnquiriesComponent implements OnInit {
  enquiries$: Observable<PropertyPopulatedEnquiryModelInterface[]>;
  appRoutes = AppRoutes;

  constructor(private store: Store<AppStateInterface>) {
    this.enquiries$ = this.store.pipe(select(enquiriesSelector));
  }

  ngOnInit(): void {
    this.store.dispatch(GlobalActions.setHeader({ header: 'Enquiries' }));
    this.store.dispatch(EnquiriesAction.getEnquiries());
  }
}
