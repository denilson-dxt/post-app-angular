import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  signUpFormGroup!:FormGroup;

  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    this.initializeSignUpFormGroup();
  }
  onSubmit():void{
    if(this.signUpFormGroup.invalid) return;
    this.userService.signUp(this.signUpFormGroup.value).subscribe(data=>{
        this.router.navigate(["/signin"]);
    })
  }

  initializeSignUpFormGroup():void{
    this.signUpFormGroup = new FormGroup({
      email: new FormControl("", [Validators.email,Validators.required]),
      userName: new FormControl("", [Validators.required]),
      phoneNumber: new FormControl("", [Validators.required]),
      fullName:new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required, Validators.minLength(7)])
    })
  }

  get password(){
    return this.signUpFormGroup.get("password")!;
  }
  get phoneNumber(){
    return this.signUpFormGroup.get("phoneNumber")!;
  }
  get email(){
    return this.signUpFormGroup.get("email")!;
  }
  get fullName(){
    return this.signUpFormGroup.get("fullName")!;
  }
  get userName(){
    return this.signUpFormGroup.get("userName")!;
  }
}
