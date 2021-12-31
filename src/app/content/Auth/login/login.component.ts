import { Component, OnInit } from '@angular/core';
import { ApidataService } from 'src/app/services/apidata.service';
import { FormGroup,FormBuilder,Validators} from '@angular/forms'
import { ApiService } from '../../../services/apiservices.service';
import { AuthService } from '../../../services/auth.service'
import { LoginReq }  from '../../../enums/apiRequest';
import { LoginResp,BalanceResp }  from '../../../enums/apiResponse';
import { RespCode, SessionVar } from '../../../enums/emums';
import { Router } from '@angular/router';
import { HeaderComponent } from 'src/app/header/header.component';
import { AppComponent } from 'src/app/app.component';
import { ApisessionService } from 'src/app/services/apisession.service';
import { DesktopheaderComponent } from 'src/app/header/desktopheader/desktopheader.component';

@Component({
  selector: 'aditya-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginForm:FormGroup;
  LoginResp:LoginResp;
  IsLoginSubmitted=false;
  IsLoggingIn=false;
  ErrorMsg='';
  constructor(private apiData:ApidataService,
    private apiServices:ApiService,
    private authService:AuthService,
    private fb:FormBuilder,
    private router:Router,  private apiSession:ApisessionService) { }

  ngOnInit() {
    this.apiData.loadOtherClass();
    this.LoginForm=this.fb.group({
      UserID:this.fb.control('',[Validators.required, Validators.maxLength(10), Validators.minLength(10),Validators.pattern('\\d{10}')]),
      Password:this.fb.control('',[Validators.required, Validators.minLength(8), Validators.maxLength(12)])
    })
    
  }
  get l(){ return this.LoginForm.controls}
  login()
  {
    this.IsLoginSubmitted=true;

    var req:LoginReq={
      password:this.LoginForm.get('Password').value,
      userID:this.LoginForm.get('UserID').value
    }
    if(this.LoginForm.status=='INVALID')
    {
      return;
    }
    if(this.IsLoginSubmitted)
    {
      this.apiServices.Login(req).subscribe(resp=>{
        this.LoginResp=resp;
        if(this.LoginResp.statuscode==RespCode.Success)
        {
           this.IsLoggingIn=true;
            this.authService.authProcess(this.LoginResp);
            this.apiData.setSessionData(SessionVar.LoginInfo,this.LoginResp)
            this.apiData.login();
            if(this.apiData.getSessionData(SessionVar.TransactionRequest))
            {
              this.apiData.loadOtherClass();
              this.router.navigate(['redirecttoaction.html'], { queryParams: {reff:'3309a24d426f5ee0d77b91f885ee641b',aid:'538536ff5636f4dc4e894b16182a3165b8413ac0cbabf91126fe2b8be4795f86d3a59a416a6b7b8920d00b0af0109b50'}})
            }
            else
            {        
              this.apiData.gotoMenu("prepaid.html");    
            }
        }
        else if(this.LoginResp.statuscode==RespCode.otp)
        {
            this.apiData.setSessionData(SessionVar.OTP,this.LoginResp);
            
            this.apiData.gotoPage("otp.html");
        }
        else
        {
          this.ErrorMsg=this.LoginResp.msg;
        }
      this.IsLoggingIn=false;
        console.log(resp);
      })
    }
  }
  gotoSignUp()
  {
    this.apiData.gotoPage('signup.html');
    
  }
  gotoForgetPass()
  {
    this.apiData.gotoPage('forgetpass.html');
    
  }
  SubmitFacebookLogin()
  {
    var a=0;
  }
  
}
