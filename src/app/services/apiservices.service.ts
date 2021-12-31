import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of, from} from 'rxjs';
import { APIUrl,HeaderInfo } from '../enums/emums';
import { LoginReq,SignUpReq,SimplePlanReq, ROfferReq, VarifyOTPReq, UserSubscriptionReq } from '../enums/apiRequest';
import { OpTypeResp, LoginResp,NumberListResp, CompanyProfileDetail} from '../enums/apiResponse';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'appID':HeaderInfo.AppID,'version':HeaderInfo.Version,'domain':HeaderInfo.Domain })
};

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  
  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }

  GetOpTypes(): Observable<OpTypeResp> {
    var a=1
    return this.http.post<OpTypeResp>(APIUrl.BaseURL + APIUrl.GetOpTypes,a, httpOptions).pipe(
      catchError(this.handleError<OpTypeResp>('GetOpTypes'))
    );
  }

  
  GetNumberList():Observable<NumberListResp>
  {
    return this.http.post<NumberListResp>(APIUrl.BaseURL + APIUrl.GetNumberList,1, httpOptions).pipe(
      catchError(this.handleError<NumberListResp>('GetNumberList'))
    );
  }
  GetCompanyProfile():Observable<CompanyProfileDetail>{
    return this.http.post<CompanyProfileDetail>(APIUrl.BaseURL + APIUrl.GetCompanyProfile,1, httpOptions).pipe(
      catchError(this.handleError<CompanyProfileDetail>('GetCompanyProfile'))
    );
  }
  UserSubscriptionApp(req:UserSubscriptionReq):Observable<OpTypeResp>{
    return this.http.post<OpTypeResp>(APIUrl.BaseURL + APIUrl.UserSubscriptionApp,req, httpOptions).pipe(
      catchError(this.handleError<OpTypeResp>('UserSubscriptionApp'))
    );
  }
  //
  GetBestOffer(req:ROfferReq):Observable<any>
  {
    return this.http.post<NumberListResp>(APIUrl.BaseURL + APIUrl.ROffer,req, httpOptions).pipe(
      catchError(this.handleError<NumberListResp>('GetBestOffer'))
    );
  }

  Login(req:LoginReq):Observable<LoginResp>
  {
    return this.http.post<LoginResp>(APIUrl.BaseURL + APIUrl.Login,req, httpOptions).pipe(
      catchError(this.handleError<LoginResp>('Login'))
    );
  }
  
  SignUp(req:SignUpReq):Observable<any>
  {
    return this.http.post<any>(APIUrl.BaseURL + APIUrl.SignUp,req, httpOptions).pipe(
      catchError(this.handleError<any>('SignUp'))
    );
  }

  VarifyOTP(req:VarifyOTPReq):Observable<any>
  {
    return this.http.post<any>(APIUrl.BaseURL + APIUrl.VarifyOTP,req, httpOptions).pipe(
      catchError(this.handleError<any>('VarifyOTP'))
    );
  }
  
  SimplePlan(req:SimplePlanReq):Observable<any>
  {
    return this.http.post<any>(APIUrl.BaseURL + APIUrl.SimplePlan,req, httpOptions).pipe(
      catchError(this.handleError<any>('SimplePlan'))
    );
  }
  DTHCustomerInfo(req:ROfferReq):Observable<any>
  {
    return this.http.post<any>(APIUrl.BaseURL + APIUrl.DTHCustomerInfo,req, httpOptions).pipe(
      catchError(this.handleError<any>('DTHCustomerInfo'))
    );
  }
  DTHSimplePlanInfo(req:ROfferReq):Observable<any>
  {
    return this.http.post<any>(APIUrl.BaseURL + APIUrl.DTHSimplePlanInfo,req, httpOptions).pipe(
      catchError(this.handleError<any>('DTHSimplePlanInfo'))
    );
  }
 
  test()
  {
    //http://192.168.1.29/webapp/Get
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    };
    //let body = {'p':'hQuo8AVzUtiO4kqzL3kzLoNVv2E4gK/zSacbx4H17f4='}
    const formData = new FormData();
    formData.append('p', 'hQuo8AVzUtiO4kqzL3kzLoNVv2E4gK/zSacbx4H17f4=');
    // let body = new URLSearchParams();
    // body.set('p', 'hQuo8AVzUtiO4kqzL3kzLoNVv2E4gK/zSacbx4H17f4=');
    return this.http.post<any>('http://192.168.1.29/App/' + APIUrl.test, formData).pipe(
      catchError(this.handleError<any>('test'))
    );
  }
  CheckNumberSeries(req:any):Observable<any>
  {
    return this.http.post<any>(APIUrl.BaseURL + APIUrl.CheckNumberSeries,req, httpOptions).pipe(
      catchError(this.handleError<any>('CheckNumberSeries'))
    );
  }
  CheckIsLookUpFromAPI(req:any):Observable<any>
  {
    return this.http.post<any>(APIUrl.BaseURL + APIUrl.CheckIsLookUpFromAPI,req, httpOptions).pipe(
      catchError(this.handleError<any>('CheckIsLookUpFromAPI'))
    );
  }
  GetB2CBanner(req:any):Observable<any>
  {
    return this.http.post<any>(APIUrl.BaseURL + APIUrl.GetBanner,req, httpOptions).pipe(
      catchError(this.handleError<any>('GetB2CBanner'))
    );
  }
  ForgetPassword(req:any):Observable<any>
  {
    return this.http.post<any>(APIUrl.BaseURL + APIUrl.ForgetPassword,req, httpOptions).pipe(
      catchError(this.handleError<any>('ForgetPassword'))
    );
  }
}
