import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUp = {
    email: '',
    userName: '',
    password: '',
    phoneNumber: '',
    fullName: ''
  }

  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }
  onSubmit():void{
    this.userService.signUp(this.signUp.userName, this.signUp.email, this.signUp.fullName,this.signUp.phoneNumber, this.signUp.password).subscribe(data=>{
      console.log(data)
    })
  }
}
