import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnPropertiesComponent } from './own-properties.component';

describe('OwnPropertiesComponent', () => {
  let component: OwnPropertiesComponent;
  let fixture: ComponentFixture<OwnPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [OwnPropertiesComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(OwnPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
