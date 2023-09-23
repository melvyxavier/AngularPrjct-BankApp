import { Component, OnInit } from '@angular/core';
import { BankDataService } from '../bankServices/bank-data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  name: any = ""
  acno: any = ""
  balance: any = ""
  message: any = ""
  msgClr: any = true
  dAcno: any = ""


  //reactive form for money Transfer
  moneyTransferForm = this.fb.group({
    rAcno: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    amount: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    psw: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]+')]]
  })


  constructor(private ds: BankDataService, private fb: FormBuilder, private dp: DatePipe, private rout: Router) { }

  ngOnInit(): void {

    //check if data present/not in local storage
    if (localStorage.getItem("currentUname")) {
      this.name = localStorage.getItem("currentUname")
    }

    //login or not
    if (!localStorage.getItem("currentAcno")) {
      alert("Please login to continue")
      this.rout.navigateByUrl("")
    }



  }



  getbalance() {

    //acno from localstrg
    if (localStorage.getItem("currentAcno")) {
      this.acno = JSON.parse(localStorage.getItem("currentAcno") || "")

      //balance
      this.ds.getBalanceApi(this.acno).subscribe({

        next: (result: any) => {

          this.balance = result.message

        },
        error: (result: any) => {
          alert(result.error.message)
        }
      })
    }
  }

  viewProfile() {

    //acno from localstrg
    if (localStorage.getItem("currentAcno")) {
      this.acno = JSON.parse(localStorage.getItem("currentAcno") || "")

    }
  }


  moneyTransfer() {
    if (this.moneyTransferForm.valid) {
      var path = this.moneyTransferForm.value
      var rAcno = path.rAcno
      var amount = path.amount
      var psw = path.psw


      //sender acno
      if (localStorage.getItem("currentAcno")) {
        this.acno = JSON.parse(localStorage.getItem("currentAcno") || "")

      }
      //date
      const date = new Date()
      var latestDate = this.dp.transform(date, 'medium')
      console.log(latestDate);
      if (this.acno == rAcno) {
        this.message = 'Receiver Account number and Sender Account Number cannot be same!'
        this.msgClr = false
      }
      else {
        //api
        this.ds.moneyTransferApi(this.acno, rAcno, amount, psw, latestDate).subscribe({
          next: (result: any) => {
            this.message = result.message
            this.msgClr = true
          },
          error: (result: any) => {
            this.message = result.error.message
            this.msgClr = false

          }
        })

      }
    }
    else {
      this.message = 'Please fill all the fields!'
      this.msgClr = false

    }
  }

  Logout() {
    //to logout from the account
    localStorage.removeItem('currentAcno');
    localStorage.removeItem('currentUname');

    this.rout.navigateByUrl('')
  }

  deleteActive() {
    if (localStorage.getItem("currentAcno")) {
      this.dAcno = JSON.parse(localStorage.getItem("currentAcno") || "")

    }


  }

  cancelp() {
    this.dAcno = ""
  }

  yesDelete(event: any) {
    this.ds.deleteAccountAPI(event).subscribe({
      next: (data: any) => {
        alert(data.message)
        this.Logout()
      }
    })

    // console.log(event);

  }

}