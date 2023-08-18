import { PropertyPopulatedEnquiryModelInterface } from './model/enquiryform.interface';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as EnquiriesActions from './store/actions';
import * as EnquiriesSelectors from './store/selectors';
import * as GlobalActions from '../../shared/store/actions';
import { AppStateInterface } from 'src/app/models/appState.interface';

@Component({
  selector: 'app-enquiries',
  templateUrl: './enquiries.component.html',
  styleUrls: ['./enquiries.component.css'],
})
export class EnquiriesComponent implements OnInit {
  enquiries$: Observable<PropertyPopulatedEnquiryModelInterface[]>;

  constructor(private store: Store<AppStateInterface>) {
    this.enquiries$ = this.store.pipe(
      select(EnquiriesSelectors.enquiriesSelector)
    );
  }

  ngOnInit(): void {
    this.store.dispatch(GlobalActions.setHeader({ header: 'Enquiries' }));
    this.store.dispatch(EnquiriesActions.getEnquiries());
  }

  getPropertyRoute(id: string): string {
    return `../properties/property/${id}`;
  }

  getEnquiryRoute(id: string): string {
    return `enquiry/${id}`;
  }
}
