import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator{

  constructor() { }
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;
    const httpCallObservable = new Observable<ValidationErrors | null>((subscriber) => {
      console.log({ email })
      if( email == 'fernando@gmail.com' ){
        subscriber.next({ emailTake: true })
        subscriber.complete();
      }

      subscriber.next(null);
      subscriber.complete();

    }).pipe(
      delay(3000) 
    )

    return httpCallObservable;
  }
  isFirstSameAsSecond(field1: string, field2: string){

  }
  /*
    Funcion original base, servira para seguir en un futuro con todo 
    validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;
    console.log({email});
    return of({
      emailTaken: true
    }).pipe(
      delay(1500)
    )
  } */

  /*
    return this.http.get(`http://localhost:backend/${email}`)
    .pipe(
      map(resp => {
        return (resp.length === 0)
        ? null 
        :{ emailTaken: True }
      })
    )
  */


  


}
