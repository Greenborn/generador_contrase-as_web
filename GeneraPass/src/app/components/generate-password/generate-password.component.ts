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
    this.resetearOpciones();
  }

  resetearOpciones(){
    this.passwordOptions = new PasswordOptions();
    this.passwordOptions.availableSymbols = '!$%&/()=?^_-:;@*º|#~{[]}';
    this.passwordOptions.availableNumbers = '0123456789';
    this.passwordOptions.availableChars   = 'abcdefghijklmnñopqrstuvwxyz';
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
    if (this.passwordOptions.long < 7){
      alert('La longitud de la contraseña debe ser igual o mayor a 8');
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

    if (this.passwordOptions.availableSymbols == ''){
      alert('Revise las opciones avanzadas, se debe especificar al menos un sìmbolo o caracter especial');
      return false;
    }

    if (this.passwordOptions.availableNumbers == ''){
      alert('Revise las opciones avanzadas, se debe especificar al menos un número');
      return false;
    }

    if (this.passwordOptions.availableChars == ''){
      alert('Revise las opciones avanzadas, se debe especificar al menos una letra');
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
        return this.getCaracter(this.passwordOptions.availableChars).toUpperCase();
      break;

      case 2:
        if (!this.passwordOptions.minus) { //si no se seleccionaron las minusculas
          return this.getPasswordChar();
        }
        return this.getCaracter(this.passwordOptions.availableChars);
      break;

      case 3:
        if (!this.passwordOptions.numbers) { //si no se seleccionaron numeros
          return this.getPasswordChar();
        }
        return this.getCaracter(this.passwordOptions.availableNumbers);
      break;

      case 4:
        if (!this.passwordOptions.symbol) { //si no se seleccionaron simbolos
          return this.getPasswordChar();
        }
        return this.getCaracter(this.passwordOptions.availableSymbols);
      break;
    }
    return ch;
  }

  public opciones_avanzadas:boolean = false;
  public opciones_avanzadas_btnText = 'Ver opciones avanzadas';
  opciones_avanzadasTG(){
    this.opciones_avanzadas = !this.opciones_avanzadas;
    if (this.opciones_avanzadas){
      this.opciones_avanzadas_btnText = 'Ocultar opciones avanzadas';
    } else {
      this.opciones_avanzadas_btnText = 'Ver opciones avanzadas';
    }
  }

  getCaracter(chs:string):string{
    let chsCount  = chs.length -1;
    let chsSelect = Math.round( Math.random() * (chsCount - 0) + 0 );
    return chs[chsSelect];
  }

}
