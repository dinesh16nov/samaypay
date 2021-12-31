import { Injectable } from '@angular/core';
import { LoginResp } from '../enums/apiResponse';
import { RespCode, SessionVar } from '../enums/emums';
import { ApidataService } from './apidata.service'
import { CookieService } from 'ngx-cookie-service';
import { identifierModuleUrl } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private apiData:ApidataService, private cookie:CookieService) { }


  public authProcess(data:LoginResp)
  {
    if(data.statuscode==RespCode.Success)
      {
          this.setCookie(SessionVar.Session,data.data.session);
          this.setCookie(SessionVar.SessionID,data.data.sessionID.toString());
          this.setCookie(SessionVar.UserName,data.data.name);
          this.setCookie(SessionVar.UserID,data.data.userID.toString());
      }
  }
  setCookie(k,v){
    v=v==undefined || v==null?'':v;
    document.cookie=k+"="+v+";expire="+this.dateInUTCString()+";path=/";
  }
  getCookie(k) {
    const name = k + "=";
    const cDecoded = decodeURIComponent(document.cookie);
    const cArr = cDecoded.split('; ');
    let res='';
    cArr.forEach(val => {
      if (val.indexOf(name) === 0) res = val.substring(name.length);
    })
    return res
  }
  dateInUTCString(){
    let d = new Date();
    let dateInUTCString = d.setTime(d.getTime() + (24 * 60 *  60 * 1000));
    return d.toUTCString();
  }
  IsAuth()
  {
      var Session=this.cookie.get(SessionVar.Session);
      var SessionID=this.cookie.get(SessionVar.SessionID);
  
      if(Session && SessionID)
      {
        return true;
      }
      else
        return false;
  }
  getSessionID()
  {
    if(this.IsAuth)
    {
      return this.cookie.get(SessionVar.SessionID);
    }
  }
  getSession()
  {
    if(this.IsAuth)
    {
      return this.cookie.get(SessionVar.Session);
    }
  }
  getUserName()
  {
    if(this.IsAuth)
    {
      return this.cookie.get(SessionVar.UserName);
    }
  }
  getUserID()
  {
    if(this.IsAuth)
    {
      return this.cookie.get(SessionVar.UserID);
    }
  }
  logout()
  {
    if(this.IsAuth)
    {
        this.cookie.delete(SessionVar.Session);
        this.cookie.delete(SessionVar.SessionID);
        this.cookie.delete(SessionVar.UserName);
        this.cookie.delete(SessionVar.UserID);
    }
  }
}
