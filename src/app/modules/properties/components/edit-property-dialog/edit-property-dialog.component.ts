import { S3Service } from './../../../../shared/services/s3.service';
import { PropertiesService } from './../../services/properties.service';
import { NotificationService } from './../../../../shared/services/notification.service';
import { MapDialogComponent } from './../../../../shared/components/map-dialog/map-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, Subscription } from 'rxjs';
import { PropertyModelInterface } from './../../model/property.model';
import { Store, select } from '@ngrx/store';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { AppStateInterface } from 'src/app/models/appState.interface';
import * as PropertySelectors from '../../store/selectors';
import * as GlobalSelectors from '../../../../shared/store/selectors';
import * as GlobalActions from '../../../../shared/store/actions';
import { AddPropertyDialogComponent } from '../add-property-dialog/add-property-dialog.component';
import * as PropertiesActions from '../../store/actions';

@Component({
  selector: 'app-edit-property-dialog',
  templateUrl: './edit-property-dialog.component.html',
  styleUrls: ['./edit-property-dialog.component.css'],
})
export class EditPropertyDialogComponent implements OnInit, OnDestroy {
  property$: Observable<PropertyModelInterface | null>;
  propertyData!: FormGroup;
  isLoading$: Observable<boolean>;
  lattitude!: number | undefined;
  longitude!: number | undefined;
  propertyTypes: string[] = ['Land', 'Residential', 'Commercial', 'Industrial'];
  dialogRefSubscription!: Subscription;
  getUploadUrlSubscription!: Subscription;
  uploadImageSubscription!: Subscription;
  propertySubscription!: Subscription;
  isHidden = true as boolean;
  propertyId!: string;

  @ViewChild('imageOneDisplay') imageOneDisplay!: ElementRef;
  @ViewChild('imageTwoDisplay') imageTwoDisplay!: ElementRef;
  @ViewChild('imageThreeDisplay') imageThreeDisplay!: ElementRef;
  @ViewChild('imageFourDisplay') imageFourDisplay!: ElementRef;

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
    private s3Service: S3Service,
    private propertiesService: PropertiesService,
    private store: Store<AppStateInterface>,
    public dialogRef: MatDialogRef<AddPropertyDialogComponent>,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {
    this.property$ = this.store
      .pipe(select(PropertySelectors.selectedPropertySelector))
      .pipe(map((property) => property.property));
    this.isLoading$ = this.store.pipe(
      select(GlobalSelectors.isLoadingSelector)
    );
  }

  ngOnInit() {
    this.propertySubscription = this.property$.subscribe({
      next: (property) => {
        if (property) {
          this.propertyId = property._id;
          this.lattitude = property.coOrdinates.lattitude;
          this.longitude = property.coOrdinates.longitude;
          this.propertyData = new FormGroup({
            title: new FormControl(property.title, [Validators.required]),
            price: new FormControl(property.price, [Validators.required]),
            tags: new FormControl(property.tags.join(',')),
            description: new FormControl(property.description, [
              Validators.required,
              Validators.minLength(10),
            ]),
            lattitude: new FormControl(property.coOrdinates.lattitude, [
              Validators.required,
            ]),
            longitude: new FormControl(property.coOrdinates.longitude, [
              Validators.required,
            ]),
            propertyType: new FormControl(property.propertyType, [
              Validators.required,
            ]),
            country: new FormControl(property.address.country, [
              Validators.required,
            ]),
            state: new FormControl(property.address.state, [
              Validators.required,
            ]),
            district: new FormControl(property.address.district, [
              Validators.required,
            ]),
            city: new FormControl(property.address.city, [Validators.required]),
            streetAddress: new FormControl(property.address.streetAddress, [
              Validators.required,
            ]),
            zipCode: new FormControl(property.address.zipCode, [
              Validators.required,
            ]),
          });
        }
      },
    });
    //Setting up form
  }

  //Image Change Events
  imageOneChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }
    this.imageOne = input.files[0];
    const reader = new FileReader();
    reader.onload = () =>
      (this.imageOneDisplay.nativeElement.src = reader.result);
    this.imageButtonOneColor = this.BUTTON_COLOR;
    this.imageButtonOneValue = input.files[0].name;
    reader.readAsDataURL(this.imageOne);
  }

  imageTwoChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () =>
      (this.imageTwoDisplay.nativeElement.src = reader.result);
    this.imageTwo = input.files[0];
    this.imageButtonTwoColor = this.BUTTON_COLOR;
    this.imageButtonTwoValue = input.files[0].name;
    reader.readAsDataURL(this.imageTwo);
  }

  imageThreeChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () =>
      (this.imageThreeDisplay.nativeElement.src = reader.result);
    this.imageThree = input.files[0];
    this.imageButtonThreeColor = this.BUTTON_COLOR;
    this.imageButtonThreeValue = input.files[0].name;
    this.BUTTON_COLOR;
    reader.readAsDataURL(this.imageThree);
  }

  imageFourChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () =>
      (this.imageFourDisplay.nativeElement.src = reader.result);
    this.imageFour = input.files[0];
    this.imageButtonFourColor = this.BUTTON_COLOR;
    this.imageButtonFourValue = input.files[0].name;
    reader.readAsDataURL(this.imageFour);
  }

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

  toggleImages() {
    this.isHidden = !this.isHidden;
  }

  onSubmit() {
    if (this.propertyData.invalid) {
      this.notificationService.warn('Fill the form in full');
      return;
    }

    if (
      this.imageOne &&
      this.imageTwo &&
      this.imageThree &&
      this.imageFour &&
      !this.isHidden
    ) {
      this.store.dispatch(GlobalActions.loadingStart());
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
                        PropertiesActions.updateProperty({
                          id: this.propertyId,
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
    } else if (this.isHidden) {
      this.store.dispatch(
        PropertiesActions.updateProperty({
          id: this.propertyId,
          propertyData: this.propertyData.value,
        })
      );
      this.dialogRef.close();
    } else {
      this.notificationService.warn('Select all files');
      return;
    }
  }

  ngOnDestroy(): void {
    if (this.propertySubscription) this.propertySubscription.unsubscribe();
    if (this.dialogRefSubscription) this.dialogRefSubscription.unsubscribe();
  }
}
