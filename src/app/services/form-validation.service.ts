import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {

  constructor() { }
  form:any;
  public  CheckFormValidStatus(FormName)
    {
        this.form=FormName;
       if(FormName.status=="INVALID")
       {
           return true;
       }
    }
    public  checkControlValidation(ControlName)
    {
         if(this.form.controls[ControlName].status=="INVALID")
         {
             return true;
         }
    }
    public  RequiredValidation(ControlName)
    {
        if(this.form.controls[ControlName].errors.required)
        {
            return true;
        }
        
    }
    public  checkPattern(ControlName)
    {
        if(this.form.controls[ControlName].errors.pattern)
        {
            return true;
        }
    }
    public  checkLength(ControlName)
    {
        if(this.form.controls[ControlName].errors.minlength||this.form.controls[ControlName].errors.maxlength)
        {
            // if(this.form.controls[ControlName].errors.maxlength.requiredLength==0 && !this.form.controls[ControlName].errors.minlength)
            // {
            //     this.form.controls[ControlName].errors=null;
            //     this.form.controls[ControlName].status="VALID";
            //     this.form.status="VALID";
            //     return false;
            // }
            // else
            return true;
        }
    }
    public checkMinMaxAmount(ControlName)
    {
        if(this.form.controls[ControlName].errors.min||this.form.controls[ControlName].errors.max)
        {
            return true;
        }
    }
}
