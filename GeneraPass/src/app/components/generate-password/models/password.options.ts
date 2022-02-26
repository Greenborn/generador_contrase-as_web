export class PasswordOptions {
    public long:number = 8;
    public mayus:boolean = true;
    public minus:boolean = true;
    public symbol:boolean = true;
    public numbers:boolean = true;

    public availableSymbols:string = '';
    public availableNumbers:string = '';
    public availableChars:string   = '';
}