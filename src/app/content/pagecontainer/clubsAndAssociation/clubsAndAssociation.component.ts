import { Component, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { Select2TemplateFunction } from 'ng2-select2';
import { ApidataService } from 'src/app/services/apidata.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { TransactionReq } from 'src/app/enums/apiRequest';
import { OpTypes, SessionVar } from 'src/app/enums/emums';
import { ApiService } from 'src/app/services/apiservices.service';
import { FormValidationService } from 'src/app/services/form-validation.service';


@Component({
  selector: 'aditya-clubsAndAssociation',
  templateUrl: './clubsAndAssociation.component.html',
  styleUrls: ['./clubsAndAssociation.component.css']
})
export class ClubsAndAssociationComponent implements OnInit {
  RechargeForm:FormGroup;
  mobile:any;
  amount:number;
  MobileplaceHolder='Select ClubsAndAssociation Operator'
  AccountRemark=''
  odata:any;
  public operator:0;
  public OperatorData: Array<Select2OptionData>;
  public OperatorOptions: Select2Options;
  IsRechargeSubmitted=false;
 
  slides = [];
  spnMobile='';
  spnAmount='';
  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1, autoplay:true, autoplaySpeed:2000, arrows:true};
  constructor(private apiData:ApidataService,private router:Router,private authService:AuthService,
    private fb:FormBuilder, private apiService:ApiService,private FormValidation:FormValidationService) { }

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
      
      this.OperatorData=this.apiData.getOperator(this.apiData.getRouteID(this.router.url.replace('/','').replace('.html','')));
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
      this.MobileplaceHolder='Select Broadband Operator';
      return;
    }
    this.odata=this.apiData.getOperatorData(this.operator);
    this.MobileplaceHolder=this.odata.accountName;
    this.AccountRemark=this.odata.accountRemak;
    if(this.odata.isAccountNumeric)
    this.RechargeForm.controls['mobile'].setValidators([Validators.minLength(this.odata.length), Validators.maxLength(this.odata.lengthMax),Validators.pattern('^[0-9]+$')]);
    else
    this.RechargeForm.controls['mobile'].setValidators([Validators.minLength(this.odata.length), Validators.maxLength(this.odata.lengthMax)]);
    this.RechargeForm.controls['amount'].setValidators([Validators.min(this.odata.min), Validators.max(this.odata.max),Validators.pattern('^[0-9]+(\.?[0-9]?)')]);
    this.IsRechargeSubmitted=false;
  }
  

  proceedToAction()
  { 
    this.IsRechargeSubmitted=true;
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
          this.spnMobile="Invalid Account Number";
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
  GetB2CBanner()
  {
    var req={opType:OpTypes.ClubsandAssociations};
    this.apiService.GetB2CBanner(req).subscribe(resp=>{
    if(resp.bannerUrl)
    {
      this.slides=resp.bannerUrl;
      
    }
    })
  }

}
