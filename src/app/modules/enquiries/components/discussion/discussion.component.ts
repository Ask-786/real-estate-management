import { ActivatedRoute } from '@angular/router';
import { EnquiryDiscussionInterface } from './../../model/enquiryDiscussion.interfact';
import { NgForm } from '@angular/forms';
import { EnquiryDiscussionService } from './../../services/enquiry-discussion.service';
import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { UserModelInterface } from 'src/app/shared/models/user.interface';
import { PropertyPopulatedEnquiryModelInterface } from '../../model/enquiryform.interface';
import { AppStateInterface } from 'src/app/models/appState.interface';
import { select, Store } from '@ngrx/store';
import * as GlobalSelectors from '../../../../shared/store/selectors';
import * as EnquirySelectors from '../../store/selectors';
import * as EnquiryActions from '../../store/actions';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css'],
})
export class DiscussionComponent implements OnInit, OnDestroy {
  user$: Observable<UserModelInterface | null>;
  enquiry$: Observable<PropertyPopulatedEnquiryModelInterface | null>;
  discussions$: Observable<EnquiryDiscussionInterface[]>;
  messageSusbscription!: Subscription;
  userSubscription!: Subscription;

  user!: UserModelInterface;
  enquiryId!: string;

  @ViewChild('chatForm') chatForm!: NgForm;

  constructor(
    private discussionService: EnquiryDiscussionService,
    private store: Store<AppStateInterface>,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((data) => {
      this.enquiryId = data['id'];
    });
    this.user$ = this.store.pipe(select(GlobalSelectors.userSelector));
    this.enquiry$ = this.store
      .pipe(select(EnquirySelectors.selectedEnquirySelector))
      .pipe(map((data) => data?.enquiry));
    this.discussions$ = this.store.pipe(
      select(EnquirySelectors.selectedEnquiryDiscussionsSelector)
    );
  }

  async ngOnInit() {
    if (this.enquiryId) {
      this.discussionService.joinRoom(this.enquiryId);
    }
    this.userSubscription = this.user$.subscribe((data) => {
      if (data) {
        this.user = data;
      }
    });
    this.messageSusbscription = this.discussionService
      .getNewMessage()
      .subscribe({
        next: (newMessage: EnquiryDiscussionInterface) =>
          this.store.dispatch(EnquiryActions.gotNewMessage({ newMessage })),
      });
  }

  onSubmit(value: { message: string }) {
    if (!value.message) return;
    if (this.user && this.enquiryId) {
      this.store.dispatch(
        EnquiryActions.sentNewMessage({
          newMessage: {
            _id: '',
            message: value.message,
            enquiry: this.enquiryId,
            sender: this.user._id,
            createdAt: Date.now().toString(),
            updatedAt: '',
          },
        })
      );
      this.chatForm.reset();
    }
  }

  ngOnDestroy(): void {
    this.discussionService.leaveRoom(this.enquiryId);
    if (this.messageSusbscription) this.messageSusbscription.unsubscribe();
    if (this.userSubscription) this.userSubscription.unsubscribe();
  }
}
