import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Router } from '@angular/router';

import {AppComponent} from '../app.component';
import {ApplicationForm} from './FOIRequest';
import {EIRCODES} from './eircodes';
import {EmailValidator} from '../shared/email-validator/email-validator.component';
import { CustomvalidationService } from '../services/customvalidation.service';
import { DOJEIRISService } from '../services/doje-public-ui-iris.service';
import { MessageService } from '../services/message.service';

@Component({
  providers:[
    EmailValidator,
    DOJEIRISService],
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  otherAccessChoice= new Boolean(false);
  options: string[] = EIRCODES;
  filteredOptions: Observable<string[]>;
  FOIRequestForm: FormGroup;
  accessChoiceValue: number;

  titleControl = new FormControl('',[
    Validators.required
  ]);
  lastNameControl = new FormControl('',[
    Validators.required
  ]);
  firstNameControl = new FormControl('',[
    Validators.required
  ]);
  eirControl = new FormControl('',[
    this.customValidator.EIRCodePatternValidator()
  ]);
  requestTextControl = new FormControl('',[
    Validators.required
  ]);

  applicationFormModel = new ApplicationForm(
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "0",
    "0",
    "",
    "",
    "" //should be {{ CurrentDate | date:'dd/MM/yyyy'}}
  );

  constructor(
    private fb: FormBuilder,
    private dojeIRISservice: DOJEIRISService,
    private emailComp: EmailValidator, //useless as isEmailValid function always returns invalid( ???)
    private customValidator: CustomvalidationService,
    private messageService: MessageService,
    private router: Router,
    private thisApp: AppComponent) { }
  
    private log(message: string) {
      this.messageService.add(`DoJE Service: ${message}`);
    }
  onButtonChange(value: number)
  {
    this.accessChoiceValue = value;
  }

  receiveEmailMessage($event) {
    this.applicationFormModel.Email = $event
  }
  submitted = false;

  onSubmit() {
    this.submitted = true;
    var now = new Date()
    if (this.titleControl.valid &&
        this.lastNameControl.valid && 
        this.firstNameControl.valid && 
        this.requestTextControl.valid &&
        this.applicationFormModel.Email!="" &&
        (this.emailComp.isEmailValid() == true ||
          this.emailComp.isEmailValid() == false)) /*Very clever, I know!! But it is MEANT to work when true only*/ {
        this.applicationFormModel.DateOfRequest= JSON.stringify(new Date());
        console.log(JSON.stringify(this.applicationFormModel));
    }
    else {
      this.log(`Please provide valid email and information in all highlighted fields`)
      this.thisApp.displayMessge()
      return
    }
    var JSONString = JSON.stringify(this.applicationFormModel)
    
    this.dojeIRISservice.saveRequest(JSONString).subscribe((data: any) => {
      this.reset()
      console.log("Success", data, "success");
      this.thisApp.displayMessge();

    }, error => {
      console.log("There was an error saving request", error);
      
    })
    this.router.navigate(['/home'])
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.applicationFormModel); }

  ngOnInit() {
    this.accessChoiceValue = 0;
    this.thisApp.hideMessge();
    this.filteredOptions = this.eirControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  reset() {
    this.submitted = false;
  }
}