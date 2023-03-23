import { DeleteWarningComponent } from './../delete-warning/delete-warning.component';
import { EditPropertyDialogComponent } from './../edit-property-dialog/edit-property-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';
import { CreateEnquiryFormInterface } from './../../../enquiries/model/enquiryform.interface';
import { NotificationService } from './../../../../shared/services/notification.service';
import { AppStateInterface } from './../../../../models/appState.interface';
import { PropertyModelInterface } from './../../model/property.model';
import { UserModelInterface } from 'src/app/shared/models/user.interface';
import * as PropertiesActions from '../../store/actions';
import * as PropertieseSelectors from '../../store/selectors';
import * as GlobalSelectors from '../../../../shared/store/selectors';
import * as EnquiriesActions from '../../../enquiries/store/actions';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css'],
})
export class PropertyDetailsComponent implements OnInit, OnDestroy {
  selectedImage = 0 as number;
  property$: Observable<PropertyModelInterface | null>;
  enquiryForm!: FormGroup;
  isLoggedIn$: Observable<boolean>;
  user$: Observable<UserModelInterface | null>;
  propertyId!: string;
  userId!: string | undefined;
  propertyOwner!: string | undefined;
  propertytSubscription!: Subscription;
  isFavorite$: Observable<boolean>;
  activatedRouteSubscription: Subscription;
  userSubscription!: Subscription;
  property!: PropertyModelInterface | null;

  enquiryTopics = [
    'Payment',
    'Schedule Visit',
    'Sales',
    'Information',
  ] as string[];

  constructor(
    private store: Store<AppStateInterface>,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {
    this.activatedRouteSubscription = this.activatedRoute.params.subscribe(
      (params) => {
        this.propertyId = params['id'];
      }
    );
    this.property$ = this.store
      .pipe(select(PropertieseSelectors.selectedPropertySelector))
      .pipe(map((property) => property.property));
    this.isLoggedIn$ = this.store.pipe(
      select(GlobalSelectors.isLoggedInSelector)
    );
    this.user$ = this.store.pipe(select(GlobalSelectors.userSelector));
    this.isFavorite$ = this.store
      .pipe(select(PropertieseSelectors.selectedPropertySelector))
      .pipe(map((data) => data.isFavorite));
  }

  ngOnInit() {
    this.store.dispatch(
      PropertiesActions.getOneProperty({ propertyId: this.propertyId })
    );
    this.store.dispatch(PropertiesActions.getFavoriteIds());

    this.userSubscription = this.user$.subscribe((user) => {
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
    this.propertytSubscription = this.property$.subscribe((data) => {
      this.property = data;
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

  onDelete() {
    let title: string | undefined;
    let id: string | undefined;
    this.propertytSubscription = this.property$.subscribe({
      next: (data) => ((title = data?.title), (id = data?._id)),
    });
    this.dialog.open(DeleteWarningComponent, {
      data: { title, id },
    });
  }

  onEdit() {
    this.dialog.open(EditPropertyDialogComponent);
  }

  onFavour() {
    if (this.property) {
      this.store.dispatch(
        PropertiesActions.favourProperty({ id: this.property._id })
      );
    }
  }

  onUnFavour() {
    if (this.property) {
      this.store.dispatch(
        PropertiesActions.unFavourProperty({ id: this.property._id })
      );
    }
  }

  ngOnDestroy() {
    if (this.propertytSubscription) this.propertytSubscription.unsubscribe();
    if (this.activatedRouteSubscription)
      this.activatedRouteSubscription.unsubscribe();
    if (this.userSubscription) this.userSubscription.unsubscribe();
  }
}
