import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators} from '@angular/forms'
import { ApidataService } from 'src/app/services/apidata.service';
import { ApiService } from '../../../services/apiservices.service';
import { AuthService } from '../../../services/auth.service'
import { SignUpReq, LoginReq }  from '../../../enums/apiRequest';
import { SignUpResp,LoginResp }  from '../../../enums/apiResponse';
import { RespCode, SessionVar } from '../../../enums/emums';
import { Router } from '@angular/router';

@Component({
  selector: 'aditya-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  SignUpForm:FormGroup;
  SignUpResp:SignUpResp;
  LoginResp:LoginResp;
  IsSignUpSubmitted=false;
  IsLoggingIn=false;
  ErrorMsg='';
  constructor(private apiData:ApidataService,
    private apiServices:ApiService,
    private authService:AuthService,
    private fb:FormBuilder,
    private router:Router) { }

  ngOnInit() {
    
    window.scrollTo(0, 200);  
    this.SignUpForm=this.fb.group({
      mobileNo:this.fb.control('',[Validators.required, Validators.maxLength(10), Validators.minLength(10),Validators.pattern('\\d{10}')]),
      name:this.fb.control('',[Validators.required, Validators.maxLength(50), Validators.minLength(3)]),
      EmailID:this.fb.control('',[Validators.required, Validators.maxLength(50), Validators.minLength(6)]),
      pincode:this.fb.control('',[Validators.required, Validators.maxLength(6), Validators.minLength(6)]),
      address:this.fb.control('',[Validators.required, Validators.maxLength(500), Validators.minLength(5)]),
      Password:this.fb.control('',[Validators.required, Validators.minLength(8), Validators.maxLength(12)])
    })
  }
  get register(){ return this.SignUpForm.controls}

  gotoLogin()
  {
    this.apiData.gotoPage('login.html');    
  }

  signUP()
  {
    this.IsSignUpSubmitted=true;

    var req:SignUpReq={
      EmailID:this.SignUpForm.get("EmailID").value,
      password:this.SignUpForm.get('Password').value,
      address:this.SignUpForm.get('address').value,
      name:this.SignUpForm.get('name').value,
      pincode:this.SignUpForm.get('pincode').value,
      mobileNo:this.SignUpForm.get('mobileNo').value
    }
    if(this.SignUpForm.status=='INVALID')
    {
      return;
    }
    if(this.IsSignUpSubmitted)
    {
      this.IsLoggingIn=true;
      this.apiServices.SignUp(req).subscribe(resp=>{
        this.SignUpResp=resp;
        if(this.SignUpResp.statuscode==RespCode.Success)
        {
          var req:LoginReq={
            password:this.SignUpForm.get('Password').value,
            userID:this.SignUpForm.get('mobileNo').value
          }
          this.apiServices.Login(req).subscribe(resp=>{
            this.LoginResp=resp;
            if(this.LoginResp.statuscode==RespCode.Success)
            {
                this.authService.authProcess(this.LoginResp);
                this.apiData.setSessionData(SessionVar.LoginInfo,this.LoginResp);
            }
            else if(this.LoginResp.statuscode==RespCode.otp)
            {
                this.apiData.setSessionData(SessionVar.OTP,this.LoginResp);
                this.router.navigate(['otp.html']);
            }
            else
            {
              this.ErrorMsg=this.LoginResp.msg;
            }
            this.IsLoggingIn=false;
          })
        }
        else
        {
          this.ErrorMsg=this.SignUpResp.msg;
        }
        this.IsLoggingIn=false;
      })
    }
  }
  scrollToTop() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll < 200) {
        window.requestAnimationFrame(smoothscroll);
        //window.scrollTo(0, currentScroll - (currentScroll / 8));
        window.scrollTo(0, 200);  
      }
      
    })();
  }
}
