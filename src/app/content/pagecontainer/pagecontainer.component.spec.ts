import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagecontainerComponent } from './pagecontainer.component';

describe('PagecontainerComponent', () => {
  let component: PagecontainerComponent;
  let fixture: ComponentFixture<PagecontainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagecontainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagecontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
