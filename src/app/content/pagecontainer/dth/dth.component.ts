import { Component, OnInit,ViewChild,TemplateRef, ElementRef } from '@angular/core';
import { FormGroup,FormBuilder,Validators} from '@angular/forms'
import { Select2OptionData } from 'ng2-select2';
import { Select2TemplateFunction } from 'ng2-select2';
import { ApidataService } from 'src/app/services/apidata.service';
import { Router } from '@angular/router';
import { TransactionReq,ROfferReq } from 'src/app/enums/apiRequest';
import { SessionVar, RespCode, OpTypes } from 'src/app/enums/emums';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/apiservices.service';
import { FormValidationService } from 'src/app/services/form-validation.service';
@Component({
  selector: 'aditya-dth',
  templateUrl: './dth.component.html',
  styleUrls: ['./dth.component.css']
})
export class DthComponent implements OnInit {
  RechargeForm:FormGroup;
  mobile:any;
  amount:number;
  MobileplaceHolder='Select DTH Operator';
  AccountRemark='';
  odata:any;
  public operator=0;
  public OperatorData: Array<Select2OptionData>;
  public OperatorOptions: Select2Options;
  IsRechargeSubmitted=false;
  DthInfoLoaded=false;
  DthInfoDataLoaded=false;
  CustInfoLoaded=false;
  CustInfoDataLoaded=false;
  DthInfo:any;
  CustInfo:any;
  IsbannerShow=true;
  CustInfoLoader=false;
  DTHInfoLoader=false;
  IsCustMore=false;
  spnMobile='';
  spnAmount='';
  // slides = [
  //   {img: "../../../../assets/img/cus-img/dth-1.jpg"},
  //   {img: "../../../../assets/img/cus-img/dth-2.jpg"}
    
  // ];
  slides=[];
  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1, autoplay:true, autoplaySpeed:2000, arrows:true};
  IsDTHInfoCall=false;
  constructor(private apiData:ApidataService,private router:Router,private authService:AuthService,private apiService:ApiService, 
    private fb:FormBuilder,private FormValidation:FormValidationService) { }

  ngOnInit() {
    
    this.OperatorOptions= {
      multiple: false,
      closeOnSelect: true,
      
      templateResult: this.templateResult,
      templateSelection: this.templateSelection
    };
    this.RechargeForm=this.fb.group({
      mobile:this.fb.control('',[Validators.required]),
      
      amount:this.fb.control('',[Validators.required])
    })
      console.log(this.apiData.getSessionData(SessionVar.BaseData))
      this.OperatorData=this.apiData.getOperator(this.apiData.getRouteID(this.router.url.replace('/','').replace('.html','')));
      this.checIsLookupForAPI();
      this.GetB2CBanner();
  }
  get r(){ return this.RechargeForm.controls}
  public templateResult: Select2TemplateFunction = (state: Select2OptionData): JQuery | string => {
    if (!state.id) {
      return state.text;
    }
  
    let image = '<span class="dropdown-img"></span>';
  
    if (state.additional.image) {
      image = '<span class="dropdown-img" ><img  src="' + state.additional.image + '"</span>';
    }
  
    return jQuery('<span></b> ' + image + ' <span>' + state.text + '</span></span>');
  }
  
  // function for selection template
  public templateSelection: Select2TemplateFunction = (state: Select2OptionData): JQuery | string => {
    if (!state.id) {
      return state.text;
    }
  
    // return jQuery('<span> ' + state.text + '</span>');
    let image = '<span class="dropdown-img"></span>';
  
    if (state.additional.image) {
      image = '<span class="dropdown-img" ><img  src="' + state.additional.image + '"</span>';
    }
  
    return jQuery('<span class="search-ddl"></b> ' + image + ' <span>' + state.text + '</span></span>');
  }
  public Operatorchanged(e: any): void {

    this.operator = e.value;
    if(this.operator==0)
    {
      this.MobileplaceHolder='Select DTH Operator';
      return;
    }
    console.log(this.operator)
    this.odata=this.apiData.getOperatorData(this.operator);
    this.MobileplaceHolder=this.odata.accountName;
    this.AccountRemark=this.odata.accountRemak;
    if(this.odata.isAccountNumeric)
    this.RechargeForm.controls['mobile'].setValidators([Validators.minLength(this.odata.length), Validators.maxLength(this.odata.lengthMax),Validators.pattern('\\d{10}')]);
    else
    this.RechargeForm.controls['mobile'].setValidators([Validators.minLength(this.odata.length), Validators.maxLength(this.odata.lengthMax)]);
    this.RechargeForm.controls['amount'].setValidators([Validators.min(this.odata.min), Validators.max(this.odata.max),Validators.pattern('^[0-9]+(\.?[0-9]?)')]);
    this.IsRechargeSubmitted=false;
    //
    
  }


  dthInfo()
  {
    
      if(!this.mobile || (this.mobile.toString().length<this.odata.length||this.mobile.toString().length>this.odata.lengthMax))
      {
        this.DthInfoLoaded=false;
        this.DthInfo='';
        this.IsbannerShow=true;
        return
      }
      var dthInfoReq:ROfferReq={
        accountNo:this.mobile,
        oid:this.operator
      }
      this.DthInfo=[];
      this.DthInfoLoaded=false;
      
      // if(this.apiData.getSessionData(SessionVar.ROffer+this.mobile))
      // {
      //   this.bestOffer=this.apiData.getSessionData(SessionVar.ROffer+this.mobile);
      //   this.IsBestOfferLoaded=true;
      // }
      //else 
      this.DthInfoDataLoaded=true;
      if(localStorage.getItem(SessionVar.DthInfo+this.mobile))
      {
        this.DthInfo=JSON.parse(localStorage.getItem(SessionVar.DthInfo+this.mobile));
        console.log(this.DthInfo);
        this.DthInfoLoaded=true;
        this.DthInfoDataLoaded=true;
      }
      else
      {
        this.DTHInfoLoader=true;
        this.apiData.LoaderToggle();
        this.apiService.DTHSimplePlanInfo(dthInfoReq).subscribe(resp=>{
          //console.log(resp);
          this.apiData.LoaderToggle();
          this.DTHInfoLoader=false;
          if(resp.statuscode==RespCode.Success)
          {
            if(resp)
            {
              //console.log(resp.data);
              if(resp.dataRP)
              {
                //console.log(resp.data.records);
                this.DthInfo=resp.dataRP;
               
                // if(this.DthInfo[0].rs)
                // {
                //   this.DthInfoDataLoaded=true;
                //   localStorage.setItem(SessionVar.ROffer+this.mobile,JSON.stringify(this.bestOffer));
                // }
                this.DthInfoLoaded=true;
                this.checkShowBanner();
              }
              else
              {
                this.DthInfoDataLoaded=false;
              }
              this.DthInfoLoaded=true;
            }
            // else if(resp.dataRP)
            // {
            //   if(resp.dataRP.records)
            //   {
            //     this.bestOffer=resp.dataRP.records
            //     if(this.bestOffer[0].rs)
            //     {
            //       this.IsBestOfferDataLoaded=true;
            //       localStorage.setItem(SessionVar.ROffer+this.mobile,JSON.stringify(this.bestOffer));
            //     }
            //   }
            //   else
            //   {
            //     this.IsBestOfferDataLoaded=false;
            //   }
            // }
            // else
            // {
            //   this.IsBestOfferDataLoaded=false;
            // }
          }
        })
      }
    
  }

  dthSimplePlanInfo()
  {
    if(!this.mobile || (this.mobile.toString().length<this.odata.length||this.mobile.toString().length>this.odata.lengthMax))
    {
      this.CustInfoLoaded=false;
      this.DthInfo='';
      this.CustInfo='';
      this.IsbannerShow=true;
      return
    }
    var dthInfoReq:ROfferReq={
    accountNo:this.mobile,
    oid:this.operator
    }
    this.CustInfoLoader=true;
    this.apiData.LoaderToggle();
    this.apiService.DTHCustomerInfo(dthInfoReq).subscribe(resp=>{
      //console.log(resp);
      this.apiData.LoaderToggle();
      this.CustInfoLoader=false;
      if(resp.statuscode==RespCode.Success)
      {
        if(resp.data)
        {
          //console.log(resp.data);
          if(resp.data.records)
          {
            //console.log(resp.data.records);
            this.DthInfo=resp.data.records
            this.CustInfo= this.DthInfo[0];
            // if(this.DthInfo[0].rs)
            // {
            //   this.DthInfoDataLoaded=true;
            //   localStorage.setItem(SessionVar.ROffer+this.mobile,JSON.stringify(this.bestOffer));
            // }
            this.CustInfoLoaded=true;
            //this.checkShowBanner();
          }
          else
          {
            this.CustInfoDataLoaded=false;
          }
          this.CustInfoLoaded=true;
       
        }
       
      }
    })
  }
  proceedToAction()
  { 
    
    this.IsRechargeSubmitted=true;
    // console.log(this.operator);
    // console.log(this.RechargeForm);
 
      if(this.FormValidation.CheckFormValidStatus(this.RechargeForm))
      {
        if(this.FormValidation.checkControlValidation("mobile"))
        {
          if(this.FormValidation.RequiredValidation("mobile"))
          {
            this.spnMobile=this.MobileplaceHolder+" required";
          }
          else if(this.FormValidation.checkLength("mobile"))
          {
            this.spnMobile=this.odata.accountRemak;
          }
         else if(this.FormValidation.checkPattern("mobile") && this.odata.isAccountNumeric)
          {
            this.spnMobile="Invalid subscriber Id or mobile no.";
          }
        }
        if(this.FormValidation.checkControlValidation("amount"))
        {
          if(this.FormValidation.RequiredValidation("amount"))
          {
            this.spnAmount="Amount is required";
          }
        else if(this.FormValidation.checkMinMaxAmount("amount"))
          {
            this.spnAmount="Amount should be between "+this.odata.min+" to "+this.odata.max;
          }
         else if(this.FormValidation.checkPattern("amount"))
          {
            this.spnAmount="Invalid amount";
          }
        }
        if(this.odata && this.mobile)
        {
          if(this.odata.length>this.mobile.toString().length)
          {
            this.spnMobile=this.odata.accountRemak;
          }
        }
        
      return;
      }
      if(!this.mobile)
      {

        this.spnMobile=this.MobileplaceHolder+" required";
        return;
      }
      if(!this.amount)
      {
        this.spnAmount="Amount is required";
 
       return;
      }
      if(this.operator==0)
      {
        return;
      }
    var transactionReq:TransactionReq={
      accountNo:this.mobile,
      amount:this.amount,
      customerNo:'',
      geoCode:'',
      o1:'',
      o2:'',
      o3:'',
      o4:'',
      oid:this.operator,
      refID:''
    }
    this.apiData.setSessionData(SessionVar.TransactionRequest,transactionReq);
    if(this.authService.IsAuth())
    {
      this.apiData.loadOtherClass();
      this.router.navigate(['redirecttoaction.html'], { queryParams: {reff:'3309a24d426f5ee0d77b91f885ee641b',aid:'538536ff5636f4dc4e894b16182a3165b8413ac0cbabf91126fe2b8be4795f86d3a59a416a6b7b8920d00b0af0109b50'}})
    }
    else{
      this.apiData.loadOtherClass();
      this.router.navigate(['login.html'], { queryParams: { reff: '3309a24d426f5ee0d77b91f885ee641b',pid:'538536ff5636f4dc4e894b16182a3165b8413ac0cbabf91126fe2b8be4795f86d3a59a416a6b7b8920d00b0af0109b50'}});

    }
  }
  checIsLookupForAPI(){
    var req={mobile:"",userID:""}
    this.apiService.CheckIsLookUpFromAPI(req).subscribe(resp=>{
      this.IsDTHInfoCall=resp.isDTHInfoCall; 
    })
  }
  GetB2CBanner()
  {
    var req={opType:OpTypes.DTH};
    this.apiService.GetB2CBanner(req).subscribe(resp=>{
    if(resp.bannerUrl)
    {
      this.slides=resp.bannerUrl;
      
    }
    })
  }
  GetDTHPlans()
  {
    if(this.mobile)
    {
      if(this.IsDTHInfoCall && (this.mobile.toString().length>=this.odata.length && this.mobile.toString().length<=this.odata.lengthMax))
      {
          this.dthSimplePlanInfo();
      }
    }
    else{
      this.DthInfoLoaded=false;
      this.CustInfoLoaded=false;
      this.DthInfo='';
      this.CustInfo='';
      this.IsbannerShow=true;
    }
  }
  checkShowBanner()
  {
      if(this.DthInfo.length>0 || this.DthInfo.length>0)
      {
        this.IsbannerShow=false;
      }
      else if(this.DthInfo.response.length>0 || this.DthInfo.response.length>0)
      {
        this.IsbannerShow=false;
      }
      else
      {
        this.IsbannerShow=true;
      }
  }
  onamountClick(amount)
  {
    this.amount=amount;
    this.RechargeForm.controls['amount'].setValue(amount)
  }
  
  GetMoreCustDetails()
  {  
    $("#CustMore").toggle();
    if(this.IsCustMore==true)
    {
      this.IsCustMore=false;
    }
    else if(this.IsCustMore==false)
    {
      this.IsCustMore=true;
    }
  }

}
