import { PropertyPopulatedEnquiryModelInterface } from './../../model/enquiryform.interface';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/models/appState.interface';
import { userEnquiriesSelector } from '../../store/selectors';
import { EnquiriesAction } from '../../store/actions';

@Component({
  selector: 'app-user-enquiries',
  templateUrl: './user-enquiries.component.html',
  styleUrls: ['./user-enquiries.component.css'],
})
export class UserEnquiriesComponent implements OnInit {
  enquiries$: Observable<PropertyPopulatedEnquiryModelInterface[]>;

  constructor(private store: Store<AppStateInterface>) {
    this.enquiries$ = this.store.pipe(
      select(userEnquiriesSelector),
    );
  }

  ngOnInit(): void {
    this.store.dispatch(EnquiriesAction.getUserEnquiries());
  }

  getEnquiryRoute(id: string): string {
    return `${id}`;
  }

  getPropertyRoute(id: string): string {
    return `../../properties/property/${id}`;
  }
}
