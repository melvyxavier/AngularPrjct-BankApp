import { Component, OnInit } from '@angular/core';
import { BankDataService } from '../bankServices/bank-data.service';
import { Router } from '@angular/router';

import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-acc-statement',
  templateUrl: './acc-statement.component.html',
  styleUrls: ['./acc-statement.component.css']
})
export class AccStatementComponent implements OnInit {

  acno: any
  transactionArray: any = []

  spinner: any = true
  date: any = ""

  searchTerm: any = ""

  constructor(private ds: BankDataService, private rout: Router) { }

  ngOnInit(): void {

    // acno
    if (localStorage.getItem("currentAcno")) {
      this.acno = JSON.parse(localStorage.getItem("currentAcno") || "")

      this.ds.accountStatementAPI(this.acno).subscribe({
        next: (result: any) => {
          this.transactionArray = result.message



        }
      })
    }

    setTimeout(() => {
      this.spinner = false
    }, 2000)

    //date
    //this.date= new Date()


  }

  backToHome() {
    this.rout.navigateByUrl("home")
  }


  filterData(search: any) {
    this.searchTerm = search
  }

  pdfExport() {

    //create an object for class jspdf
    var pdf = new jsPDF()

    //set columns
    let col = ['Date', 'Account Number', 'Amount', 'Type']

    //set row
    let row = []

    //style
    pdf.setFontSize(16)
    pdf.text("Account Statement", 15, 10)
    pdf.setFontSize(12)
    pdf.setTextColor('#8B4513')

    //array of array - nested array
    var allDataArray = this.transactionArray
    for (let i of allDataArray) {
      let rowData = [i.date, i.tacno, i.amount, i.type]
      row.push(rowData)
    }

    //convert to pdf
    (pdf as any).autoTable(col, row, { startY: 15 })

    //open converted pdf in new tab
    pdf.output('dataurlnewwindow')

    //to automatically download and save
    pdf.save('accountStatement.pdf')

  }
}





