import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BankDataService {

  constructor() { }

  data="data inside service file"

  ServiceMethod(){
    alert("Service method")
  }


}
