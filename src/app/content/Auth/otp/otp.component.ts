import { Component, OnInit } from '@angular/core';
import { ApidataService } from 'src/app/services/apidata.service';
import { FormGroup,FormBuilder,Validators} from '@angular/forms'
import { ApiService } from '../../../services/apiservices.service';
import { AuthService } from '../../../services/auth.service'
import { VarifyOTPReq }  from '../../../enums/apiRequest';
import { LoginResp }  from '../../../enums/apiResponse';
import { RespCode, SessionVar } from '../../../enums/emums';
import { Router } from '@angular/router';

@Component({
  selector: 'aditya-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {
  LoginForm:FormGroup;
  LoginResp:LoginResp;
  IsLoginSubmitted=false;
  IsLoggingIn=false;
  ErrorMsg='';
  constructor(private apiData:ApidataService,
    private apiServices:ApiService,
    private authService:AuthService,
    private fb:FormBuilder,
    private router:Router) { }

  ngOnInit() {
    if(!this.apiData.getSessionData(SessionVar.OTP))
    {
      this.router.navigate(['login']);
    }

    this.LoginForm=this.fb.group({
      
      otp:this.fb.control('',[Validators.required, Validators.minLength(6), Validators.maxLength(6)])
    })
  }
  get l(){ return this.LoginForm.controls}

  verifyOtp()
  {
    this.IsLoginSubmitted=true;
    var otpSession=this.apiData.getSessionData(SessionVar.OTP).otpSession
    
    var req:VarifyOTPReq={
      oTPSession:otpSession,
      oTPType:1,
      otp:this.LoginForm.get('otp').value      
    }
    
    if(this.LoginForm.status=='INVALID')
    {
      return;
    }
    if(this.IsLoginSubmitted)
    {
      this.IsLoggingIn=true;
      this.apiServices.VarifyOTP(req).subscribe(resp=>{
        if(resp.statuscode==RespCode.Success)
        {
          this.LoginResp=resp;
          this.LoginResp.statuscode=resp.statuscode;
          this.authService.authProcess(this.LoginResp);
          this.apiData.setSessionData(SessionVar.LoginInfo,this.LoginResp);
          this.apiData.login();
          this.apiData.setSessionData(SessionVar.OTP,null);
          this.apiData.gotoMenu("prepaid.html");
        }
        else
        {
          this.ErrorMsg=resp.msg;
        }
        this.IsLoggingIn=false;
      })
    }
  }
}
