import { Component, OnInit } from '@angular/core';
import { ApidataService } from '../services/apidata.service';
import { NumberListResp, OpTypeResp } from '../enums/apiResponse';
import { RespCode, SessionVar } from '../enums/emums';
import { ApiService } from '../services/apiservices.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'aditya-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  IsContentLoaded =false;
  BaseData:NumberListResp;
  OpTypes:OpTypeResp;
  constructor(private apiData:ApidataService,private cookie:CookieService,
    private apiServices:ApiService) { }

  ngOnInit() {
    this.apiData.LoaderToggle();
    var isLocal=localStorage.getItem(SessionVar.BaseData);
    if(!this.cookie.check(SessionVar.BaseData))
    {
      localStorage.removeItem(SessionVar.BaseData);
      isLocal=null;
    }
    if(this.apiData.getSessionData(SessionVar.BaseData))
    {
      this.IsContentLoaded=true;
      this.apiData.LoaderToggle();
    }
    else if(isLocal)
    {
      this.BaseData=JSON.parse(localStorage.getItem(SessionVar.BaseData));
      this.apiData.setSessionData(SessionVar.BaseData,this.BaseData);
      this.OpTypes=JSON.parse(localStorage.getItem(SessionVar.OperatorList));
      this.apiData.setSessionData(SessionVar.OperatorList,this.OpTypes);
      if(this.apiData.getSessionData(SessionVar.BaseData))
      {
        this.IsContentLoaded=true;
        this.apiData.LoaderToggle();
      }
    }
    else
    {
      this.apiServices.GetNumberList().subscribe(resp=>{
        this.BaseData=resp;
        if(this.BaseData!=undefined){
          if(this.BaseData.statuscode==RespCode.Success)
          {
            this.apiData.setSessionData(SessionVar.BaseData,this.BaseData.data);
            localStorage.setItem(SessionVar.BaseData,JSON.stringify(this.BaseData.data));
            var date = new Date();
            var minutes=1440
            date.setTime(date.getTime() + (minutes * 60 * 1000));
            this.cookie.set(SessionVar.BaseData,SessionVar.BaseData,date);
            this.GetOptypes();
            this.IsContentLoaded=true;
          }
        }
        
        this.apiData.LoaderToggle();
        
      })
    }
    
  }
  GetOptypes()
  {
    this.apiServices.GetOpTypes().subscribe(resp=>{
      this.OpTypes=resp;
      if(this.OpTypes!=undefined){
        if(this.OpTypes.statuscode==RespCode.Success)
        {
          this.apiData.setSessionData(SessionVar.OperatorList,this.OpTypes.data);
          localStorage.setItem(SessionVar.OperatorList,JSON.stringify(this.OpTypes.data));
          var date = new Date();
          var minutes=1440
          date.setTime(date.getTime() + (minutes * 60 * 1000));
          this.cookie.set(SessionVar.OperatorList,SessionVar.OperatorList,date);
        }
      }      
    })
  }
}
