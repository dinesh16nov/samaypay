import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/apiservices.service';
import { NumberListResp,OpTypeRespData} from '../../enums/apiResponse';
import { OpTypes, RespCode, SessionVar } from 'src/app/enums/emums';
import { ApidataService } from 'src/app/services/apidata.service';
import { AuthService } from 'src/app/services/auth.service';
import { MobileComponent } from '../pagecontainer/mobile/mobile.component';


@Component({
  selector: 'aditya-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {
  IsMobile:boolean=false;
  BaseData:NumberListResp;
  menus:any;
  dropmenu:any;
  isMenuLoaded=false;
  Optypelst:OpTypeRespData;
  constructor(private router:Router, 
    private apiServices:ApiService, 
    private apiData:ApidataService,
    private authService:AuthService) { 
      this.IsMobile=apiData.checkIsMobile();
    }

  ngOnInit() {
    if (this.apiData.subsMenuChange==undefined) {    
      this.apiData.subsMenuChange = this.apiData.invokeMenuChangeFunction
      .subscribe((name:string) => {    
        this.loadOtherComponent();
      });    
    }
    if (this.apiData.subsMenuChange2==undefined) {    
      this.apiData.subsMenuChange2 = this.apiData.invokeMenuChangeFunction2
      .subscribe((name:string) => {    
        this.loadMenuComponent();
      });    
    }
    this.getMenus();
  }

  getMenus()
  {
    if(localStorage.getItem(SessionVar.OperatorList))
    {
      this.menus=JSON.parse(localStorage.getItem(SessionVar.OperatorList));
      this.displayMenu();
    }
    else
    {
      this.apiServices.GetOpTypes().subscribe(resp=>{
        if(resp.statuscode==1)
        {
          localStorage.setItem(SessionVar.OperatorList,JSON.stringify(resp.data.assignedOpTypes))
          this.menus=resp.data.assignedOpTypes;
          this.displayMenu();
        }
      });
    }
  }
  
  displayMenu()
  {
      if(this.menus.assignedOpTypes.length>9)
      {
        var rem=this.menus.assignedOpTypes.length-9;
        this.dropmenu=this.menus.assignedOpTypes.slice(Math.max(this.menus.assignedOpTypes.length -rem, 1))
      }
      this.isMenuLoaded=true;
      setTimeout(() => {        
        this.getRouteID(this.router.url.replace('/',''))  
      }, 100);
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
    this.removeClass()
    var element = document.getElementById("menu-"+id);

    if(!element.classList)
    {
      document.getElementsByClassName("tab-background")[0].classList.add('auth');
    }
    else
    {
      document.getElementsByClassName("tab-background")[0].classList.remove('auth');
      element.classList.add("active");
      this.router.navigate(["/"+routename])
    }
  }

  getRouteID(routename)
  {
    var id
    
    switch (routename) {
      case 'prepaid.html':
        id= OpTypes.Prepaid
        break;
      case 'postpaid.html':
        id= OpTypes.PostPaid
        break;
      case 'dth.html':
        id= OpTypes.DTH
        break;  
      case 'landline.html':
        id=OpTypes.Landline
        break;
      case 'electricity.html':
        id= OpTypes.Electricity
        break;
      case 'pipedgas.html':
        id= OpTypes.PipedGas
        break;
      case 'broadband.html':
        id= OpTypes.Broadband
        break;  
      case 'water.html':
        id= OpTypes.Water
        break;                
      case 'gas.html':
        id= OpTypes.Gas
        break;  
      case 'insurance.html':
        id= OpTypes.Insurance
        break;   
      case 'subscription.html':
        id= OpTypes.Subscription
        break; 
      case 'housingSociety.html':
        id= OpTypes.HousingSociety
        break; 
      case 'municipalTaxes.html':
        id= OpTypes.MunicipalTaxes
        break; 
      case 'educationFees.html':
        id= OpTypes.EducationFees
        break; 
      case 'hospital.html':
        id=OpTypes.Hospital
        break; 
       case 'clubsAndAssociation.html':
         id=OpTypes.ClubsandAssociations  
         break;
         case 'barAssociationFee.html':
          id=OpTypes.BARAssociationFee
          break;                     
      default:
        break;
    }
    
    var element = document.getElementById("menu-"+id);
    if(!element)
    {
      document.getElementsByClassName("tab-background")[0].classList.add('auth');
    }
    else
    {
      element.classList.add("active");
    }
  }

  
  loadOtherComponent()
  {
    this.removeClass();
    document.getElementsByClassName("tab-background")[0].classList.add('auth');
  }
  loadMenuComponent()
  {
    this.removeClass();
    document.getElementsByClassName("tab-background")[0].classList.remove('auth');
  }
  removeClass()
  {
    var els = document.querySelectorAll('.cus-nav-item.active')
    for (var i = 0; i < els.length; i++) {
      els[i].classList.remove('active')
    }
    
  }

}
