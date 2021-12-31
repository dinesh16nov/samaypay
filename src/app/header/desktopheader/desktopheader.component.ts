import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoginResp,BalanceResp } from 'src/app/enums/apiResponse';
import { ApiService } from 'src/app/services/apiservices.service';

import { ApidataService } from 'src/app/services/apidata.service';
import { AuthService } from 'src/app/services/auth.service';
import { ApisessionService } from 'src/app/services/apisession.service';
import { RespCode,APIUrl } from 'src/app/enums/emums';

@Component({
  selector: 'aditya-desktopheader',
  templateUrl: './desktopheader.component.html',
  styleUrls: ['./desktopheader.component.css']
})
export class DesktopheaderComponent implements OnInit {
Domain='';
  IsLoading=false;
  IsLoggedIn=false;
  LoginUserName='';
  LoginUserBalance='0';
  LoginPopUp: BsModalRef;
  LoginForm:FormGroup;
  LoginResp:LoginResp;
  IsLoginSubmitted=false;
  SignUpForm:FormGroup;
  SignUpResp:any;
  IsSignUpSubmitted=false;
  gettingBalanceSpinClass="fa fa-refresh";
  @Input() LoginDetail:any
  @ViewChild('modelSignIn') modelSignIn: TemplateRef<any>;
  constructor(private modalService: BsModalService, 
    private apiServices:ApiService,
    private apiData:ApidataService,
    private authService:AuthService,
    private apiSession:ApisessionService,
    private fb:FormBuilder) { }

  ngOnInit() {
    this.Domain=APIUrl.Domain;
    this.login();
    
    if (this.apiData.subsLogin==undefined) {    
      this.apiData.subsLogin = this.apiData.invokeHeaderLoginFunction
      .subscribe((name:string) => {    
        this.login();
      });    
    }
    if (this.apiData.subsLoader==undefined) {    
      this.apiData.subsLoader = this.apiData.invokeHeaderLoaderFunction
      .subscribe((name:string) => {    
        this.loaderToggle();
      });    
    }
    if (this.apiData.subsBalanceChange==undefined) {    
      this.apiData.subsBalanceChange = this.apiData.invokeHeaderBalanceFunction
      .subscribe((name:string) => {    
        this.getWalletbalance();
      });    
    }
  }
  gotoLogin()
  {
    this.apiData.gotoPage('login.html');
  }
  gotosignup()
  {
    this.apiData.gotoPage('signup.html');
  }
  loaderToggle()
  {
    if(this.IsLoading)
    {
      this.IsLoading=false;
    }
    else
    this.IsLoading=true;
  }

  login()
  {
    if(this.authService.IsAuth())
    {
      this.LoginUserName=this.authService.getUserName();
      this.getWalletbalance();
    }
  }
  logout()
  {
    if(confirm('Are you sure to logout'))
    {
      this.authService.logout();
      this.apiSession.Logout().subscribe();
      this.IsLoggedIn=false;
      this.LoginUserBalance='0';
      this.LoginDetail.IsLoggedIn=false;
      this.LoginDetail.LoginUserName='';
      this.LoginDetail.LoginUserBalance='0';
      window.location.href='#';
    }
  }
  getWalletbalance()
  {
    this.gettingBalanceSpinClass="fa fa-refresh fa-spin"; 
    var BalanceResp:BalanceResp;
    this.apiSession.GetBalance().subscribe(resp=>{
      BalanceResp=resp;
      if(BalanceResp!=undefined){
        if(BalanceResp.statuscode==RespCode.Success)
        {
          this.LoginDetail.LoginUserBalance=BalanceResp.data.balance.toString()
        }
      }
      this.gettingBalanceSpinClass="fa fa-refresh";
    })
  }
}