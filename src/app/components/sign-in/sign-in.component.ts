import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  loginError?:string;
  signInFormGroup!:FormGroup;
  
  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    this.signInFormGroup = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    });
  }
  
  onSubmit():void{
    if(this.signInFormGroup.invalid) return;
    console.log(this.signInFormGroup.value);

    
    this.userService.signIn(this.signInFormGroup.value).subscribe(data=>{
      localStorage.setItem("token", data.token);
      localStorage.setItem("id", data.id);
      localStorage.setItem("fullname", data.fullname);
      localStorage.setItem("username", data.username);
      localStorage.setItem("email", data.email);
      this.router.navigate(["/home"]);
    }, error=>{
      this.loginError = error.error.errors;
      
    });
  }

  get userName(){
      return this.signInFormGroup.get("username")!;
  }
  get password(){
    return this.signInFormGroup.get("password")!;
  }
}
