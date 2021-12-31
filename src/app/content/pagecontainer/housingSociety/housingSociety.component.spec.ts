import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingSocietyComponent } from './housingSociety.component';

describe('HousingSocietyComponent', () => {
  let component: HousingSocietyComponent;
  let fixture: ComponentFixture<HousingSocietyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HousingSocietyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HousingSocietyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
