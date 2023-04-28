import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  templateUrl: './register.component.html',
  styleUrls: []
})
export class RegisterComponent {
  public myForm = this.fb.group(
    {
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required, Validators.minLength(6)],
      passwordConf: ['', Validators.required]
    })

  constructor(
    public fb: FormBuilder
  ){

  }
  onSubmit(){
    
  }

} 
