import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signInData = {
    username: '',
    password: ''
  }
  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
  }
  onSubmit():void{
    this.userService.signIn(this.signInData.username, this.signInData.password).subscribe(data=>{
      console.log(data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("id", data.id);
      localStorage.setItem("fullname", data.fullname);
      localStorage.setItem("username", data.username);
      localStorage.setItem("email", data.email);
      this.router.navigate(["/home"]);
    });
  }
}
