import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipUpdateComponent } from './membershipUpdate.component';

describe('MembershipUpdateComponent', () => {
  let component: MembershipUpdateComponent;
  let fixture: ComponentFixture<MembershipUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembershipUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
