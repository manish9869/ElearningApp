import { AbstractControl, ValidationErrors } from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(control: AbstractControl): ValidationErrors | null {
       let Password = control.get('Password').value as string; // to get value in input tag
       let ConfirmPassword = control.get('ConfirmPassword').value as string; // to get value in input tag
        if(Password != ConfirmPassword) {
            //console.log('false');
            control.get('ConfirmPassword').setErrors( {MatchPassword: true} )
        } else {
            //console.log('true');
            return null
        }
    }
}
