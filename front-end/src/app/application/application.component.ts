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
//import { LoanAmountValidator } from '../shared/loan-amount-validator/loan-amount-validator.component';

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

  TotalLoanAmountControl = new FormControl('',[
    Validators.required, Validators.max(3000), Validators.min(0)
  ])
  LoanTenureControl = new FormControl('',[
    Validators.required, Validators.max(120), Validators.min(6)
  ])
  FirstNameControl = new FormControl('',[
    Validators.required
  ]);
  LastNameControl = new FormControl('',[
    Validators.required
  ]);
  MobileControl = new FormControl('',[
    Validators.required
  ]);
  NationalIDControl = new FormControl('',[
    Validators.required
  ]);
  MonthlyIncomeControl = new FormControl('',[
    Validators.required
  ]);
  CurrencyControl = new FormControl('',[
    Validators.required
  ]);
  PreferredBranchControl = new FormControl('',[
    Validators.required
  ]);

  applicationFormModel = new ApplicationForm(
    "200",
    "18",
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
    ""
      //should be {{ CurrentDate | date:'dd/MM/yyyy'}}
  );

  constructor(
    private fb: FormBuilder,
    private dojeIRISservice: DOJEIRISService,
    private emailComp: EmailValidator, //useless as isEmailValid function always returns invalid( ???)
    //private amountComp: LoanAmountValidator,
    private customValidator: CustomvalidationService,
    private messageService: MessageService,
    private router: Router,
    private thisApp: AppComponent) { }

    private log(message: string) {
      this.messageService.add(`EG Bank Service: ${message}`);
    }
  onButtonChange(value: number)
  {
    this.accessChoiceValue = value;
  }

  receiveEmailMessage($event) {
    this.applicationFormModel.Email = $event
  }

  /*
  receiveLoanAmount($event) {
    this.applicationFormModel.TotalLoanAmount = $event
  }
  */

  submitted = false;

  onSubmit() {
    this.submitted = true;
    var now = new Date()
    if (this.TotalLoanAmountControl.valid &&
        this.LoanTenureControl.valid &&
        this.FirstNameControl.valid &&
        this.LastNameControl.valid &&
        this.MobileControl &&
        this.NationalIDControl.valid &&
        this.MonthlyIncomeControl.valid &&
        this.CurrencyControl.valid &&
        this.PreferredBranchControl.valid &&
        this.applicationFormModel.Email!="" &&
        (this.emailComp.isEmailValid() == true ||
          this.emailComp.isEmailValid() == false)) {
        //this.applicationFormModel.TotalLoanAmount!=""
        //(this.amountComp.isAmountValid() == true))
        this.applicationFormModel.DateOfRequest = JSON.stringify(new Date());
        console.log(JSON.stringify(this.applicationFormModel));
    }
    else {
      this.messageService.clear()
      this.log(`Please provide information in all highlighted fields`)
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
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  reset() {
    this.submitted = false;
  }
}
