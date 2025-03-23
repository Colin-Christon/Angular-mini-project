import { Injectable } from '@angular/core';
import { CONFIG_ORDER } from './config-data';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  private configKey = 'configOrder';
  private configOrder?:Object = [];
  private apiUrl = "http://localhost:3000/data"

  constructor(private http:HttpClient){}

  setConfigElementOrder(configElementOrder: any){
    localStorage.setItem(this.configKey, JSON.stringify(configElementOrder));
  }

  getConfigElementOrder(){
    const storedConfig = localStorage.getItem(this.configKey);
    this.configOrder = storedConfig ? JSON.parse(storedConfig) : CONFIG_ORDER;
    return JSON.parse(JSON.stringify(this.configOrder)); 
  }

  registerUser(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
