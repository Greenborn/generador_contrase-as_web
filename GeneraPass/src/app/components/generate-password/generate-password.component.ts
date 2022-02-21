import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PasswordOptions } from './models/password.options';

@Component({
  selector: 'app-generate-password',
  templateUrl: './generate-password.component.html',
  styleUrls: ['./generate-password.component.css']
})
export class GeneratePasswordComponent implements OnInit {

  constructor() { }

  public password:string = '';
  public passwordOptions:PasswordOptions = new PasswordOptions();

  private passCont!: HTMLInputElement;

  ngOnInit(): void {
  }

  copyToClipboard(){
    if (this.password == '') {
      alert('Para poder copiar una contraseña primero es necesario generar una nueva');
      return false;
    }

    this.passCont = document.getElementById("passCont") as HTMLInputElement;
    this.passCont.select();
    document.execCommand('copy');
    alert("¡Contraseña copiada al portapapeles!");

    return true;
  }

  generatePassword(){
    if (this.passwordOptions.long < 0){
      alert('La longitud de la contraseña debe ser mayor a 0');
      return false;
    }

    if (!(this.passwordOptions.minus || this.passwordOptions.mayus || this.passwordOptions.numbers || this.passwordOptions.symbol)){
      alert('Es necesario elegir al menos una opcion de tipo de contraseña');
      return false;
    }

    if (this.passwordOptions.long >= 10000){
      alert('La cantidad de caracteres ingresada es demasiado grande!');
      return false;
    }

    this.password = '';
    for (let c=0; c < this.passwordOptions.long; c++){
      this.password += this.getPasswordChar();
    }

    return true;
  }

  getPasswordChar():string{
    //se genera un numero al azar entre 1 y 4, dicho numero representa el tipo de caracter a insertar
    let option:number = Math.round( Math.random() * (4 - 1) + 1 );
    let ch:string     = '';
    
    switch (option){
      case 1:
        if (!this.passwordOptions.mayus) { //si no se seleccionaron las mayusculas
          return this.getPasswordChar();
        }
        return this.getCaracter(this.letras).toUpperCase();
      break;

      case 2:
        if (!this.passwordOptions.minus) { //si no se seleccionaron las minusculas
          return this.getPasswordChar();
        }
        return this.getCaracter(this.letras);
      break;

      case 3:
        if (!this.passwordOptions.numbers) { //si no se seleccionaron numeros
          return this.getPasswordChar();
        }
        return this.getNumero();
      break;

      case 4:
        if (!this.passwordOptions.symbol) { //si no se seleccionaron simbolos
          return this.getPasswordChar();
        }
        return this.getCaracter(this.simbolos);
      break;
    }
    return ch;
  }

  private letras:string = 'abcdefghijklmnñopqrstuvwxyz';
  private simbolos:string= '!$%&/()=?^_-:;@*º|#~{[]}';
  getCaracter(chs:string):string{
    let chsCount  = chs.length -1;
    let chsSelect = Math.round( Math.random() * (chsCount - 0) + 0 );
    return chs[chsSelect];
  }

  private getNumero():string{
    return String(Math.round( Math.random() * (9 - 0) + 0 ));
  }

}
