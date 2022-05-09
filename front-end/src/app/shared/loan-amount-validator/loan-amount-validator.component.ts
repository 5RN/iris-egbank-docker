import {Component, Output, EventEmitter} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';


/** Error when invalid control is dirty, touched, or submitted. */
export class EGBankAmountValidator implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

/** @title Input with a custom EmailValidator */
@Component({
  selector: 'loan-amount-validator',
  templateUrl: './loan-amount-validator.component.html',
  styleUrls: ['./loan-amount-validator.component.css']
})
export class LoanAmountValidator {
  amountFormControl = new FormControl('', [
    Validators.required,
    Validators.min(0),
    Validators.max(3000000),
  ]);

  @Output() messageEvent = new EventEmitter<string>();

  constructor() { }

  /*
  sendMessage() {
    this.messageEvent.emit(this.validAmount)
  }
  */

  public isAmountValid() {
    if((this.amountFormControl.hasError('min'))){
      alert ("Amount must be greater than 0")
      return false
    }
    else if((this.amountFormControl.hasError('max'))){
      alert ("Amount cannot exceed EGP 3,000,000")
      return false
    }
    else return true
  }

  matcher = new EGBankAmountValidator;
}
