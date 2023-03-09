import { NotificationService } from './../../../../shared/services/notification.service';
import { S3Service } from './../../../../shared/services/s3.service';
import { PropertiesService } from './../../properties.service';
import { Subscription, Observable } from 'rxjs';
import { MapDialogComponent } from './../../../../shared/components/map-dialog/map-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PropertyTypeEnum } from './../../model/property.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from 'src/app/models/appState.interface';
import * as PropertiesActions from '../../store/actions';
import * as GlobalSelectors from '../../../../shared/store/selectors';

@Component({
  selector: 'app-add-property-dialog',
  templateUrl: './add-property-dialog.component.html',
  styleUrls: ['./add-property-dialog.component.css'],
})
export class AddPropertyDialogComponent implements OnInit, OnDestroy {
  type!: PropertyTypeEnum;
  lattitude!: number;
  longitude!: number;
  propertyTypes: string[] = ['Land', 'Residential', 'Commercial', 'Industrial'];
  propertyData!: FormGroup;
  isLoading$: Observable<boolean>;

  //Subscriptions
  dialogRefSubscription!: Subscription;
  getUploadUrlSubscription!: Subscription;
  uploadImageSubscription!: Subscription;

  imageOne!: File;
  imageTwo!: File;
  imageThree!: File;
  imageFour!: File;

  //Constants
  BUTTON_COLOR = 'primary';
  BUTTON_COLOR_LESS = 'none';

  //Colors for buttons to input images
  imageButtonOneColor = this.BUTTON_COLOR_LESS as string;
  imageButtonTwoColor = this.BUTTON_COLOR_LESS as string;
  imageButtonThreeColor = this.BUTTON_COLOR_LESS as string;
  imageButtonFourColor = this.BUTTON_COLOR_LESS as string;

  //Values for buttons to input images
  imageButtonOneValue = 'Image 1' as string;
  imageButtonTwoValue = 'Image 2' as string;
  imageButtonThreeValue = 'Image 3' as string;
  imageButtonFourValue = 'Image 4' as string;

  constructor(
    private dialog: MatDialog,
    private store: Store<AppStateInterface>,
    public dialogRef: MatDialogRef<AddPropertyDialogComponent>,
    private propertiesService: PropertiesService,
    private s3Service: S3Service,
    private notificationService: NotificationService
  ) {
    this.isLoading$ = this.store.pipe(
      select(GlobalSelectors.isLoadingSelector)
    );
  }

  //Map Config to take co-ordinates
  openMap() {
    const dialogRef = this.dialog.open(MapDialogComponent, {
      data: { lat: this.lattitude, lng: this.longitude },
    });

    this.dialogRefSubscription = dialogRef.afterClosed().subscribe({
      next: (data: L.LatLng) => {
        this.longitude = data?.lng;
        this.lattitude = data?.lat;
      },
      error: (err) => {
        this.notificationService.warn(err.message);
      },
    });
  }

  ngOnInit() {
    //Setting up form
    this.propertyData = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      tags: new FormControl(null),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
      lattitude: new FormControl(null, [Validators.required]),
      longitude: new FormControl(null, [Validators.required]),
      propertyType: new FormControl(null, [Validators.required]),
      country: new FormControl(null, [Validators.required]),
      state: new FormControl(null, [Validators.required]),
      district: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      streetAddress: new FormControl(null, [Validators.required]),
      zipCode: new FormControl(null, [Validators.required]),
    });
  }

  //Image Change Events
  imageOneChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }
    this.imageOne = input.files[0];
    this.imageButtonOneColor = this.BUTTON_COLOR;
    this.imageButtonOneValue = input.files[0].name;
  }

  imageTwoChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }
    this.imageTwo = input.files[0];
    this.imageButtonTwoColor = this.BUTTON_COLOR;
    this.imageButtonTwoValue = input.files[0].name;
  }

  imageThreeChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }
    this.imageThree = input.files[0];
    this.imageButtonThreeColor = this.BUTTON_COLOR;
    this.imageButtonThreeValue = input.files[0].name;
  }

  imageFourChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }
    this.imageFour = input.files[0];
    this.imageButtonFourColor = this.BUTTON_COLOR;
    this.imageButtonFourValue = input.files[0].name;
  }

  //On Submittingn form
  onSubmit() {
    if (this.propertyData.invalid) {
      this.notificationService.warn('Fill the form in full');
      // return;
    }

    if (this.imageOne && this.imageTwo && this.imageThree && this.imageFour) {
      const images: string[] = [];
      const imagesArray = [
        this.imageOne,
        this.imageTwo,
        this.imageThree,
        this.imageFour,
      ] as File[];

      //Uploading images to s3 and adding property into database
      imagesArray.forEach((el, index) => {
        //uploading images to s3 with loop
        this.getUploadUrlSubscription = this.propertiesService
          .gets3UploadUrl()
          .subscribe({
            next: (data) => {
              const imgUrl = data.uploadUrl.split('?')[0];
              images.push(imgUrl);
              this.uploadImageSubscription = this.s3Service
                .uploadImages(data.uploadUrl, el)
                .subscribe({
                  next: () => {
                    if (index === 3) {
                      //Dispatching the action to add the property to database after all images have been uploaded
                      this.store.dispatch(
                        PropertiesActions.addProperty({
                          propertyData: this.propertyData.value,
                          images,
                        })
                      );
                      this.dialogRef.close();
                    }
                  },
                  error: (err) => {
                    this.notificationService.warn(
                      `Image Upload: ${err.statusText}`
                    );
                  },
                });
            },
            error: (err) => {
              this.notificationService.warn(err.error.message);
            },
          });
      });
    } else {
      this.notificationService.warn('Select all files');
      // return;
    }
  }

  ngOnDestroy() {
    //Unsubscription
    if (this.dialogRefSubscription) this.dialogRefSubscription.unsubscribe();
    if (this.uploadImageSubscription)
      this.uploadImageSubscription.unsubscribe();
    if (this.getUploadUrlSubscription)
      this.uploadImageSubscription.unsubscribe();
  }
}
