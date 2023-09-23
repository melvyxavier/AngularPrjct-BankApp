import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


const options = {
  headers: new HttpHeaders()

}


@Injectable({
  providedIn: 'root'
})


export class BankDataService {

  baseUrl: any = "https://revolut-bankserver.onrender.com"

  constructor(private http: HttpClient) { }

  getToken() {

    //create a header object
    const headers = new HttpHeaders()

    if (localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token") || "")
      options.headers = headers.append("access_token", token)
    }

    return options


  }



  //api to create account

  accountCreate(acno: any, psw: any, uname: any) {
    const bodyData = { acno, psw, uname }

    return this.http.post(`${this.baseUrl}/bankuser/create_acc`, bodyData)

  }

  //api to login
  loginApi(acno: any, psw: any) {
    const bodyData = { acno, psw }
    return this.http.post(`${this.baseUrl}/bankuser/login`, bodyData);

  }

  //api to check balance

  getBalanceApi(acno: any) {
    return this.http.get(`${this.baseUrl}/bankuser/balance/${acno}`, this.getToken())
  }


  //api to transfer money
  moneyTransferApi(sAcno: any, rAcno: any, amount: any, spsw: any, date: any) {
    const bodyData = {
      sAcno, rAcno, amount, spsw, date
    }
    return this.http.post(`${this.baseUrl}/bankuser/money-transfer`, bodyData, this.getToken())
  }

  //api for account statement
  accountStatementAPI(acno: any) {
    return this.http.get(`${this.baseUrl}/bankuser/account-statement/${acno}`, this.getToken())
  }

  //api for account deletion
  deleteAccountAPI(acno: any) {
    return this.http.delete(`${this.baseUrl}/bankuser/deleteAccount/${acno}`, this.getToken());
  }


}



