import { S3Service } from './../../../../shared/services/s3.service';
import { PropertiesService } from './../../services/properties.service';
import { NotificationService } from './../../../../shared/services/notification.service';
import { MapDialogComponent } from './../../../../shared/components/map-dialog/map-dialog.component';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription, finalize } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  inject,
} from '@angular/core';
import { AppStateInterface } from 'src/app/models/appState.interface';
import * as GlobalSelectors from '../../../../shared/store/selectors';
import { GlobalActions } from 'src/app/shared/store/actions';
import { AddPropertyDialogComponent } from '../add-property-dialog/add-property-dialog.component';
import * as PropertiesActions from '../../store/actions';
import {
  AddPropertyInterface,
  PropertyFormModelInterface,
  PropertyModelInterface,
} from '../../model/property.model';

@Component({
  selector: 'app-edit-property-dialog',
  templateUrl: './edit-property-dialog.component.html',
  styleUrls: ['./edit-property-dialog.component.css'],
})
export class EditPropertyDialogComponent implements OnInit, OnDestroy {
  private s3Service = inject(S3Service);
  private propertiesService = inject(PropertiesService);
  private store = inject(Store<AppStateInterface>);
  public dialogRef = inject(MatDialogRef<AddPropertyDialogComponent>);
  private dialog = inject(MatDialog);
  private notificationService = inject(NotificationService);
  public dialogData: PropertyModelInterface = inject(MAT_DIALOG_DATA);

  propertyData!: FormGroup<PropertyFormModelInterface>;
  isLoading$: Observable<boolean>;
  lattitude: number | undefined;
  longitude: number | undefined;
  propertyTypes: string[] = ['Land', 'Residential', 'Commercial', 'Industrial'];
  subscriptions: Subscription[] = [];
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

  BUTTON_COLOR = 'primary';
  BUTTON_COLOR_LESS = 'none';

  imageButtonOneColor = this.BUTTON_COLOR_LESS as string;
  imageButtonTwoColor = this.BUTTON_COLOR_LESS as string;
  imageButtonThreeColor = this.BUTTON_COLOR_LESS as string;
  imageButtonFourColor = this.BUTTON_COLOR_LESS as string;

  imageButtonOneValue = 'Image 1' as string;
  imageButtonTwoValue = 'Image 2' as string;
  imageButtonThreeValue = 'Image 3' as string;
  imageButtonFourValue = 'Image 4' as string;

  constructor() {
    this.isLoading$ = this.store.pipe(
      select(GlobalSelectors.isLoadingSelector),
    );
  }

  ngOnInit() {
    this.propertyId = this.dialogData._id;
    this.lattitude = this.dialogData.coOrdinates.lattitude;
    this.longitude = this.dialogData.coOrdinates.longitude;
    this.propertyData = new FormGroup<PropertyFormModelInterface>({
      title: new FormControl(this.dialogData.title, [Validators.required]),
      price: new FormControl(this.dialogData.price, [Validators.required]),
      tags: new FormControl(this.dialogData.tags),
      description: new FormControl(this.dialogData.description, [
        Validators.required,
        Validators.minLength(10),
      ]),
      lattitude: new FormControl(this.dialogData.coOrdinates.lattitude, [
        Validators.required,
      ]),
      longitude: new FormControl(this.dialogData.coOrdinates.longitude, [
        Validators.required,
      ]),
      propertyType: new FormControl(this.dialogData.propertyType, [
        Validators.required,
      ]),
      country: new FormControl(this.dialogData.address.country, [
        Validators.required,
      ]),
      state: new FormControl(this.dialogData.address.state, [
        Validators.required,
      ]),
      district: new FormControl(this.dialogData.address.district, [
        Validators.required,
      ]),
      city: new FormControl(this.dialogData.address.city, [
        Validators.required,
      ]),
      streetAddress: new FormControl(this.dialogData.address.streetAddress, [
        Validators.required,
      ]),
      zipCode: new FormControl(this.dialogData.address.zipCode, [
        Validators.required,
      ]),
      images: new FormControl([]) as FormControl<string[]>,
    });
  }

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

    this.subscriptions.push(
      dialogRef.afterClosed().subscribe({
        next: (data: L.LatLng) => {
          this.longitude = data?.lng;
          this.lattitude = data?.lat;
        },
        error: (err) => {
          this.notificationService.warn(err.message);
        },
      }),
    );
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
      ];

      imagesArray.forEach((el, index) => {
        this.subscriptions.push(
          this.propertiesService.gets3UploadUrl()
          .pipe(finalize(() => this.store.dispatch(GlobalActions.loadingEnd({}))))
          .subscribe({
            next: (data) => {
              const imgUrl = data.uploadUrl.split('?')[0];
              images.push(imgUrl);
              this.subscriptions.push(
                this.s3Service.uploadImages(data.uploadUrl, el).subscribe({
                  next: () => {
                    if (index === 3) {
                      this.store.dispatch(
                        PropertiesActions.updateProperty({
                          id: this.propertyId,
                          propertyData: this.propertyData
                            .value as AddPropertyInterface,
                          images,
                        }),
                      );
                      this.dialogRef.close();
                    }
                  },
                  error: (err) => {
                    this.notificationService.warn(
                      `Image Upload: ${err.statusText}`,
                    );
                  },
                }),
              );
            },
            error: (err) => {
              this.notificationService.warn(err.error.message);
            },
          }),
        );
      });
    } else if (this.isHidden) {
      this.store.dispatch(
        PropertiesActions.updateProperty({
          id: this.propertyId,
          propertyData: this.propertyData.value as AddPropertyInterface,
        }),
      );
      this.dialogRef.close();
    } else {
      this.notificationService.warn('Select all files');
      return;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((el) => el.unsubscribe());
  }
}
