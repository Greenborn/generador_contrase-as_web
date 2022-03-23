import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppUIUtilsService } from 'src/app/services/app.ui.utils.service';
import { PublicRandomWordService } from 'src/app/services/public.random.word';
import { PasswordOptions } from './models/password.options';

@Component({
  selector: 'app-generate-password',
  templateUrl: './generate-password.component.html',
  styleUrls: ['./generate-password.component.css']
})
export class GeneratePasswordComponent implements OnInit {

  constructor(
    private publicRandomWordService: PublicRandomWordService,
    private appUIUtilsService:       AppUIUtilsService
  ) { }

  public password:string = '';
  public passwordOptions:PasswordOptions = new PasswordOptions({ publicRandomWordService: this.publicRandomWordService });

  private passCont!: HTMLInputElement;

  ngOnInit(): void {
    this.resetearOpciones();
  }

  resetearOpciones(){
    this.passwordOptions = new PasswordOptions({ publicRandomWordService: this.publicRandomWordService });
  }

  copyToClipboard(){
    if (this.password == '') {
        this.appUIUtilsService.displayAlert("Para poder copiar una contraseña primero es necesario generar una nueva.", 'Atención', [
            { text:'Aceptar', css_class: 'btn-primary',callback:()=> { this.appUIUtilsService.dissmissAlert(); } }
        ]);
        return false;
    }

    this.passCont = document.getElementById("passCont") as HTMLInputElement;
    this.passCont.select();
    document.execCommand('copy');
    this.appUIUtilsService.displayAlert("¡Contraseña copiada al portapapeles!", 'Atención', [
        { text:'Aceptar', css_class: 'btn-primary',callback:()=> { this.appUIUtilsService.dissmissAlert(); } }
    ]);

    return true;
  }

  generatePassword(){

    //VALIDACIONES
    if (this.passwordOptions.long < 1){
        this.appUIUtilsService.displayAlert('La longitud de la contraseña debe ser igual o mayor a 1', 'Atención', [
            { text:'Aceptar', css_class: 'btn-primary',callback:()=> { this.appUIUtilsService.dissmissAlert(); } }
        ]);
        return false;
    }

    let optsTrue:boolean = false;
    for ( let c=0; c < this.passwordOptions.passwordParts.length; c++){
      optsTrue = optsTrue || this.passwordOptions.passwordParts[c].enabled;
    }
    if (!optsTrue){
        this.appUIUtilsService.displayAlert('Es necesario elegir al menos una opcion de tipo de contraseña', 'Atención', [
            { text:'Aceptar', css_class: 'btn-primary',callback:()=> { this.appUIUtilsService.dissmissAlert(); } }
        ]);
        return false;
    }

    if (this.passwordOptions.long >= 10000){
        this.appUIUtilsService.displayAlert('La cantidad de caracteres ingresada es demasiado grande!', 'Atención', [
            { text:'Aceptar', css_class: 'btn-primary',callback:()=> { this.appUIUtilsService.dissmissAlert(); } }
        ]);
        return false;
    }

    for ( let c=0; c < this.passwordOptions.passwordParts.length; c++){
      this.passwordOptions.passwordParts[c].validate();
    }

    //CONTRUIR CONTRASEÑA
    this.tmp_pass = [];
    for (let c = 0; c < this.passwordOptions.long; c++){
      this.getRandomChar(c);          
    }

    return true;
  }

  getRandomChar(c:number){
    //se genera un numero al azar entre 1 y 4, dicho numero representa el tipo de caracter a insertar
    let option:number = Math.round( Math.random() * (this.passwordOptions.passwordParts.length - 1) );
    if (this.passwordOptions.passwordParts[ option ].enabled){
        this.passwordOptions.passwordParts[ option ].getPart( (char:any)=> { this.updatePass(c,char.split("\n").join("")); } );
    } else {
        this.getRandomChar(c);
    }
  }

  public tmp_pass:any = [];
  updatePass( pos:number, char:string ){
    this.tmp_pass[pos] = char;
    this.password = '';
    for (let c=0; c < this.tmp_pass.length; c++){
      this.password += this.tmp_pass[c];
    }
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
