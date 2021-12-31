import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarAssociationFeeComponent } from './barAssociationFee.component';

describe('BarAssociationFeeComponent', () => {
  let component: BarAssociationFeeComponent;
  let fixture: ComponentFixture<BarAssociationFeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarAssociationFeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarAssociationFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
