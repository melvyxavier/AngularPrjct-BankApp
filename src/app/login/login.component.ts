import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  // data="Happy Banking with us!"
  //  data2="Enter password"
  
  // login(){
  //   alert("Welcome to Happy banking")
  // }

  // acnoChange(event:any){
  //   console.log(event.target.value);
    
  // }

  // password(event:any){
  //   console.log(event.target.value);
    
  // }

  login(a:any,b:any){
    console.log(a.value);
      console.log(b.value);
      
    }

  
}
