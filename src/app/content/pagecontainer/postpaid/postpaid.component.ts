import { Component, OnInit, Pipe } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { Select2TemplateFunction } from 'ng2-select2';
import { ApidataService } from 'src/app/services/apidata.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/apiservices.service';
import { AuthService } from 'src/app/services/auth.service';
import { TransactionReq } from 'src/app/enums/apiRequest';
import { OpTypes, SessionVar } from 'src/app/enums/emums';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';


@Pipe({
  name: 'safe'
})
@Component({
  selector: 'aditya-postpaid',
  templateUrl: './postpaid.component.html',
  styleUrls: ['./postpaid.component.css']
})
export class PostpaidComponent implements OnInit {
  RechargeForm:FormGroup;
  mobile:number;
  amount:number;
  public operator=0;
  public circle=0;
  labelmsg='';
  IsRechargeSubmitted=false;
  public OperatorData: Array<Select2OptionData>;
  public OperatorOptions:Select2Options;
  public CircleData: Array<Select2OptionData>;
  public filteredOperator: Observable<Array<Select2OptionData>>;
  public filteredCircle: Observable<Array<Select2OptionData>>;
  public CircleOptions:Select2Options={
    multiple: false,
    closeOnSelect: true,
    placeholder:'Select',
  };
  // slides = [
  //   {img: "../../../../assets/img/cus-img/postpaid2.jpg"},
  //   {img: "../../../../assets/img/cus-img/Postpaid3.jpg"}
    
    
  // ];
  slides = [];
  odata:any;
  MobileplaceHolder='Registered Mobile No.';
  AccountRemark='';
  IsBBPS=false;
  IsBilling=false;
  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1, autoplay:true, autoplaySpeed:2000, arrows:true};
  spnMobile='';
  spnAmount='';
  constructor(private apiData:ApidataService,
    private router:Router, 
    private apiService:ApiService, 
    private authService:AuthService,
    private fb: FormBuilder, private FormValidation: FormValidationService, protected _sanitizer: DomSanitizer) { }

  ngOnInit() {
    //this.apiService.test().subscribe(resp=>{console.log(resp)});
    this.OperatorOptions= {
      multiple: false,
      closeOnSelect: true,
      
      templateResult: this.templateResult,
      templateSelection: this.templateSelection
    };
    this.RechargeForm=this.fb.group({
      mobile:this.fb.control('',[Validators.required, Validators.maxLength(10), Validators.minLength(10),Validators.pattern('\\d{10}')]),
      
      amount: this.fb.control('', [Validators.required]),
      myControl: this.fb.control(''),
      myControlCircle: this.fb.control('')
    })
    
      this.CircleData=this.apiData.getCircles();
      this.OperatorData=this.apiData.getOperator(this.apiData.getRouteID(this.router.url.replace('/','').replace('.html','')));
    this.GetB2CBanner();

    this.filteredOperator = this.RechargeForm.controls['myControl'].valueChanges
            .pipe(
        startWith(''),
        map(value => this._filterOperator(value))
    );

    this.filteredCircle = this.RechargeForm.controls['myControlCircle'].valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterCircle(value))
      );

  }

  private _filterCircle(object: any): Array<Select2OptionData> {
    let value = typeof (object) === 'object' ? object.text : object;
    if (value != null && value != "") {
      var filterValue = value.toLowerCase();
      var data = this.CircleData.filter(Circle => Circle.text.toLowerCase().includes(filterValue))
      return data;
    }
    else
      return this.CircleData;
  }

  private _filterOperator(object: any): Array<Select2OptionData> {
    let value = typeof (object) === 'object' ? object.text : object;
    if (value != null && value != "") {
      var filterValue = value.toLowerCase();
      var data = this.OperatorData.filter(operator => operator.text.toLowerCase().includes(filterValue))
      return data;
    }
    else
      return this.OperatorData;
  }
  get r(){ return this.RechargeForm.controls}
// function for result template
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
  
 
//public Operatorchanged(e: any): void {
//  this.operator = e.value;
//  if(this.operator==0)
//  {
//    this.MobileplaceHolder='Select Operator';
//    return;
//  }
//  //console.log(this.operator)
//  this.odata=this.apiData.getOperatorData(this.operator);
//  this.IsBBPS=this.odata.isBBPS;
//  this.IsBilling=this.odata.isBilling;
//  this.MobileplaceHolder=this.odata.accountName;
//  this.AccountRemark=this.odata.accountRemak;
//  if(this.odata.isAccountNumeric)
//  this.RechargeForm.controls['mobile'].setValidators([Validators.minLength(this.odata.length), Validators.maxLength(this.odata.lengthMax),Validators.pattern('\\d{10}')]);
//  else
//  this.RechargeForm.controls['mobile'].setValidators([Validators.minLength(this.odata.length), Validators.maxLength(this.odata.lengthMax)]);
//  this.RechargeForm.controls['amount'].setValidators([Validators.min(this.odata.min), Validators.max(this.odata.max),Validators.pattern('^[0-9]+(\.?[0-9]?)')]);
//  this.IsRechargeSubmitted=false;
//  //
  
//}
//public Circlechanged(e: any): void {
//  this.circle = e.value;
  
//}

checkOperator()
  {
    
    if(this.mobile && this.mobile.toString().length==4)
    {
      var numberLookUp=this.apiData.getNumBySeries(this.mobile);
      if(numberLookUp.length>0)
      {
        console.log(numberLookUp)
        this.operator=numberLookUp[0].oid;
        this.circle=numberLookUp[0].circleCode;
        
      }
      else
      {
        
      }
    }
    
  }

  proceedToAction()
  { 
    this.IsRechargeSubmitted=true;
    console.log(this.operator);
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
          this.spnMobile="Invalid mobile no.";
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
    if(this.circle==0)
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
    var req={opType:OpTypes.PostPaid};
    this.apiService.GetB2CBanner(req).subscribe(resp=>{
    if(resp.bannerUrl)
    {
      this.slides=resp.bannerUrl;
      
    }
    })
  }

  public displayFn(data?: Select2OptionData): string {
    return data ? data.text : '';
  }


  Operatorchangednew(event: any): void {
  
    this.operator = parseInt(event.option.value.id);
    if (this.operator == 0) {
      this.MobileplaceHolder = 'Select Operator';
      return;
    }
    this.odata = this.apiData.getOperatorData(this.operator);
    this.IsBBPS = this.odata.isBBPS;
    this.IsBilling = this.odata.isBilling;
    this.MobileplaceHolder = this.odata.accountName;
    this.AccountRemark = this.odata.accountRemak;
    if (this.odata.isAccountNumeric)
      this.RechargeForm.controls['mobile'].setValidators([Validators.minLength(this.odata.length), Validators.maxLength(this.odata.lengthMax), Validators.pattern('\\d{10}')]);
    else
      this.RechargeForm.controls['mobile'].setValidators([Validators.minLength(this.odata.length), Validators.maxLength(this.odata.lengthMax)]);
    this.RechargeForm.controls['amount'].setValidators([Validators.min(this.odata.min), Validators.max(this.odata.max), Validators.pattern('^[0-9]+(\.?[0-9]?)')]);
    this.IsRechargeSubmitted = false;
   
  }
  transform(value: string, type?: string): SafeHtml | SafeUrl | SafeResourceUrl {
    console.log(value);
    return this._sanitizer.bypassSecurityTrustUrl(value);

  }

  public displayFnCircle(data?: Select2OptionData): string {
    return data ? data.text : '';
  }

  Circlechangednew(event: any): void {
    this.circle = parseInt(event.option.value.oid);
    
  }

  inputclear(a = 0) {
    debugger
    if (a == 0) {
      this.operator = 0;
      this.RechargeForm.controls['myControl'].setValue(' ');
    }
    else {
      this.circle = 0;
      this.RechargeForm.controls['myControlCircle'].setValue(' ');

    }
  }
}
