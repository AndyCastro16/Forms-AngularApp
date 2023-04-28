import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches.component.html',
  styles: [
  ]
})
export class SwitchesComponent {
  public myForm = this.fb.group({
    gender: ['', Validators.required],
    wantNotifications: [ false, Validators.required ],
    termsAndConditions: [ false, Validators.requiredTrue ]
  })

  constructor(
    public fb: FormBuilder
  ){

  }

  onSave(){

    if( this.myForm.invalid ){
      this.myForm.markAllAsTouched();
      return;
    }
    this.myForm.reset()
  }
}
