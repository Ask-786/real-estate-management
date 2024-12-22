import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPropertyDialogComponent } from './edit-property-dialog.component';

describe('EditPropertyDialogComponent', () => {
  let component: EditPropertyDialogComponent;
  let fixture: ComponentFixture<EditPropertyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [EditPropertyDialogComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(EditPropertyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
