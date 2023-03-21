import { EnquiryReplayDialogComponent } from './../enquiry-replay-dialog/enquiry-replay-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PropertyPopulatedEnquiryModelInterface } from './../../model/enquiryform.interface';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppStateInterface } from 'src/app/models/appState.interface';
import * as moment from 'moment';
import * as EnquiriesActions from '../../store/actions';
import * as EnquiriesSelectors from '../../store/selectors';

@Component({
  selector: 'app-enquiry-details',
  templateUrl: './enquiry-details.component.html',
  styleUrls: ['./enquiry-details.component.css'],
})
export class EnquiryDetailsComponent implements OnInit, OnDestroy {
  moment = moment;
  enquiryId!: string;
  enquiryIdSubscription!: Subscription;
  selectedEnquiry$: Observable<PropertyPopulatedEnquiryModelInterface | null>;

  constructor(
    private store: Store<AppStateInterface>,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.enquiryId = params['id'];
      },
    });
    this.selectedEnquiry$ = this.store.pipe(
      select(EnquiriesSelectors.selectedEnquirySelector)
    );
  }

  ngOnInit() {
    this.store.dispatch(EnquiriesActions.getOneEnquiry({ id: this.enquiryId }));
  }

  replayDialogOpen() {
    this.dialog.open(EnquiryReplayDialogComponent);
  }

  ngOnDestroy() {
    if (this.enquiryIdSubscription) this.enquiryIdSubscription.unsubscribe();
  }
}
