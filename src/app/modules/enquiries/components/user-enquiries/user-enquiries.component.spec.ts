import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEnquiriesComponent } from './user-enquiries.component';

describe('UserEnquiriesComponent', () => {
  let component: UserEnquiriesComponent;
  let fixture: ComponentFixture<UserEnquiriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserEnquiriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserEnquiriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
