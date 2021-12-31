import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomheaderComponent } from './bottomheader.component';

describe('BottomheaderComponent', () => {
  let component: BottomheaderComponent;
  let fixture: ComponentFixture<BottomheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
