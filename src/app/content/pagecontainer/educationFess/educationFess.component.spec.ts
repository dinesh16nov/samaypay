import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationFessComponent } from './educationFess.component';

describe('EducationFessComponent', () => {
  let component: EducationFessComponent;
  let fixture: ComponentFixture<EducationFessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationFessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationFessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
