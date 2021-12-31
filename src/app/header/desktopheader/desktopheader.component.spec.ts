import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopheaderComponent } from './desktopheader.component';

describe('DesktopheaderComponent', () => {
  let component: DesktopheaderComponent;
  let fixture: ComponentFixture<DesktopheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesktopheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesktopheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
