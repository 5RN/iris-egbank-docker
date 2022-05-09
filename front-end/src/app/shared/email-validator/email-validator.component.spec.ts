import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailValidator } from './email-validator.component';

describe('InputErrorStateMatcher', () => {
  let component: EmailValidator;
  let fixture: ComponentFixture<EmailValidator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailValidator ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailValidator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
