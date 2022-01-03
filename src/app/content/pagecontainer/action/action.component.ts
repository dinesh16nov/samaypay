import { Component, OnInit } from '@angular/core';
import { ApidataService } from 'src/app/services/apidata.service';
import { SessionVar, RespCode, RespTranCode, APIUrl } from 'src/app/enums/emums';
import { ApisessionService } from '../../../services/apisession.service'
import { TransactionReq } from '../../../enums/apiRequest'
import { Router } from '@angular/router';
import { TransectionResp } from 'src/app/enums/apiResponse';
import { ViewChild } from '@angular/core';
import { AddmoneyComponent } from '../../addmoney/addmoney.component';
@Component({
  selector: 'aditya-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit {
  hostDomain: string = "";
  
  request:TransactionReq={
    accountNo:0,
    amount:0,
    customerNo:'',
    geoCode:'',
    o1:'',
    o2:'',
    o3:'',
    o4:'',
    oid:0,
    refID:''
  };
  Confirmpayment = true;
  response:TransectionResp;
  operatorName=''
  walletBalance=0;
  errorMsg='';
  AccountName = '';
  IsRechargeReq :number= 0;
  OperatorType='Bill Amount';
  IsTran=true;
  AmountToPay: number=0;
  constructor(private apiData:ApidataService,
    public router:Router,
    private apiSession: ApisessionService) { }

  ngOnInit() {
    this.hostDomain=APIUrl.Domain;
    this.getData();
  }

  getData()
  {
    debugger;
    if(!this.apiData.getSessionData(SessionVar.TransactionRequest))
    {
      this.apiData.gotoMenu('prepaid.html')
    }
    else
    {
      this.request=this.apiData.getSessionData(SessionVar.TransactionRequest);
      this.operatorName=this.apiData.getOperatorName(this.request.oid);
      this.AccountName=this.apiData.getOperatorAccountName(this.request.oid);
      var optype=this.apiData.getOperatorData(this.request.oid).opType;
      
      if(optype==1 || optype==3)
      {
          this.OperatorType='Recharge Amount'
      }
      this.apiSession.GetBalance().subscribe(resp=>{
        
        if(resp.statuscode==RespCode.Success)
        {
          this.walletBalance=resp.data.balance;
          if(this.request.amount>this.walletBalance)
          {
            this.AmountToPay = parseFloat((this.request.amount - this.walletBalance).toFixed(3));
            if (this.request.amount > this.walletBalance) {
              this.Confirmpayment = false;
              this.IsRechargeReq = 1;
              document.getElementById("btnTemo").click();
              
              this.IsTran = false;
             
              return false;

            }
          }
          else{
            this.AmountToPay=0;
          }
          this.IsTran=false;
        }
      })
    }
  }
  proceedTotransaction()
  {
    this.IsTran = true;
    this.apiSession.Transaction(this.request).subscribe(resp=>{
      this.response=resp;
      if(this.response.statuscode==RespTranCode.Success || this.response.statuscode==RespTranCode.Pending)
      {
        this.apiData.setSessionData(SessionVar.TransactionResponse,this.response);
        this.router.navigate(['paymentsuccess.html']);
      }
      else if (this.response.statuscode == RespTranCode.Refund)
      {
        this.apiData.setSessionData(SessionVar.TransactionResponse, this.response);
        this.router.navigate(['paymentsuccess.html']);
      }
      else
      {
        this.errorMsg=this.response.msg;
      }
      this.IsTran=false;
    })
  }



}
