import { ActivatedRoute } from '@angular/router';
import { EnquiryDiscussionInterface } from './../../model/enquiryDiscussion.interfact';
import { NgForm, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EnquiryDiscussionService } from './../../services/enquiry-discussion.service';
import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { UserModelInterface } from 'src/app/shared/models/user.interface';
import { PropertyPopulatedEnquiryModelInterface } from '../../model/enquiryform.interface';
import { AppStateInterface } from 'src/app/models/appState.interface';
import { select, Store } from '@ngrx/store';
import { userSelector } from '../../../../shared/store/selectors';
import {
  selectedEnquirySelector,
  selectedEnquiryDiscussionsSelector,
} from '../../store/selectors';
import { EnquiriesAction } from '../../store/actions';
import { AsyncPipe } from '@angular/common';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css'],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatMiniFabButton,
    MatIcon,
    AsyncPipe,
  ],
})
export class DiscussionComponent implements OnInit, OnDestroy {
  user$: Observable<UserModelInterface | null>;
  enquiry$: Observable<PropertyPopulatedEnquiryModelInterface | null>;
  discussions$: Observable<EnquiryDiscussionInterface[]>;
  subscriptions: Subscription[] = [];

  user!: UserModelInterface;
  enquiryId!: string;

  @ViewChild('chatForm') chatForm!: NgForm;

  constructor(
    private discussionService: EnquiryDiscussionService,
    private store: Store<AppStateInterface>,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.params.subscribe((data) => {
      this.enquiryId = data['id'];
    });
    this.user$ = this.store.pipe(select(userSelector));
    this.enquiry$ = this.store.pipe(
      select(selectedEnquirySelector),
      map((val) => val.enquiry),
    );
    this.discussions$ = this.store.pipe(
      select(selectedEnquiryDiscussionsSelector),
    );
  }

  ngOnInit() {
    if (this.enquiryId) {
      this.discussionService.joinRoom(this.enquiryId);
    }
    this.subscriptions.push(
      this.user$.subscribe((data) => {
        if (data) {
          this.user = data;
        }
      }),
      this.discussionService.getNewMessage().subscribe({
        next: (newMessage) =>
          this.store.dispatch(EnquiriesAction.gotNewMessage({ newMessage })),
      }),
    );
  }

  onSubmit(value: { message: string }) {
    if (!value.message) return;
    if (this.user && this.enquiryId) {
      this.store.dispatch(
        EnquiriesAction.sentNewMessage({
          newMessage: {
            _id: '',
            message: value.message,
            enquiry: this.enquiryId,
            sender: this.user._id,
            createdAt: Date.now().toString(),
            updatedAt: '',
          },
        }),
      );
      this.chatForm.reset();
    }
  }

  ngOnDestroy(): void {
    this.discussionService.leaveRoom(this.enquiryId);
    this.subscriptions.forEach((el) => el.unsubscribe());
  }
}
