import { EnquiryReplayDialogComponent } from './../enquiry-replay-dialog/enquiry-replay-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PropertyPopulatedEnquiryModelInterface } from './../../model/enquiryform.interface';
import { Subscription, Observable, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppStateInterface } from 'src/app/models/appState.interface';
import { EnquiriesAction } from '../../store/actions';
import { selectedEnquirySelector } from '../../store/selectors';

@Component({
    selector: 'app-enquiry-details',
    templateUrl: './enquiry-details.component.html',
    styleUrls: ['./enquiry-details.component.css'],
    standalone: false
})
export class EnquiryDetailsComponent implements OnInit, OnDestroy {
  enquiryId!: string;
  selectedEnquiry$: Observable<PropertyPopulatedEnquiryModelInterface | null>;
  subscriptions: Subscription[] = [];

  constructor(
    private store: Store<AppStateInterface>,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
  ) {
    this.subscriptions.push(
      this.activatedRoute.params.subscribe({
        next: (params) => {
          this.enquiryId = params['id'];
        },
      }),
    );

    this.selectedEnquiry$ = this.store
      .pipe(select(selectedEnquirySelector))
      .pipe(map((data) => data?.enquiry));
  }

  ngOnInit() {
    this.store.dispatch(EnquiriesAction.getOneEnquiry({ id: this.enquiryId }));
  }

  replayDialogOpen() {
    this.dialog.open(EnquiryReplayDialogComponent);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((el) => el.unsubscribe());
  }
}
