import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavPropertyComponent } from './fav-property.component';

describe('FavPropertyComponent', () => {
  let component: FavPropertyComponent;
  let fixture: ComponentFixture<FavPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavPropertyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
