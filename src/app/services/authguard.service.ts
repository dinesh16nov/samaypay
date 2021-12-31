import { Injectable } from '@angular/core';
import { AuthService } from './auth.service'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { ApidataService } from './apidata.service';


@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {
  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    if(!this.auth.IsAuth()){
      this.apiData.gotoMenu('/');
    }
    console.log(this.auth.IsAuth());
    return this.auth.IsAuth();
  }

  constructor(private auth:AuthService,private apiData:ApidataService, ) { }
}
