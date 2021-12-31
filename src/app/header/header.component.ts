import { Component, OnInit} from '@angular/core';
import { FormGroup,FormBuilder,Validators} from '@angular/forms'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ApiService } from '../services/apiservices.service';
import { LoginResp,BalanceResp }  from '../enums/apiResponse';
import { RespCode } from '../enums/emums';
import { ApidataService } from '../services/apidata.service';
import { AuthService } from '../services/auth.service'
import { ApisessionService } from '../services/apisession.service';



@Component({
  selector: 'adtiya-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  IsMobile=false;
  IsLoading=false;
  IsLoggedIn=false;
  LoginUserName='';
  LoginUserBalance='0';
  LoginPopUp: BsModalRef;
  LoginForm:FormGroup;
  LoginResp:LoginResp;
  IsLoginSubmitted=false;
  LoginDetail={
    IsLoggedIn:false,
    LoginUserName:'',
    LoginUserBalance:'0'
  }
  
  constructor(private modalService: BsModalService, 
    private apiServices:ApiService,
    private apiData:ApidataService,
    private authService:AuthService,
    private apiSession:ApisessionService,
    private fb:FormBuilder) { 
      this.IsMobile=apiData.checkIsMobile();
    }

  ngOnInit() {
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
      this.IsLoggedIn=true;
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
    var BalanceResp:BalanceResp;
    this.apiSession.GetBalance().subscribe(resp=>{
      BalanceResp=resp;
      if(BalanceResp!=undefined){
        if(BalanceResp.statuscode==RespCode.Success)
        {
          this.LoginDetail.LoginUserBalance=this.LoginUserBalance=BalanceResp.data.balance.toString()
          this.LoginDetail.IsLoggedIn=this.IsLoggedIn;
          this.LoginDetail.LoginUserName=this.LoginUserName
        }
      }
      
    })
  }
}
