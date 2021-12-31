import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { RechargeReportReq, RefundRequestReq } from 'src/app/enums/apiRequest';

import { AuthService } from 'src/app/services/auth.service';
import { ApisessionService } from 'src/app/services/apisession.service';
import { RechargeReportResp } from 'src/app/enums/apiResponse';
import { RespCode, RespTranCode } from 'src/app/enums/emums';
import { ApidataService } from 'src/app/services/apidata.service';

@Component({
  selector: 'aditya-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  SearchForm: FormGroup;
  colorTheme = 'theme-dark-blue';
  FromDate=new Date();
  SearchResp:RechargeReportResp;
  SearchData:any;
  ToDate=new Date();
  FromConfig: Partial<BsDatepickerConfig>;
  ToConfig: Partial<BsDatepickerConfig>;
  IsSearchOpen=true;
  IsReportLoaded=false;
  IsMobile=false;
  constructor(private formBuilder: FormBuilder,private apiData:ApidataService, private authService:AuthService,private apiSession:ApisessionService,) { 
    this.IsMobile=apiData.checkIsMobile();
    this.FromConfig = Object.assign({}, {maxDate: this.FromDate, containerClass: this.colorTheme,dateInputFormat: 'DD MMM YYYY',adaptivePosition: true });
    this.ToConfig = Object.assign({}, { maxDate: this.FromDate, containerClass: this.colorTheme,dateInputFormat: 'DD MMM YYYY',adaptivePosition: true });
  }

  ngOnInit() {
    this.FromDate.setDate(this.FromDate.getDate());
    this.SearchForm = this.formBuilder.group({
      fromdate: null,
      todate:null
    });
    this.Search();
  }

  toggleSearch()
  {
    if(this.IsSearchOpen)
    {
      this.IsSearchOpen=false;
    }
    else
    {
      this.IsSearchOpen=true;
    }
  }
  addDays(theDate, days) {
    return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
  }
  onValueChange(value: Date): void {
    if (value) {
      this.FromDate=value;
      var isafter = moment(this.ToDate).isAfter(value);
      if (!isafter) {
        value = this.addDays(value, 1);
        this.ToDate = value;
        this.ToConfig = Object.assign({}, { minDate: value, containerClass: this.colorTheme,dateInputFormat: 'DD MMM YYYY'  });
      }
    }
  }

  Search()
  {
    var req:RechargeReportReq=
    {
      isRecent:false,
      fromDate:moment(this.FromDate).format("DD MMM YYYY"),
      toDate:moment(this.ToDate).format("DD MMM YYYY"),
      accountNo:'',
      apiid:0,
      criteriaID:0,
      transactionID:'',
      isExport:false,
      oid:0,
      opTypeID:0,
      status:0,
      topRows:100
    }
    this.IsReportLoaded=false;
    this.apiSession.RechargeReport(req).subscribe(resp=>{
      this.SearchResp=resp;
      if(this.SearchResp.statuscode==RespCode.Success)
      {
        this.SearchData=this.SearchResp.rechargeReport;
        this.IsReportLoaded=true;
        this.toggleSearch();
      }
      else
      {
        this.IsReportLoaded=true;
      }      
    })
  }
  onClickComplaint(t)
  {
    var req:RefundRequestReq={
      isResend:false,
      otp:"",
      tid:t.tid,
      transactionID:t.transactionID
    }
    this.apiSession.RefundRequest(req).subscribe(resp=>{
      if(resp.statuscode==RespTranCode.Success)
      {
        this.Search();
      }
      else
      {
      }
    })
  }
}
