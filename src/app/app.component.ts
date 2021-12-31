import { Component } from '@angular/core';
import { HeaderInfo, ThemeType } from './enums/emums';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title =HeaderInfo.Title;
  public static themeType=ThemeType.Old;
  
  constructor(private titleService:Title){}

  ngOnInit(){
    this.titleService.setTitle(this.title);
  }
}
