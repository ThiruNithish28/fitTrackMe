import { Injectable } from '@angular/core';
import { UserDetails } from '../../dto/UserDetails';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CalculationEnginer {

  constructor(private _http: HttpClient){}
  
  getTargetCalories(userDetails:UserDetails){
   return  this._http.post("calculation-enginee/target",userDetails);
  }
}
