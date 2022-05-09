import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoanAmountValidator } from './loan-amount-validator.component';

describe('LoanAmountValidatorComponent', () => {
  let component: LoanAmountValidator;
  let fixture: ComponentFixture<LoanAmountValidator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanAmountValidator ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanAmountValidator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
