export class PasswordOptions {
    public long:number = 8;
    public passwordParts:any = [];
    
    public wordCount:number = 5;

    constructor( params:any ){
        this.passwordParts = [];
        this.passwordParts.push(new PasswordPartSymbol( { enabled:true }));
        this.passwordParts.push(new PasswordPartCharUpperCase({ enabled:true }));
        this.passwordParts.push(new PasswordPartChar({ enabled:true }));
        this.passwordParts.push(new PasswordNumber({ enabled:true }));
        this.passwordParts.push(new PasswordPartWord({ enabled:false, publicRandomWordService: params.publicRandomWordService  }));
    }
}

export class PasswordPart {
    public options:any = '';
    public defaultOptions:any;

    public label:string = '';
    public name:string = '';
    public enabled:boolean = false;
    public advancedOpts:boolean = false;

    public getPart(callback:any){ 
        let chsCount  = this.options.length -1;
        let chsSelect = Math.round( Math.random() * (chsCount - 0) + 0 );
        callback(this.options[chsSelect]);
    }

    public validate(){
        return true;
    }

    constructor(params:any){
        if (params.hasOwnProperty('enabled')){
            this.enabled = params.enabled;
        }
    }
}

export class PasswordPartSymbol extends PasswordPart {
    public defaultOptions = '!$%&/()=?^_-:;@*º|#~{[]}';
    public name:string = 'symbolInput';
    public label:string = 'Símbolos';
    public advancedOpts:boolean = true;

    public validate() {
        if (this.options == ''){
            alert('Revise las opciones avanzadas, se debe especificar al menos un sìmbolo o caracter especial');
            return false;
        }
        return true;
    }

    constructor( params:any = {} ){
        super(params);
        this.options = this.defaultOptions;
    }
}

export class PasswordPartCharUpperCase extends PasswordPart {
    public defaultOptions = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
    public name:string = 'mayusculasInput';
    public label:string = 'Mayúsculas';

    public validate() {
        if (this.options == ''){
            alert('Revise las opciones avanzadas, se debe especificar al menos una letra');
            return false;
        }
        return true;
    }

    constructor( params:any = {} ){
        super(params);
        this.options = this.defaultOptions;
    }
}

export class PasswordPartChar extends PasswordPart {
    public defaultOptions = 'abcdefghijklmnopqrstuvwxyz';
    public name:string = 'minusculasInput';
    public label:string = 'Minúsculas';
    public advancedOpts:boolean = true;

    public validate() {
        if (this.options == ''){
            alert('Revise las opciones avanzadas, se debe especificar al menos una letra');
            return false;
        }
        return true;
    }

    constructor( params:any = {} ){
        super(params);
        this.options = this.defaultOptions;
    }
}

export class PasswordNumber extends PasswordPart {
    public defaultOptions = '0123456789';
    public name:string = 'numerosInput';
    public label:string = 'Números';
    public advancedOpts:boolean = true;

    public validate() {
        if (this.options == ''){
            alert('Revise las opciones avanzadas, se debe especificar al menos un número');
            return false;
        }
        return true;
    }

    constructor( params:any = {} ){
        super(params);
        this.options = this.defaultOptions;
    }
}

export class PasswordPartWord extends PasswordPart {
    public defaultOptions = [];
    public name:string = 'palabrasInput';
    public label:string = 'Palabras aleatorias';
    public publicRandomWordService:any;

    constructor( params:any = {} ){
        super(params);
        this.options = this.defaultOptions;

        this.publicRandomWordService = params.publicRandomWordService;
    }

    public validate() {
        return true;
    }

    public getPart(callback:any){ 
        return this.publicRandomWordService.getAll().subscribe(
            (ok:any) => {
                callback( String(ok[0]) );
            },
            (err:any) => {
                callback( '' );        
            }
        );
    }    
}