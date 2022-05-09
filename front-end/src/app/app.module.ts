import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './shared/material-module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ApplicationComponent } from './application/application.component';
import { EmailValidator } from './shared/email-validator/email-validator.component';
import { MessagesComponent } from './messages/messages.component';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule, MAT_DATE_LOCALE } from '@angular/material/core';
//import { LoanAmountValidator } from './shared/loan-amount-validator/loan-amount-validator.component';

@NgModule({
  declarations: [
    AppComponent,
    ApplicationComponent,
    EmailValidator,
    MessagesComponent,
//    LoanAmountValidator,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
  ],
  exports: [
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatLabel,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' } //puts the mat-date-picker in DD/MM/YYYY format rather than default MM/DD/YYYY
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
