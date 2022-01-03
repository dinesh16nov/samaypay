import { AfterContentInit, Component, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { ApidataService } from 'src/app/services/apidata.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { Select2OptionData, Select2TemplateFunction } from 'ng2-select2';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SimplePlanReq, ROfferReq, TransactionReq, RechargeReportReq } from '../../../enums/apiRequest';
import { ApiService } from 'src/app/services/apiservices.service';
import { RespCode, SessionVar, RespTranCode, OpTypes } from 'src/app/enums/emums';
import { TabsetComponent, TabDirective } from 'ngx-bootstrap/tabs';
import { AuthService } from 'src/app/services/auth.service';
import { ApisessionService } from 'src/app/services/apisession.service';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { Observable } from 'rxjs';
import { debug } from 'util';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'aditya-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.css']
})
@Pipe({
  name: 'safe'
})

export class MobileComponent implements OnInit,  PipeTransform {
  /*myControl = new FormControl();*/
  
  
  RechargeForm: FormGroup;
  mobile: number;
  amount: number;
  spnmobile = '';
  spnamount = '';
  public operator = 0;
  public circle = 0;
  public simplePlan = [];
  public bestOffer = [];
  public recentRecharge = [];
  IsbannerShow = true;
  labelmsg = '';
  IsBestOfferLoaded = false;
  IsBestOfferDataLoaded = false;
  IsRechargeSubmitted = false;
  public OperatorData: Array<Select2OptionData>;
  public filteredOperator: Observable<Array<Select2OptionData>>;
  public filteredCircle: Observable<Array<Select2OptionData>>;
  public OperatorOptions: Select2Options;
  public CircleData: Array<Select2OptionData>;
  public CircleOptions: Select2Options = {
    multiple: false,
    closeOnSelect: true,
    placeholder: 'Select',
  };
  slides = [];
  odata: any;
  slideConfig = { "slidesToShow": 1, "slidesToScroll": 1, autoplay: true, autoplaySpeed: 2000, arrows: true };
  IsLookUpFromAPI = false;
  mobNoSeries = 0;
  ErrorMsg = '';


  constructor(private apiData: ApidataService,
    private router: Router,
    private apiService: ApiService,
    private authService: AuthService,
    private apiSession: ApisessionService,
    private fb: FormBuilder, private FormValidation: FormValidationService, protected _sanitizer: DomSanitizer) { }

  ngOnInit() {
  
    
    this.OperatorOptions = {
      multiple: false,
      closeOnSelect: true,
      templateResult: this.templateResult,
      templateSelection: this.templateSelection
    };
    this.RechargeForm = this.fb.group({
      mobile: this.fb.control('', [Validators.required]),
      amount: this.fb.control('', [Validators.required]),
      myControl: this.fb.control(''),
      myControlCircle: this.fb.control('')
    });
    this.CircleData = this.apiData.getCircles();
    this.OperatorData = this.apiData.getOperator(this.apiData.getRouteID(this.router.url.replace('/', '').replace('.html', '')));
    this.checIsLookupForAPI();
    this.getRecentRecharge();
    this.checkShowBanner();
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
    if (value != null && value !="" ) {
      var filterValue = value.toLowerCase();
      var data =this.OperatorData.filter(operator => operator.text.toLowerCase().includes(filterValue))
      return data ;
    }
    else
      return this.OperatorData;
  }

  get r() { return this.RechargeForm.controls }
  checkOperator() {
    var req = { mobile: "", userID: "" }
    if (this.mobile) {
      if (this.mobile.toString().length == 4) {
        this.mobNoSeries = this.mobile;
      }
      req.mobile = this.mobile.toString();
      if (this.IsLookUpFromAPI) {
        if (this.mobile.toString().length == 10) {
          var id = this.authService.getUserID();
          req.userID = id ? id : "1";
          this.apiService.CheckNumberSeries(req).subscribe((resp: any) => {
            if (resp.statuscode == 1) {

              var numberLookUp = this.apiData.getNumBySeries(this.mobNoSeries);
              if (numberLookUp.length > 0) {
                this.operator = numberLookUp[0].oid;
                this.circle = numberLookUp[0].circleCode;
                this.getSamplePlan(this.circle, this.operator);
                this.apiData.getOperatorName(this.operator);
                this.apiData.getCircleName(this.circle);
                //this.checkShowBanner(); 
              }
            }
          });
        }

      }
      else if (!this.IsLookUpFromAPI) {
        if (this.mobile && this.mobile.toString().length == 4) {

          var numberLookUp = this.apiData.getNumBySeries(this.mobile);
          if (numberLookUp.length > 0) {
            this.operator = numberLookUp[0].oid;
            this.circle = numberLookUp[0].circleCode;
            this.getSamplePlan(this.circle, this.operator);
            this.apiData.getOperatorName(this.operator);
            this.apiData.getCircleName(this.circle);
            //this.checkShowBanner(); 
          }
        }
      }

    }

    else {
      this.operator = 0;
      this.circle = 0;
      this.simplePlan = [];
      this.checkShowBanner();
    }

  }

  getSamplePlan(circleid, oid) {
    debugger

    var req: SimplePlanReq = {
      circleID: circleid,
      oid: oid

    }
    this.apiData.LoaderToggle();
    this.labelmsg = 'Browse plan for ' + this.apiData.getOperatorName(this.operator) + ' - ' + this.apiData.getCircleName(this.circle);
    this.apiService.SimplePlan(req).subscribe(resp => {
      this.apiData.LoaderToggle();
      if (resp.status = RespCode.Success) {
        var data;
        if (resp.data) {
          data = resp.data.records;
        }
        else if (resp.dataRP) { data = resp.dataRP.records; }
        else if (resp.dataPA) { data = resp.dataPA.records; }

        this.simplePlan = [];
        if (data) {
          this.simplePlan.push({ "data": data["combo"], name: 'Combo' });
          this.simplePlan.push({ "data": data["IUC Topup"], name: 'IUC Topup' });
          this.simplePlan.push({ "data": data["All in One"], name: 'All in One' });
          this.simplePlan.push({ "data": data["jioPhone"], name: 'jioPhone' });
          this.simplePlan.push({ "data": data["jioPrime"], name: 'jioPrime' });
          this.simplePlan.push({ "data": data["Cricket Pack"], name: 'Cricket Pack' });
          this.simplePlan.push({ "data": data["FRCNon-Prime"], name: 'FRCNon-Prime' });
          this.simplePlan.push({ "data": data["all"], name: 'All' });
          this.simplePlan.push({ "data": data["unlimited"], name: 'Unlimited' });
          this.simplePlan.push({ "data": data["frcsrc"], name: 'Frcsrc' });
          this.simplePlan.push({ "data": data["smart recharge"], name: 'Smart Recharge' });
          this.simplePlan.push({ "data": data["frc"], name: 'FRS' });
          this.simplePlan.push({ "data": data["isd"], name: 'ISD' });
          this.simplePlan.push({ "data": data["roaming"], name: 'Roaming' });
          this.simplePlan.push({ "data": data["talktime"], name: 'Talktime' });
          this.simplePlan.push({ "data": data["stv"], name: 'STV' });
          this.simplePlan.push({ "data": data["sms"], name: 'SMS' });
          this.simplePlan.push({ "data": data["data"], name: 'Data' });
          this.simplePlan.push({ "data": data["international roaming"], name: 'International Roaming' });
          this.simplePlan.push({ "data": data["2g3g data"], name: '2g3g Data' });
          this.simplePlan.push({ "data": data["validity extension"], name: 'Validity Extension' });
          this.simplePlan.push({ "data": data["combo vouchers"], name: 'Combo Vouchers' });
          this.simplePlan.push({ "data": data["data plans"], name: 'Data Plans' });
          this.simplePlan.push({ "data": data["unlimited plans"], name: 'Unlimited Plans' });
          this.simplePlan.push({ "data": data["mblaze ultra"], name: 'Mblaze ultra' });
          this.simplePlan.push({ "data": data["wifi ultra recharges"], name: 'Wifi ultra recharges' });
        }
        this.checkShowBanner();
        //this.staticTabs.tabs[2].active = true;
      }
    })

  }

  onamountClick(amount) {
    this.amount = amount;
    this.RechargeForm.controls['amount'].setValue(amount)
  }
  onRecentClick(r) {
    this.amount = r.amount;
    this.RechargeForm.controls['amount'].setValue(r.amount);
    this.RechargeForm.controls['mobile'].setValue(r.account);
    //    this.circle=this.apiData.getOperator();
    this.operator = r.oid;
  }
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

    // this.operator=parseInt(state.id);
    // this.getSamplePlan(this.circle,this.operator);
    return jQuery('<span class="search-ddl"></b> ' + image + ' <span>' + state.text + '</span></span>');
  }

  public Operatorchanged(e: any): void {
   
    this.operator = e.value;
    this.odata = this.apiData.getOperatorData(this.operator);
    if (this.odata.isAccountNumeric)
      this.RechargeForm.controls['mobile'].setValidators([Validators.minLength(this.odata.length), Validators.maxLength(this.odata.lengthMax == 0 ? this.odata.length : this.odata.lengthMax), Validators.pattern('\\d{10}')]);
    else
      this.RechargeForm.controls['mobile'].setValidators([Validators.minLength(this.odata.length), Validators.maxLength(this.odata.lengthMax)]);
    this.RechargeForm.controls['amount'].setValidators([Validators.min(this.odata.min), Validators.max(this.odata.max), Validators.pattern('^[0-9]+(\.?[0-9]?)')]);
    this.IsRechargeSubmitted = false;
    if (this.circle > 0)
      this.browseSimplePlan()
    
  }


  public Circlechanged(e: any): void {
    this.circle = e.value;
    if (this.operator > 0)
      this.browseSimplePlan()

  }
  browseSimplePlan() {
    this.getSamplePlan(this.circle, this.operator);
  }
  onSelectBestOffer(data: TabDirective): void {
    debugger;
    if (!this.mobile || this.mobile.toString().length < this.odata.length) {
      return
    }
    var ROfferReq: ROfferReq = {
      accountNo: this.mobile,
      oid: this.operator
    }
    this.bestOffer = [];
    this.IsBestOfferLoaded = false;

    this.IsBestOfferDataLoaded = true;
    if (localStorage.getItem(SessionVar.ROffer + this.mobile)) {
      this.bestOffer = JSON.parse(localStorage.getItem(SessionVar.ROffer + this.mobile));
      this.IsBestOfferLoaded = true;
      this.IsBestOfferDataLoaded = true;
    }
    else {
      this.apiService.GetBestOffer(ROfferReq).subscribe(resp => {
        if (resp.statuscode == RespCode.Success) {
          if (resp.data) {
            if (resp.data.records) {
              this.bestOffer = resp.data.records
              if (this.bestOffer[0].rs) {
                this.IsBestOfferDataLoaded = true;
                localStorage.setItem(SessionVar.ROffer + this.mobile, JSON.stringify(this.bestOffer));
              }
              this.IsBestOfferLoaded = true;

            }
            else {
              this.IsBestOfferDataLoaded = false;
            }
            this.IsBestOfferLoaded = true;
          }
          else if (resp.dataRP) {
            if (resp.dataRP.records) {
              this.bestOffer = resp.dataRP.records
              if (this.bestOffer[0].rs) {
                this.IsBestOfferDataLoaded = true;
                localStorage.setItem(SessionVar.ROffer + this.mobile, JSON.stringify(this.bestOffer));
              }
            }
            else {
              this.IsBestOfferDataLoaded = false;
            }
          }
          else {
            this.IsBestOfferDataLoaded = false;
          }
        }
      })
    }
  }

  proceedToAction() {
  
    this.IsRechargeSubmitted = true;

    if (this.FormValidation.CheckFormValidStatus(this.RechargeForm)) {
      if (this.FormValidation.checkControlValidation("mobile")) {
        if (this.FormValidation.RequiredValidation("mobile")) {
          this.spnmobile = "Mobile no. is required";
        }
        else if (this.FormValidation.checkLength("mobile")) {
          this.spnmobile = this.odata.accountRemak;
        }
        else if (this.FormValidation.checkPattern("mobile") && this.odata.isAccountNumeric) {
          this.spnmobile = "Invalid mobile no.";
        }
      }
      if (this.FormValidation.checkControlValidation("amount")) {
        if (this.FormValidation.RequiredValidation("amount")) {
          this.spnamount = "Amount is required";
        }
        else if (this.FormValidation.checkMinMaxAmount("amount")) {
          this.spnamount = "Amount should be between " + this.odata.min + " to " + this.odata.max;
        }
        else if (this.FormValidation.checkPattern("amount")) {
          this.spnamount = "Invalid amount";
        }
      }
      if (this.odata && this.mobile) {
        if (this.odata.length > this.mobile.toString().length) {
          this.spnmobile = this.odata.accountRemak;
        }
      }
      return;
    }
    if (!this.mobile) {

      this.spnmobile = "Mobile no. is required";
      return;
    }
    if (!this.amount) {
      this.spnamount = "Amount is required";

      return;
    }
    if (this.operator == 0) {
      return;
    }
    if (this.circle == 0) {
      return;
    }
    var transactionReq: TransactionReq = {
      accountNo: this.mobile,
      amount: this.amount,
      customerNo: '',
      geoCode: '',
      o1: '',
      o2: '',
      o3: '',
      o4: '',
      oid: this.operator,
      refID: ''
    }
    this.apiData.setSessionData(SessionVar.TransactionRequest, transactionReq);
    if (this.authService.IsAuth()) {
      this.apiData.loadOtherClass();
      this.router.navigate(['redirecttoaction.html'], { queryParams: { reff: '3309a24d426f5ee0d77b91f885ee641b', aid: '538536ff5636f4dc4e894b16182a3165b8413ac0cbabf91126fe2b8be4795f86d3a59a416a6b7b8920d00b0af0109b50' } })
    }
    else {
      this.apiData.loadOtherClass();
      this.router.navigate(['login.html'], { queryParams: { reff: '3309a24d426f5ee0d77b91f885ee641b', pid: '538536ff5636f4dc4e894b16182a3165b8413ac0cbabf91126fe2b8be4795f86d3a59a416a6b7b8920d00b0af0109b50' } });

    }
  }

  getRecentRecharge() {
    var req: RechargeReportReq =
    {
      isRecent: true,
      fromDate: '',
      toDate: '',
      accountNo: '',
      apiid: 0,
      criteriaID: 0,
      transactionID: '',
      isExport: false,
      oid: 0,
      opTypeID: 1,
      status: 2,
      topRows: 100
    }

    this.apiSession.RechargeReport(req).subscribe(resp => {
      if (resp.statuscode == RespCode.Success) {
        this.recentRecharge = resp.rechargeReport;
      }

    })
  }

  checkShowBanner() {
    if (this.simplePlan.length > 0 || this.recentRecharge.length > 0) {
      this.IsbannerShow = false;
    }
    else {
      this.IsbannerShow = true;
    }
  }
  checIsLookupForAPI() {
    var req = { mobile: "", userID: "" }
    this.apiService.CheckIsLookUpFromAPI(req).subscribe(resp => {
      this.IsLookUpFromAPI = resp.isLookUpFromAPI;
    })
  }
  GetB2CBanner()
  {
    var req = { opType: OpTypes.Prepaid };
    this.apiService.GetB2CBanner(req).subscribe(resp => {
      if (resp.bannerUrl) {
        this.slides = resp.bannerUrl;

      }
    })
  }

  public displayFn(data?: Select2OptionData): string {
    return data ? data.text : '';
  }

  Operatorchangednew(oId: string): void{
    console.log('Operatorchangednew' + oId);
    this.operator = parseInt(oId);
    this.odata = this.apiData.getOperatorData(this.operator);
    if (this.odata.isAccountNumeric)
      this.RechargeForm.controls['mobile'].setValidators([Validators.minLength(this.odata.length), Validators.maxLength(this.odata.lengthMax == 0 ? this.odata.length : this.odata.lengthMax), Validators.pattern('\\d{10}')]);
    else
      this.RechargeForm.controls['mobile'].setValidators([Validators.minLength(this.odata.length), Validators.maxLength(this.odata.lengthMax)]);
    this.RechargeForm.controls['amount'].setValidators([Validators.min(this.odata.min), Validators.max(this.odata.max), Validators.pattern('^[0-9]+(\.?[0-9]?)')]);
    this.IsRechargeSubmitted = false;
      if (this.circle > 0)
      this.browseSimplePlan()
  }
  transform(value: string, type?: string): SafeHtml | SafeUrl | SafeResourceUrl {
    return this._sanitizer.bypassSecurityTrustUrl(value);
  }

  public displayFnCircle(data?: Select2OptionData): string {
    return data ? data.text : '';
  }

  Circlechangednew(oId: string): void {
    this.circle = parseInt(oId);
    if (this.operator > 0)
      this.browseSimplePlan()
  }

 
}
