import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomvalidationService {
 
  EIRCodePatternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      //TO DO: test regex better. currently tested to work with D6Wnnnn //but clearly there are other positives in following regex pattern
      const regex = new RegExp('([AC-FHKNPRTV-Y]\d{2}|D6W)[0-9AC-FHKNPRTV-Y]{4}');
      //const regex = new RegExp('\b(?:(a(4[125s]|6[37]|7[5s]|[8b][1-6s]|9[12468b])|c1[5s]|d([0o][1-9sb]|1[0-8osb]|2[024o]|6w)|e(2[15s]|3[24]|4[15s]|[5s]3|91)|f(12|2[368b]|3[15s]|4[25s]|[5s][26]|9[1-4])|h(1[2468b]|23|[5s][34]|6[25s]|[79]1)|k(3[246]|4[5s]|[5s]6|67|7[8b])|n(3[79]|[49]1)|p(1[247]|2[45s]|3[126]|4[37]|[5s][16]|6[17]|7[25s]|[8b][15s])|r(14|21|3[25s]|4[25s]|[5s][16]|9[35s])|t(12|23|34|4[5s]|[5s]6)|v(1[45s]|23|3[15s]|42|9[2-5s])|w(12|23|34|91)|x(3[5s]|42|91)|y(14|2[15s]|3[45s]))\s?[abcdefhknoprtsvwxy\d]{4})\b');
      var valid = regex.test(control.value);
      return valid ? null : { invalidEIRCode: true };
    };
  }
  patternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }

  MatchPassword(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }

  userNameValidator(userControl: AbstractControl) {
    return new Promise(resolve => {
      setTimeout(() => {
        if (this.validateUserName(userControl.value)) {
          resolve({ userNameNotAvailable: true });
        } else {
          resolve(null);
        }
      }, 1000);
    });
  }

  validateUserName(userName: string) {
    const UserList = ['ankit', 'admin', 'user', 'superuser'];
    return (UserList.indexOf(userName) > -1);
  }
}