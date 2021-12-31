import { Component, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { Select2TemplateFunction } from 'ng2-select2';
import { ApidataService } from 'src/app/services/apidata.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/apiservices.service';

@Component({
  selector: 'aditya-gas',
  templateUrl: './gas.component.html',
  styleUrls: ['./gas.component.css']
})
export class GasComponent implements OnInit {

  mobile:string;
  public operator:0;
  public OperatorData: Array<Select2OptionData>;
  public OperatorOptions:Select2Options;

  // slides = [
  //   {img: "../../../../assets/img/cus-img/Cylender.jpg"}
    
    
    
  // ];
  slides = [];
  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1, autoplay:true, autoplaySpeed:2000, arrows:true};
  opTypeID;
  constructor(private apiData:ApidataService,private router:Router,private apiService:ApiService) { }

  ngOnInit() {
    this.OperatorOptions= {
      multiple: false,
      closeOnSelect: true,
      
      templateResult: this.templateResult,
      templateSelection: this.templateSelection
    };
    
      
      this.OperatorData=this.apiData.getOperator(this.apiData.getRouteID(this.router.url.replace('/','').replace('.html','')));
      this.opTypeID=26;
      this.GetB2CBanner();
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
    
    var sub=state.text.length>35 ?state.text.substring(0,35)+'...':state.text;
    
    return jQuery('<span class="search-ddl"></b> ' + image + ' <span>' + sub + '</span></span>');
  }

  checkOperator()
  {
    
    if(this.mobile && this.mobile.toString().length==4)
    {
      var numberLookUp=this.apiData.getNumBySeries(this.mobile);
      if(numberLookUp.length>0)
      {
        
        this.operator=numberLookUp[0].oid;
        
        
      }
    }
    
  }
  GetB2CBanner()
  {
    var req={opType:this.opTypeID};
    this.apiService.GetB2CBanner(req).subscribe(resp=>{
    if(resp.bannerUrl)
    {
      this.slides=resp.bannerUrl;
      
    }
    })
  }
}
