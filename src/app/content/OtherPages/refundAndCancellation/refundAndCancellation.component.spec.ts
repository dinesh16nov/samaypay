import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RefundAndCancellationComponent } from './refundAndCancellation.component';

describe('RefundAndCancellationComponent', () => {
  let component: RefundAndCancellationComponent;
  let fixture: ComponentFixture<RefundAndCancellationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefundAndCancellationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundAndCancellationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
