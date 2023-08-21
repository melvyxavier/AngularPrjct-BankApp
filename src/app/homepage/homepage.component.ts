import { Component } from '@angular/core';
import { BankDataService } from '../bankServices/bank-data.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  sdata:any

constructor(private ds: BankDataService) { }

ngOnInit(): void {

  setTimeout(()=>{
    this.ds.ServiceMethod()
  },2000)

  this.sdata=this.ds.data

}


}
