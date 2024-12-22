import { DeleteWarningComponent } from './../delete-warning/delete-warning.component';
import { EditPropertyDialogComponent } from './../edit-property-dialog/edit-property-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';
import { CreateEnquiryFormInterface } from './../../../enquiries/model/enquiryform.interface';
import { NotificationService } from './../../../../shared/services/notification.service';
import { AppStateInterface } from './../../../../models/appState.interface';
import { PropertyModelInterface } from './../../model/property.model';
import { UserModelInterface } from 'src/app/shared/models/user.interface';
import { PropertiesActions } from '../../store/actions';
import { selectedPropertySelector } from '../../store/selectors';
import {
  isLoggedInSelector,
  userSelector,
} from '../../../../shared/store/selectors';
import { GlobalActions } from 'src/app/shared/store/actions';
import { EnquiriesAction } from '../../../enquiries/store/actions';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MaskImageDirective } from '../../directives/mask-image.directive';
import { MapComponent } from '../map/map.component';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatRadioGroup, MatRadioButton } from '@angular/material/radio';

@Component({
    selector: 'app-property-details',
    templateUrl: './property-details.component.html',
    styleUrls: ['./property-details.component.css'],
    imports: [NgIf, MatButton, MatIconButton, MatIcon, MaskImageDirective, NgFor, MapComponent, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatError, MatRadioGroup, MatRadioButton, RouterLink, AsyncPipe]
})
export class PropertyDetailsComponent implements OnInit, OnDestroy {
  selectedImage = 0 as number;
  property$: Observable<PropertyModelInterface | null>;
  enquiryForm!: FormGroup;
  isLoggedIn$: Observable<boolean>;
  user$: Observable<UserModelInterface | null>;
  propertyId!: string;
  userId!: string;
  propertyOwner!: string | undefined;
  subscriptions: Subscription[] = [];
  isFavorite$: Observable<boolean>;
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
    private dialog: MatDialog,
  ) {
    this.subscriptions.push(
      this.activatedRoute.params.subscribe((params) => {
        this.propertyId = params['id'];
      }),
    );
    this.property$ = this.store
      .pipe(select(selectedPropertySelector))
      .pipe(map((property) => property.property));
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
    this.user$ = this.store.pipe(select(userSelector));
    this.isFavorite$ = this.store
      .pipe(select(selectedPropertySelector))
      .pipe(map((data) => data.isFavorite));
  }

  ngOnInit() {
    this.store.dispatch(
      GlobalActions.setHeader({ header: 'Property Details' }),
    );
    this.store.dispatch(
      PropertiesActions.getOneProperty({ propertyId: this.propertyId }),
    );
    this.store.dispatch(PropertiesActions.getFavoriteIds());

    this.subscriptions.push(
      this.user$.subscribe((user) => {
        if (user) {
          this.userId = user._id;
        }
      }),
    );

    this.enquiryForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      content: new FormControl('', [Validators.required]),
      topic: new FormControl('', [Validators.required]),
    });
    this.subscriptions.push(
      this.property$.subscribe((data) => {
        this.property = data;
      }),
    );
  }

  onSubmit(): void {
    if (this.enquiryForm.invalid) {
      return this.notificationService.warn('Complete the form correctly');
    }
    if (this.property) {
      const data: CreateEnquiryFormInterface = {
        propertyOwner: this.property?.owner,
        email: this.enquiryForm.value.email,
        title: this.enquiryForm.value.title,
        content: this.enquiryForm.value.content,
        topic: this.enquiryForm.value.topic,
        property: this.propertyId,
      };
      this.store.dispatch(EnquiriesAction.createEnquiry({ data }));
      this.enquiryForm.reset();
    }
  }

  onDelete() {
    let title: string | undefined;
    let id: string | undefined;
    this.subscriptions.push(
      this.property$.subscribe({
        next: (data) => ((title = data?.title), (id = data?._id)),
      }),
    );
    this.dialog.open(DeleteWarningComponent, {
      data: { title, id },
    });
  }

  onEdit() {
    this.dialog.open(EditPropertyDialogComponent, {
      data: this.property,
    });
  }

  onFavour() {
    if (this.property) {
      this.store.dispatch(
        PropertiesActions.favourProperty({ id: this.property._id }),
      );
    }
  }

  onUnFavour() {
    if (this.property) {
      this.store.dispatch(
        PropertiesActions.unfavourProperty({ id: this.property._id }),
      );
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((el) => el.unsubscribe());
  }
}
