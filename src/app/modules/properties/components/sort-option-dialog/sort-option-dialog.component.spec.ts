import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortOptionDialogComponent } from './sort-option-dialog.component';

describe('SortOptionDialogComponent', () => {
  let component: SortOptionDialogComponent;
  let fixture: ComponentFixture<SortOptionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortOptionDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortOptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
