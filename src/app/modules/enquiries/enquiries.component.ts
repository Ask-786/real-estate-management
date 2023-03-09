import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as EnquiriesActions from './store/actions';

@Component({
  selector: 'app-enquiries',
  templateUrl: './enquiries.component.html',
  styleUrls: ['./enquiries.component.css'],
})
export class EnquiriesComponent implements OnInit {
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store.dispatch(EnquiriesActions.getEnquiries());
  }
}
