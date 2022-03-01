import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PublicRandomWordService } from 'src/app/services/public.random.word';
import { PasswordOptions } from './models/password.options';

@Component({
  selector: 'app-generate-password',
  templateUrl: './generate-password.component.html',
  styleUrls: ['./generate-password.component.css']
})
export class GeneratePasswordComponent implements OnInit {

  constructor(
    private publicRandomWordService: PublicRandomWordService
  ) { }

  public password:string = '';
  public passwordOptions:PasswordOptions = new PasswordOptions();

  private passCont!: HTMLInputElement;

  ngOnInit(): void {
    this.resetearOpciones();
  }

  resetearOpciones(){
    this.passwordOptions = new PasswordOptions();
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

    //VALIDACIONES
    if (this.passwordOptions.long < 7){
      alert('La longitud de la contraseña debe ser igual o mayor a 8');
      return false;
    }

    let optsTrue:boolean = false;
    for ( let c=0; c < this.passwordOptions.passwordParts.length; c++){
      optsTrue = optsTrue || this.passwordOptions.passwordParts[c].enabled;
    }
    if (!optsTrue){
      alert('Es necesario elegir al menos una opcion de tipo de contraseña');
      return false;
    }

    if (this.passwordOptions.long >= 10000){
      alert('La cantidad de caracteres ingresada es demasiado grande!');
      return false;
    }

    for ( let c=0; c < this.passwordOptions.passwordParts.length; c++){
      this.passwordOptions.passwordParts[c].validate();
    }

    //CONTRUIR CONTRASEÑA
    this.password = '';
    for (let c=0; c < this.passwordOptions.long; c++){
      this.password += this.getPasswordChar();
    }

    return true;
  }

  getPasswordChar():string{
    //se genera un numero al azar entre 1 y 4, dicho numero representa el tipo de caracter a insertar
    let option:number = Math.round( Math.random() * (this.passwordOptions.passwordParts.length - 1) );
    let ch:string     = '';
    
    if (!this.passwordOptions.passwordParts[ option ].enabled){
        return this.getPasswordChar();
    } else {
        return this.passwordOptions.passwordParts[ option ].getPart();
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

}
