import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { UserService } from '../user.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export function checkEmailNotTaken(userService : UserService) : AsyncValidatorFn{
    return (control : AbstractControl) => {
        const email = control.value;

        return userService.checkEmail(email).pipe(
            map(response => {
                return response.exists ? {emailTaken : true} : null;
            }),
            catchError(() => of(null))
        )
    };
}