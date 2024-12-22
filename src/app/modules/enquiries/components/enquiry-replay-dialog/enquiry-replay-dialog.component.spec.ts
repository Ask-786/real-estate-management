import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryReplayDialogComponent } from './enquiry-replay-dialog.component';

describe('EnquiryReplayDialogComponent', () => {
  let component: EnquiryReplayDialogComponent;
  let fixture: ComponentFixture<EnquiryReplayDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [EnquiryReplayDialogComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(EnquiryReplayDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
