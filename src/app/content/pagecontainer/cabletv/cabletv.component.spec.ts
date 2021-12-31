import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabletvComponent } from './cabletv.component';

describe('CabletvComponent', () => {
  let component: CabletvComponent;
  let fixture: ComponentFixture<CabletvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CabletvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabletvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
