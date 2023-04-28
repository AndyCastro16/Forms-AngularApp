import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic.component.html',
  styles: [
  ]
})
export class DynamicComponent {
  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Chess', Validators.required]
    ])
  })
  public newFavorite = new FormControl('', [Validators.required])
  constructor(
    private fb: FormBuilder
  ){

  }
  get favoriteGames(){
    return this.myForm.get('favoriteGames') as FormArray;

  }
  isValidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

  isValidFieldInArray( formArray: FormArray, index: number ) {
    return formArray.controls[index].errors
        && formArray.controls[index].touched;
  }
  getFieldError( field: string ): string | null {

    if ( !this.myForm.controls[field] ) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors) ) {
      switch( key ) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } caracters.`;
      }
    }

    return null;
  }
  onAddFavorites(){
    if( this.newFavorite.invalid) return
    const newGame = this.newFavorite.value;

    this.favoriteGames.push(
      this.fb.control(newGame, Validators.required)
    );
    
    this.newFavorite.reset();
    console.log(this.newFavorite.value);
  }
  onDeleteFavorite(index: number): void{
    this.favoriteGames.removeAt(index);
  }
  onSubmit(){
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;      
    }
    console.log('Reiniciado');
    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([])
    this.myForm.reset();
  }
}
