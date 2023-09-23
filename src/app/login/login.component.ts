import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BankDataService } from '../bankServices/bank-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  //acno: any
  //psw: any


  //model form
  loginForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    psw: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]+')]]
  })

  constructor(private rout: Router, private fb: FormBuilder, private ds: BankDataService) { }



  login() {

    var acno = this.loginForm.value.acno
    var psw = this.loginForm.value.psw

    if (this.loginForm.valid) {
      this.ds.loginApi(acno, psw).subscribe({

        next: (result: any) => {

          //store acno in local storage
          localStorage.setItem("currentAcno", JSON.stringify(acno))
          localStorage.setItem("currentUname", result.currentUser)
          localStorage.setItem("token",JSON.stringify(result.token))

          alert(result.message)
          //redirection
          this.rout.navigateByUrl("home")
        },
        error: (result: any) => {
          alert(result.error.message)
        }
      })
    }
    else {
      alert("Please enter valid credentials")

    }

    //api call
  }


}
