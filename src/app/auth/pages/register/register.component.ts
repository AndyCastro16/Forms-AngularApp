import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { EmailValidatorService } from 'src/app/shared/validators/email-validator.service';

@Component({
  templateUrl: './register.component.html',
  styleUrls: []
})
export class RegisterComponent {
  constructor(
    public fb: FormBuilder,
    public customValidators: ValidatorsService,
    public emailValidator: EmailValidatorService
  ){
  }

  public myForm = this.fb.group(
    {
      name: ['', [Validators.required, Validators.pattern(this.customValidators.firstNameAndLastnamePattern)]],
      username: ['', [Validators.required, this.customValidators.cantBeStrider]],
      email: ['', [Validators.required, Validators.pattern(this.customValidators.emailPattern)], [ this.emailValidator ] ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConf: ['', [Validators.required]]
    },{
      validators: [
        this.customValidators.isFirstSameAsSecond('password', 'passwordConf')
      ]
    })

  

  isValidField(field: string) {
    return this.customValidators.isValidField(this.myForm, field);
  }

  onSubmit(){
    this.myForm.markAllAsTouched();
  }

} 
