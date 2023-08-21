import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  acno: any
  psw: any

  constructor(private rout:Router) { }

  

  login() {
    console.log(this.acno);
    console.log(this.psw);

    this.rout.navigateByUrl("home")
}


}
