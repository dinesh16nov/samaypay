import { Component, OnInit, OnDestroy, inject, Injectable, Input, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { Subscription, interval } from 'rxjs';
@Injectable({
  providedIn:'root'
})
@Component({
  selector: 'app-count-down',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
  export class TimerComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  @Input() stratimerp: number = 0;
  @Output() reloadWin = new EventEmitter()
  public dateNow: Date = new Date();
  public dDay = new Date(this.dateNow.setMinutes(this.dateNow.getMinutes() + 7));
  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute = 60;

  public timeDifference;
  public secondsToDday;
  public minutesToDday;
  public hoursToDday;
  public daysToDday;

  constructor() { }
  private getTimeDifference() {
    this.timeDifference = this.dDay.getTime() - new Date().getTime();
    this.allocateTimeUnits(this.timeDifference);
  }

  private allocateTimeUnits(timeDifference) {
    this.secondsToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
    this.minutesToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute);
    this.hoursToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute) % this.hoursInADay);
    this.daysToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute * this.hoursInADay));
    this.secondsToDday = this.secondsToDday < 0 ? 0 : this.secondsToDday;
    this.minutesToDday = this.minutesToDday < 0 ? 0 : this.minutesToDday;
    this.hoursToDday = this.hoursToDday < 0 ? 0 : this.hoursToDday;
    console.log(this.minutesToDday);
    console.log(this.secondsToDday);
    if (this.minutesToDday == 0 && this.secondsToDday == 0)
    {
      this.reloadWin.emit();
    }
    
  }

  ngOnInit() {
    //this.subscription = interval(1000)
    //  .subscribe(x => { this.getTimeDifference(); });
  }
  startimer() {
    this.subscription = interval(1000)
      .subscribe(x => {
        
        this.getTimeDifference();
      });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  ngOnChanges(changes: SimpleChanges) {
    debugger;
  console.log(changes);
    if (changes.stratimerp.currentValue[0] == 1) {
      this.dateNow = new Date();
    this.dDay = new Date(this.dateNow.setMinutes(this.dateNow.getMinutes() + 7));
      this.startimer();
    }
    
    

  }

}
