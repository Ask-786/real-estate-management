import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { NotificationService } from './../../../../shared/services/notification.service';
import { S3Service } from './../../../../shared/services/s3.service';
import { PropertiesService } from '../../services/properties.service';
import { Subscription, Observable, finalize } from 'rxjs';
import { MapDialogComponent } from './../../../../shared/components/map-dialog/map-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  AddPropertyInterface,
  PropertyFormModelInterface,
  PropertyTypeEnum,
} from './../../model/property.model';
import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from 'src/app/models/appState.interface';
import { PropertiesActions } from '../../store/actions';
import { isLoadingSelector } from '../../../../shared/store/selectors';
import { GlobalActions } from 'src/app/shared/store/actions';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
    selector: 'app-add-property-dialog',
    templateUrl: './add-property-dialog.component.html',
    styleUrls: ['./add-property-dialog.component.css'],
    standalone: false
})
export class AddPropertyDialogComponent implements OnInit, OnDestroy {
  type!: PropertyTypeEnum;
  lattitude!: number;
  longitude!: number;
  propertyTypes: string[] = ['Land', 'Residential', 'Commercial', 'Industrial'];
  propertyData!: FormGroup<PropertyFormModelInterface>;
  isLoading$: Observable<boolean>;
  possibleTags: string[] = ['House', 'Land', 'Property', '1 BHK', 'Office'];
  tagsCtrl = new FormControl('');
  tags: string[] = [];
  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  subscriptions: Subscription[] = [];

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

  constructor(
    private dialog: MatDialog,
    private store: Store<AppStateInterface>,
    public dialogRef: MatDialogRef<AddPropertyDialogComponent>,
    private propertiesService: PropertiesService,
    private s3Service: S3Service,
    private notificationService: NotificationService,
  ) {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
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

  ngOnInit() {
    this.propertyData = new FormGroup<PropertyFormModelInterface>({
      title: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      tags: new FormControl(this.tags),
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
      images: new FormControl([]) as FormControl<string[]>,
    });
  }

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

  onSubmit() {
    if (this.propertyData.invalid) {
      this.notificationService.warn('Fill the form in full');
      return;
    }

    if (this.imageOne && this.imageTwo && this.imageThree && this.imageFour) {
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
          this.propertiesService
            .gets3UploadUrl()
            .pipe(
              finalize(() => this.store.dispatch(GlobalActions.loadingEnd({}))),
            )
            .subscribe({
              next: (data) => {
                const imgUrl = data.uploadUrl.split('?')[0];
                images.push(imgUrl);
                this.propertyData.controls.images.setValue(images);
                this.subscriptions.push(
                  this.s3Service.uploadImages(data.uploadUrl, el).subscribe({
                    next: () => {
                      if (index === 3) {
                        this.store.dispatch(
                          PropertiesActions.addProperty({
                            propertyData: this.propertyData
                              .value as AddPropertyInterface,
                          }),
                        );
                        this.dialogRef.close();
                      }
                    },
                    error: (err) => {
                      this.dialogRef.close();
                      this.notificationService.warn(
                        `Image Upload: ${err.statusText}`,
                      );
                    },
                  }),
                );
              },
              error: (err) => {
                this.dialogRef.close();
                this.notificationService.warn(err.error.message);
              },
            }),
        );
      });
    } else {
      this.notificationService.warn('Select all files');
    }
  }

  get availableTags() {
    return this.possibleTags.filter((val) => !this.tags.includes(val));
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.tags.push(value);
    }

    event.chipInput.clear();

    this.tagsCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.tags.indexOf(fruit);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.tagsCtrl.setValue(null);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((el) => el.unsubscribe());
  }
}
