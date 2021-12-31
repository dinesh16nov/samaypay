import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginResp } from 'src/app/enums/apiResponse';
import { ApidataService } from 'src/app/services/apidata.service';
import { ApiService } from 'src/app/services/apiservices.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { LoginReq } from 'src/app/enums/apiRequest';
import { RespCode, SessionVar } from 'src/app/enums/emums';

@Component({
  selector: 'aditya-forgetpass',
  templateUrl: './forgetpass.component.html',
  styleUrls: ['./forgetpass.component.css']
})
export class ForgetpassComponent implements OnInit {
  LoginForm:FormGroup;
  LoginResp:LoginResp;
  IsLoginSubmitted=false;
  IsLoggingIn=false;
  ErrorMsg='';
  NotificationMsg='';
  FPloader=false;
  constructor(private apiData:ApidataService,
    private apiServices:ApiService,
    private authService:AuthService,
    private fb:FormBuilder,
    private router:Router) { }

  ngOnInit() {
    this.apiData.loadOtherClass();
    this.LoginForm=this.fb.group({
      UserID:this.fb.control('',[Validators.required, Validators.maxLength(10), Validators.minLength(10),Validators.pattern('\\d{10}')])
      
    })
  }
  get l(){ return this.LoginForm.controls}

  gotoSignUp()
  {
    this.apiData.gotoPage('signup.html');
    
  }
  gotoLogin()
  {
    this.apiData.gotoPage('login.html');
    
  }

  forgetPassword()
  {
    this.IsLoginSubmitted=true;

    var req:any={
      
      userID:this.LoginForm.get('UserID').value
    }
    console.log(this.l);
    if(this.LoginForm.status=='INVALID')
    {
      //this.IsLoginSubmitted=false;
      return;
    }
    if(this.IsLoginSubmitted)
    {
      this.IsLoggingIn=true;
      this.FPloader=true;
      this.apiData.LoaderToggle();
      this.apiServices.ForgetPassword(req).subscribe((resp:any)=>{
        this.apiData.LoaderToggle();
        this.FPloader=false;
        if(resp.statuscode==RespCode.Success)
        {
          this.IsLoggingIn=false;
          this.NotificationMsg=resp.msg+" and click to login";
        }
      })
      //this.IsLoggingIn=false;
      // this.ErrorMsg='This Service is not working';
    }
  }
}
