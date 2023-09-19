import {
    AbstractControl,
    AsyncValidatorFn,
    ValidationErrors,
  } from '@angular/forms';
  import { Observable, of } from 'rxjs';
  import { map } from 'rxjs/operators';
  
  export class UniquenessValidator {
    static createValidator(service: any, currentValue: string | null = null): AsyncValidatorFn {
      return (control: AbstractControl): Observable<ValidationErrors> | Observable<null> => {

        console.log(currentValue)

        if(currentValue && control.value === currentValue) return of(null);

        return service
          .validateUniqueness(control.value)
          .pipe(
            map((result: boolean) =>
              result ? { alreadyExits: true } : null
            )
          );
      };
    }
  }