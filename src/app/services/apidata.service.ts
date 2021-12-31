import { Injectable,ViewChild,EventEmitter,Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SessionVar, RespCode,OpTypes } from '../enums/emums';
import { NumberListResp } from '../enums/apiResponse';
import { ApiService } from './apiservices.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ApisessionService } from './apisession.service';
import { consoleTestResultHandler } from 'tslint/lib/test';
@Injectable({
  providedIn: 'root'
})
export class ApidataService {
  private sessionData = {};
  BaseData:NumberListResp;
  invokeHeaderLoaderFunction=new EventEmitter();
  invokeHeaderLoginFunction = new EventEmitter();
  invokeMobileLoginFunction = new EventEmitter();
  invokeHeaderBalanceFunction = new EventEmitter();
  invokeMenuChangeFunction=new EventEmitter();
  invokeMenuChangeFunction2=new EventEmitter();

  subsMenuChange:Subscription;
  subsLogin:Subscription;
  subsLoginMobile:Subscription;
  subsBalanceChange:Subscription;
  subsMenuChange2:Subscription;
  subsLoader: Subscription;
  
  constructor(
    private title:Title,
    private apiServices:ApiService,
    
    public router:Router
    ) { }

  setSessionData(name: string, value: any) 
  {
    if (name)
      this.sessionData[name] = value;
  }
  getSessionData(name: string)
  {
    return this.sessionData[name];
  }
  setTitle(value)
  {
      this.title.setTitle(value);
  }
  checkIsMobile(): boolean{
      
    if(window.screen.width>414)
    {
      return false; 
      
    }
    else{ return true;}    
  }
  LoaderToggle() {    
    this.invokeHeaderLoaderFunction.emit();    
  }
  loadOtherClass()
  {
    this.invokeMenuChangeFunction.emit();
  }
  login()
  {
    this.invokeHeaderLoginFunction.emit();
  }
  loadMenuClass()
  {this.invokeMenuChangeFunction2.emit();}
  getBalance()
  {
    this.invokeHeaderBalanceFunction.emit();
  }
  checkDataInSession()
  {
    if(this.getSessionData(SessionVar.BaseData))
    {
      return true;
    }
    else
      return false;
  }
  getBaseData()
  {
      this.apiServices.GetNumberList().subscribe(resp=>{
        this.BaseData=resp;
        if(this.BaseData.statuscode==RespCode.Success)
        {
          this.setSessionData(SessionVar.BaseData,this.BaseData.data);
          localStorage.setItem(SessionVar.BaseData,JSON.stringify(this.BaseData.data))
          return 1;
        }
        else
        {
          return 0;
        }
      })
  }
  getCircles()
  {    
    if(!this.getSessionData(SessionVar.BaseData))
    {
      this.getBaseData(); 
    }
    if(this.getSessionData(SessionVar.BaseData))
    {
      var circles=this.getSessionData(SessionVar.BaseData).cirlces
      var CircleData=[];
      var d={
        id:0,
        text:'Select Circle'
      }
      CircleData.push(d);
      for(var i=0;i<circles.length;i++)
      {
          var c={
            id:circles[i].id,
            text:circles[i].circle
          }
          CircleData.push(c);
      }
      return CircleData;
    }
  }
  getNumBySeries(number)
  {
    if(this.getSessionData(SessionVar.BaseData))
    {
      var numSeries=this.getSessionData(SessionVar.BaseData).numSeries
      var NumberData=numSeries.filter(x=>x.series==number);     
      
      return NumberData;
    }
  }
  getOperator(OpType)
  { 
    if(!this.getSessionData(SessionVar.BaseData))
    {     
      this.getBaseData(); 
    }
    if(this.getSessionData(SessionVar.BaseData))
    {
      var operators=this.getSessionData(SessionVar.BaseData).operators
      var OperatorData=[];
      var d={
        id: 0,
        text: 'Select Operator',
        additional: {
            image: '',
            winner: '0'
        }
      }
      OperatorData.push(d);
      var filteredOperator=operators.filter(x=>x.opType==OpType);
      for(var i=0;i<filteredOperator.length;i++)
      {
        var o={
          id: filteredOperator[i].oid,
          text: filteredOperator[i].name,
          additional: {
              image: 'http://roundpay.net/Image/operator/'+filteredOperator[i].image,
              winner: i+1
          }
        }
        OperatorData.push(o);
      }
      
      return OperatorData;
    }
  }
  getAddmoneyOperator()
  { 
    if(!this.getSessionData(SessionVar.BaseData))
    {     
      this.getBaseData(); 
    }
    if(this.getSessionData(SessionVar.BaseData))
    {
      var operators=this.getSessionData(SessionVar.BaseData).operators
      var OperatorData=[];
      var filteredOperator=operators.filter(x=>x.opType==OpTypes.AddMoney);
      for(var i=0;i<filteredOperator.length;i++)
      {
        var o={
          id: filteredOperator[i].oid,
          text: filteredOperator[i].name,
          charge:filteredOperator[i].charge
        }
        OperatorData.push(o);
        
      }      
      return OperatorData;
    }
  }
  getCircleName(Cid)
  {
    if(this.getSessionData(SessionVar.BaseData))
    {
      var cirlces=this.getSessionData(SessionVar.BaseData).cirlces
     
      var filteredcirlces=cirlces.filter(x=>x.id==Cid);
      
      if(filteredcirlces.length>0)
      {
        return filteredcirlces[0].circle
      }
      else
        return '';
    }
  }
  getOperatorName(Oid)
  {
    if(this.getSessionData(SessionVar.BaseData))
    {
      var operators=this.getSessionData(SessionVar.BaseData).operators
     
      var filteredOperator=operators.filter(x=>x.oid==Oid);
      if(filteredOperator.length>0)
      {
        return filteredOperator[0].name
      }
      else
        return '';
    }
  }
  getOperatorAccountName(Oid)
  {
    if(this.getSessionData(SessionVar.BaseData))
    {
      var operators=this.getSessionData(SessionVar.BaseData).operators
     
      var filteredOperator=operators.filter(x=>x.oid==Oid);
      if(filteredOperator.length>0)
      {
        return filteredOperator[0].accountName
      }
      else
        return '';
    }
  }
  getOperatorAccountRemark(Oid)
  {
    if(this.getSessionData(SessionVar.BaseData))
    {
      var operators=this.getSessionData(SessionVar.BaseData).operators
     
      var filteredOperator=operators.filter(x=>x.oid==Oid);
      if(filteredOperator.length>0)
      {
        return filteredOperator[0].accountRemak
      }
      else
        return '';
    }
  }
  getOperatorData(Oid)
  {
    if(this.getSessionData(SessionVar.BaseData))
    {
      var operators=this.getSessionData(SessionVar.BaseData).operators
     
      var filteredOperator=operators.filter(x=>x.oid==Oid);
      if(filteredOperator.length>0)
      {
        return filteredOperator[0]
      }
      else
        return '';
    }
  }
  getRouteID(routename)
  {
    var id
    
    switch (routename) {
      case 'prepaid':
        id= 1
        break;
      case 'postpaid':
        id= 2
        break;
      case 'dth':
        id= 3
        break;  
      case 'landline':
        id= 4
        break;
      case 'electricity':
        id= 5
        break;
      case 'pipedgas':
        id= 6
        break;
      case 'broadband':
        id= 16
        break;  
      case 'water':
        id= 17
        break;                
      case 'gas':
        id= 26
        break;  
      case 'insurance':
        id= 27
        break;                
      default:
        break;
    }
    
    return id
    
  }

  gotoPage(routename)
  {
    this.loadOtherClass();
    this.router.navigate(['/'+routename]);
  }
  gotoMenu(menu)
  {
    this.loadMenuClass();
    this.router.navigate(['/'+menu]);
  }

  
}
