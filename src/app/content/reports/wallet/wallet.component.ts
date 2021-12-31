import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RechargeReportResp } from 'src/app/enums/apiResponse';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ApisessionService } from 'src/app/services/apisession.service';
import { LedgerReportReq } from 'src/app/enums/apiRequest';
import * as moment from 'moment';
import { RespCode } from 'src/app/enums/emums';
import { ApidataService } from 'src/app/services/apidata.service';

@Component({
  selector: 'aditya-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  SearchForm: FormGroup;
  colorTheme = 'theme-dark-blue';
  amount:number;
  SearchResp:RechargeReportResp;
  SearchData:any;
  FromDate=new Date();
  FromConfig: Partial<BsDatepickerConfig>;
  ToDate=new Date();
  ToConfig: Partial<BsDatepickerConfig>;
  IsSearchOpen=true;
  IsReportLoaded=false;
  IsMobile=false;
  constructor(private formBuilder: FormBuilder, private apiSession:ApisessionService,private apiData:ApidataService) { 
    this.IsMobile=apiData.checkIsMobile();
    this.FromConfig = Object.assign({}, {maxDate: new Date(), containerClass: this.colorTheme,dateInputFormat: 'DD MMM YYYY' });
    this.ToConfig = Object.assign({}, { minDate: this.FromDate, containerClass: this.colorTheme,dateInputFormat: 'DD MMM YYYY' });
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
      console.log(isafter);
      if (!isafter) {
        //this.Return.setDate(value.getDate() + 1)
        
        value = this.addDays(value, 1);
        console.log(value);
        this.ToDate = value;
        this.ToConfig = Object.assign({}, { minDate: value,  containerClass: this.colorTheme,dateInputFormat: 'DD MMM YYYY'  });
      }
      else
      {
        this.ToConfig = Object.assign({}, { minDate: value, maxDate:new Date(),  containerClass: this.colorTheme,dateInputFormat: 'DD MMM YYYY'  });
      }
    }
  }

  Search()
  {

    var req:LedgerReportReq=
    {
      
      fromDate:moment(this.FromDate).format("DD MMM YYYY"),
      toDate:moment(new Date()).format("DD MMM YYYY"),
      accountNo:'',
      transactionID:'',
      isExport:false,
      oid:0,
      status:0,
      topRows:100,
      WalletTypeID:1
    }
    console.log(req);
    this.IsReportLoaded=false;
    this.apiSession.LedgerReport(req).subscribe(resp=>{
      this.SearchResp=resp;
      if(this.SearchResp.statuscode==RespCode.Success)
      {
        this.SearchData=this.SearchResp.ledgerReport;
        console.log(this.SearchData);
        this.IsReportLoaded=true;
        this.toggleSearch();
      }
      else
      {
        
        alert(this.SearchResp.msg);
        this.IsReportLoaded=true;
      }
    })
  }
}
