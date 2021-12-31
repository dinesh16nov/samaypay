import { Component, OnInit } from '@angular/core';
import {  WebAppUserProfileResp } from 'src/app/enums/apiResponse';
import { ApisessionService } from 'src/app/services/apisession.service';

@Component({
  selector: 'aditya-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
 Name:string;
  OutletName:string;
  EmailID:string;
  Mobile:string;
  AlternateMobile:string;
  DOB:string;
  PAN:string;
  Pincode:string;
  City:string;
  State:string;
  Address:string;
  constructor(private apiSession:ApisessionService) {
    this.GetProfile();
  }

  ngOnInit() {
  }
  GetProfile(){ 
    this.apiSession.GetProfile().subscribe((resp:WebAppUserProfileResp)=>{
      if(resp.statuscode==1){
        this.Name=resp.name;
        this.OutletName=resp.outletName;
        this.Mobile=resp.mobileNo;
        this.EmailID=resp.emailID;
        this.AlternateMobile=resp.alternateMobile;
        this.DOB=resp.dob;
        this.PAN=resp.pan;
        this.Pincode=resp.pincode;
        this.City=resp.city;
        this.State=resp.state;
        this.Address=resp.address
      }
    });
}
}
