import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageloaderComponent } from './pageloader.component';

describe('PageloaderComponent', () => {
  let component: PageloaderComponent;
  let fixture: ComponentFixture<PageloaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageloaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
