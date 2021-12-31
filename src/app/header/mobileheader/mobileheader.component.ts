import { Component, OnInit, HostListener, ElementRef,Input } from '@angular/core';
import { SessionVar, RespCode,APIUrl, OpTypes } from 'src/app/enums/emums';
import { ApiService } from 'src/app/services/apiservices.service';
import { Router } from '@angular/router';
import { ApidataService } from 'src/app/services/apidata.service';
import { ApisessionService } from 'src/app/services/apisession.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoginResp } from 'src/app/enums/apiResponse';

@Component({
  selector: 'aditya-mobileheader',
  templateUrl: './mobileheader.component.html',
  styleUrls: ['./mobileheader.component.css']
})

export class MobileheaderComponent implements OnInit {
  Domain='';
  menus:any;
  isMenuLoaded=false;
  @Input() LoginDetail:any
  loginDetail:any={
    IsLoggedIn:false,
    LoginUserName:'',
    LoginUserBalance:'0'
  }
  // LoginDetail={
  //   IsLoggedIn:false,
  //   LoginUserName:'',
  //   LoginUserBalance:'0'
  // }
  constructor(private eRef: ElementRef,
    private apiServices:ApiService,
    private router:Router,
    private authService:AuthService,
    private apiData:ApidataService,
    private apiSession:ApisessionService) { 
    }

  ngOnInit() {
    this.Domain=APIUrl.Domain;
    this.getMenus();
    this.login();
    if (this.apiData.subsLoginMobile==undefined) {    
      this.apiData.subsLoginMobile = this.apiData.invokeMobileLoginFunction
      .subscribe((name:string) => {    
        this.login();
      });    
    }
  }
  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(this.eRef.nativeElement.contains(event.target)) {
      
    } else {
      
      this.closeNav();
    }
  }
  getMenus()
  {
    this.isMenuLoaded=false;
    if(localStorage.getItem(SessionVar.OperatorList))
    {
      this.menus=JSON.parse(localStorage.getItem(SessionVar.OperatorList));
      this.isMenuLoaded=true;
    }
    else
    {
      this.apiServices.GetOpTypes().subscribe(resp=>{
        if(resp.statuscode==1)
        {
          localStorage.setItem(SessionVar.OperatorList,JSON.stringify(resp.data.assignedOpTypes))
          this.menus=resp.data.assignedOpTypes;
          this.isMenuLoaded=true;
        }
      })
    }
    
    
  }

  getRouteName(id)
  {
    var routename
    switch (id) {
      case OpTypes.Prepaid:
        routename= 'prepaid.html'
        break;
      case OpTypes.PostPaid:
        routename= 'postpaid.html'
        break;
      case OpTypes.DTH:
        routename= 'dth.html'
        break;  
      case OpTypes.Landline:
        routename= 'landline.html'
        break;
      case OpTypes.Electricity:
        routename= 'electricity.html'
        break;
      case OpTypes.PipedGas:
        routename= 'pipedgas.html'
        break;
      case OpTypes.Broadband:
        routename= 'broadband.html'
        break;  
      case OpTypes.Water:
        routename= 'water.html'
        break;                
      case OpTypes.Gas:
        routename= 'gas.html'
        break;  
      case OpTypes.Insurance:
        routename= 'insurance.html'
        break; 
      case OpTypes.CableTV: 
        routename= 'cabletv.html'
        break; 
      case OpTypes.Subscription:
          routename='subscription.html'    
          break;    
      case OpTypes.HousingSociety:
          routename='housingSociety.html'    
          break;  
      case OpTypes.MunicipalTaxes:
        routename='municipalTaxes.html'    
        break;   
      case OpTypes.EducationFees:
        routename='educationFees.html'    
        break;  
      case OpTypes.Hospital:
          routename="hospital.html"  
          break;  
      case OpTypes.ClubsandAssociations:
        routename="clubsAndAssociation.html"   
        break;   
      case OpTypes.BARAssociationFee:
        routename="barAssociationFee.html"
        break;  
      default:
        break;
    }
    //this.removeClass()
    var element = document.getElementById("menu-"+id);

    if(!element.classList)
    {
      this.apiData.loadOtherClass();
    }
    else
    {
      this.apiData.loadMenuClass();
      
      this.router.navigate(["/"+routename])
      this.closeNav()
    }
  }
  goTopage(routename)
  {
    this.router.navigate(["/"+routename])
    this.closeNav()
  }
  login()
  {
    if(this.authService.IsAuth())
    {
      this.LoginDetail.IsLoggedIn=true;
      this.LoginDetail.LoginUserName=this.authService.getUserName();
      this.getWalletbalance();
    }
  }
  logout()
  {
    if(confirm('Are you sure to logout'))
    {
      this.authService.logout();
      this.apiSession.Logout().subscribe();
      this.LoginDetail.IsLoggedIn=false;
      this.LoginDetail.LoginUserName='';
      this.LoginDetail.LoginUserBalance='0';
      window.location.href='#';
    }
  }
  getWalletbalance()
  {
    var BalanceResp:any;
    this.apiSession.GetBalance().subscribe(resp=>{
      BalanceResp=resp;
      if(BalanceResp.statuscode==RespCode.Success)
      {
        this.LoginDetail.LoginUserBalance=BalanceResp.data.balance.toString();
      }
    })
  }
  openNav() {
    document.getElementById("mobilemenu").classList.add('menu-open')
  }
  
  closeNav() {
    document.getElementById("mobilemenu").classList.remove('menu-open')
  }
}
