import { NotificationService } from './../../../../shared/services/notification.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppStateInterface } from './../../../../models/appState.interface';
import { PropertyModelInterface } from './../../model/property.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as PropertiesActions from '../../store/actions';
import * as PropertieseSelectors from '../../store/selectors';
import * as GlobalSelectors from '../../../../shared/store/selectors';
import { Observable } from 'rxjs';
import { UserModelInterface } from 'src/app/shared/models/user.interface';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css'],
})
export class PropertyDetailsComponent implements OnInit {
  selectedImage = 0 as number;
  propertyId!: string;
  property$: Observable<PropertyModelInterface | null>;
  enquiryForm!: FormGroup;
  isLoggedIn$: Observable<boolean>;
  user$: Observable<UserModelInterface | null>;

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

  ngOnInit(): void {
    this.store.dispatch(
      PropertiesActions.getOneProperty({ propertyId: this.propertyId })
    );

    this.enquiryForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      content: new FormControl(null, [Validators.required]),
      topic: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit(): void {
    if (this.enquiryForm.invalid) {
      this.notificationService.warn('Complete the form correctly');
    }
    console.log(this.enquiryForm.value);
  }
}
