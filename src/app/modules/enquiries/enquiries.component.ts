import { PropertyPopulatedEnquiryModelInterface } from './model/enquiryform.interface';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { EnquiriesAction } from './store/actions';
import { enquiriesSelector } from './store/selectors';
import { GlobalActions } from 'src/app/shared/store/actions';
import { AppStateInterface } from 'src/app/models/appState.interface';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AsyncPipe, DatePipe } from '@angular/common';
import { EnquiryComponent } from './components/enquiry/enquiry.component';

@Component({
  selector: 'app-enquiries',
  templateUrl: './enquiries.component.html',
  styleUrls: ['./enquiries.component.css'],
  imports: [MatButton, RouterLink, EnquiryComponent, AsyncPipe, DatePipe],
})
export class EnquiriesComponent implements OnInit {
  enquiries$: Observable<PropertyPopulatedEnquiryModelInterface[]>;

  constructor(private store: Store<AppStateInterface>) {
    this.enquiries$ = this.store.pipe(select(enquiriesSelector));
  }

  ngOnInit(): void {
    this.store.dispatch(GlobalActions.setHeader({ header: 'Enquiries' }));
    this.store.dispatch(EnquiriesAction.getEnquiries());
  }

  getPropertyRoute(id: string): string {
    return `../properties/property/${id}`;
  }

  getEnquiryRoute(id: string): string {
    return `enquiry/${id}`;
  }
}
