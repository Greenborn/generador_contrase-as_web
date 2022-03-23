import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppUIUtilsService {

    constructor(
    ) { }

    public messagePresent:boolean = false;
    public message:string = '';
    public messageHeader:string = '';
    public messageButtons:any = [];
    public displayAlert(message: string, header:string = 'Info', buttons:any = []) {
        this.messagePresent = true;
        this.message        = message;
        this.messageHeader  = header;
        this.messageButtons = buttons;
    }

    public dissmissAlert(){
        this.messagePresent = false;
    }
}