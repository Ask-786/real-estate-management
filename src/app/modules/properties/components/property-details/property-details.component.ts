import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CreateEnquiryFormInterface } from './../../../enquiries/model/enquiryform.interface';
import { NotificationService } from './../../../../shared/services/notification.service';
import { AppStateInterface } from './../../../../models/appState.interface';
import { PropertyModelInterface } from './../../model/property.model';
import * as PropertiesActions from '../../store/actions';
import * as PropertieseSelectors from '../../store/selectors';
import * as GlobalSelectors from '../../../../shared/store/selectors';
import * as EnquiriesActions from '../../../enquiries/store/actions';
import { UserModelInterface } from 'src/app/shared/models/user.interface';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css'],
})
export class PropertyDetailsComponent implements OnInit {
  selectedImage = 0 as number;
  property$: Observable<PropertyModelInterface | null>;
  enquiryForm!: FormGroup;
  isLoggedIn$: Observable<boolean>;
  user$: Observable<UserModelInterface | null>;
  propertyId!: string;
  userId!: string | undefined;
  propertyOwner!: string | undefined;

  enquiryTopics = [
    'Payment',
    'Schedule Visit',
    'Sales',
    'Information',
  ] as string[];

  constructor(
    private store: Store<AppStateInterface>,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.propertyId = params['id'];
    });
    this.property$ = this.store.pipe(
      select(PropertieseSelectors.selectedPropertySelector)
    );
    this.isLoggedIn$ = this.store.pipe(
      select(GlobalSelectors.isLoggedInSelector)
    );
    this.user$ = this.store.pipe(select(GlobalSelectors.userSelector));
  }

  ngOnInit() {
    this.store.dispatch(
      PropertiesActions.getOneProperty({ propertyId: this.propertyId })
    );

    this.user$.subscribe((user) => {
      this.userId = user?._id;
    });

    this.enquiryForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      content: new FormControl('', [Validators.required]),
      topic: new FormControl('', [Validators.required]),
      property: new FormControl(this.propertyId),
      user: new FormControl(this.userId),
    });
  }

  onSubmit(): void {
    if (this.enquiryForm.invalid) {
      return this.notificationService.warn('Complete the form correctly');
    }
    const data: CreateEnquiryFormInterface = {
      title: this.enquiryForm.value.title,
      content: this.enquiryForm.value.content,
      topic: this.enquiryForm.value.topic,
      property: this.enquiryForm.value.property,
    };
    this.store.dispatch(EnquiriesActions.createEnquiry({ data }));
  }
}
