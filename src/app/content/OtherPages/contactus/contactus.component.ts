import { Component, OnInit } from '@angular/core';
import { ApidataService } from 'src/app/services/apidata.service';
import { ApiService } from 'src/app/services/apiservices.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpResp, LoginResp, CompanyProfileDetail, OpTypeResp } from 'src/app/enums/apiResponse';
import { UserSubscriptionReq } from 'src/app/enums/apiRequest';

@Component({
  selector: 'aditya-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  contactNo:string='';
  contactEmail:string='';
  contactAddress:string='';
  ContactForm:FormGroup;
  IsContactSubmitted=false;
  ErrorMsg='';
  constructor(private apiData:ApidataService,
    private apiServices:ApiService,
    private authService:AuthService,
    private fb:FormBuilder,
    private router:Router) { }

  ngOnInit() {
   this.ShowContact();
   this.ContactForm=this.fb.group({
    mobileNo:this.fb.control('',[Validators.required, Validators.maxLength(10), Validators.minLength(10),Validators.pattern('\\d{10}')]),
    name:this.fb.control('',[Validators.required, Validators.maxLength(50), Validators.minLength(3)]),
    EmailID:this.fb.control('',[Validators.required, Validators.maxLength(50), Validators.minLength(6)]),
    address:this.fb.control('',[Validators.required, Validators.maxLength(500), Validators.minLength(5)])
  });
  }
  get register(){ return this.ContactForm.controls}
ShowContact(){
  var _this=this;
  this.apiServices.GetCompanyProfile().subscribe((resp:CompanyProfileDetail)=>{
    _this.contactNo=resp.customerCareMobileNos;
      _this.contactEmail=resp.customerCareEmailIds;
      _this.contactAddress=resp.address;
  });
}
MakeQuery(){
  this.ErrorMsg='';
 
  var apiReq:UserSubscriptionReq={
    EmailID:this.ContactForm.get("EmailID").value,
    Message:this.ContactForm.get("address").value,
    MobileNo:this.ContactForm.get("mobileNo").value,
    Name:this.ContactForm.get("name").value,
  }
  if(apiReq.EmailID==''){
    this.ErrorMsg="EmailID Required!";
    return false;
  }
  if(apiReq.Message==''){
    this.ErrorMsg="Query Required!";
    return false;
  }
  if(apiReq.MobileNo==''){
    this.ErrorMsg="MobileNo Required!";
    return false;
  }
  if(apiReq.Name==''){
    this.ErrorMsg="Name Required!";
    return false;
  }
  
  this.IsContactSubmitted=true;
  var _this=this;
  this.apiServices.UserSubscriptionApp(apiReq).subscribe((resp:OpTypeResp)=>{
    _this.ErrorMsg=resp.msg;
  });
}
}
