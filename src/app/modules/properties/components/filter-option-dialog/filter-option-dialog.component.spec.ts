import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterOptionDialogComponent } from './filter-option-dialog.component';

describe('FilterOptionDialogComponent', () => {
  let component: FilterOptionDialogComponent;
  let fixture: ComponentFixture<FilterOptionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterOptionDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterOptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
