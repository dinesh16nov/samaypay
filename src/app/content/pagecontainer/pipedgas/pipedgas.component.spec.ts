import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PipedgasComponent } from './pipedgas.component';

describe('PipedgasComponent', () => {
  let component: PipedgasComponent;
  let fixture: ComponentFixture<PipedgasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PipedgasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipedgasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
