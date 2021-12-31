import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandlineComponent } from './landline.component';

describe('LandlineComponent', () => {
  let component: LandlineComponent;
  let fixture: ComponentFixture<LandlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
