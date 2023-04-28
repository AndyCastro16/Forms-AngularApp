import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './basic.component.html',
  styles: [
  ]
})
export class BasicComponent implements OnInit{
  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]]
  })
  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
    
  }

  isValidField(field: string){
    return this.myForm.controls[field].errors 
      && this.myForm.controls[field].touched
  }
  getFieldError(field: string): string | null{
    if( !this.myForm.controls[field] ) return null;
    const errors = this.myForm.controls[field].errors || {};
    for(const key of Object.keys(errors)){
      switch(key){
        case 'required':
          return 'This field is required';
        case'minlength':
          return 'This field must be at least 3 characters long'
        case 'min':
          return 'This field must be greater than or equal to 0'
      }
    }
    return null
  }
  onSave(){
    let formValid = this.myForm.invalid
    if(formValid) return;
    console.log(this.myForm.value);
    this.myForm.reset();
  }
}
