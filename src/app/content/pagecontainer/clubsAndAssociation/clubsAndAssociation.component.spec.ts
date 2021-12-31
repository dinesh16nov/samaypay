import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubsAndAssociationComponent } from './clubsAndAssociation.component';

describe('ClubsAndAssociationComponent', () => {
  let component: ClubsAndAssociationComponent;
  let fixture: ComponentFixture<ClubsAndAssociationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubsAndAssociationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubsAndAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
