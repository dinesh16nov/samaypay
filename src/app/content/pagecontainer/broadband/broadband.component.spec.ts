import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BroadbandComponent } from './broadband.component';

describe('BroadbandComponent', () => {
  let component: BroadbandComponent;
  let fixture: ComponentFixture<BroadbandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BroadbandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BroadbandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
