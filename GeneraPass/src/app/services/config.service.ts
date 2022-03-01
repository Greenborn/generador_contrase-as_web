import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  get data() {
    return {
      apiBaseUrl: "https://clientes.api.greenborn.com.ar/",
      appName: "app_pass_generator"
    };
  }
  
  get tokenKey() { 
    return this.data.appName + 'token' 
  }

  apiUrl(recurso: string) { 
    return this.data.apiBaseUrl + recurso
  }

}
