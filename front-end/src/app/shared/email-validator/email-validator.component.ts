import {Component, Output, EventEmitter} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';


/** Error when invalid control is dirty, touched, or submitted. */
export class DoJEmailValidator implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

/** @title Input with a custom EmailValidator */
@Component({
  selector: 'email-validator',
  templateUrl: './email-validator.component.html',
  styleUrls: ['./email-validator.component.css']
})
export class EmailValidator {
  validEmail: string;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  @Output() messageEvent = new EventEmitter<string>();

  constructor() { }

  sendMessage() {
    this.messageEvent.emit(this.validEmail)
  }

  public isEmailValid() {
    if((this.emailFormControl.hasError('email'))){
      alert ("Valid email address is required")
      return false
    }
    else return true
  }

  matcher = new DoJEmailValidator;
}
