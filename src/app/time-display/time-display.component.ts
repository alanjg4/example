import { Component, OnInit } from '@angular/core';
import { TimeService } from '../time.service';
import { NgOptimizedImage } from '@angular/common';
/*import { Subscription, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';*/

@Component({
  selector: 'app-time-display',
  imports: [],
  templateUrl: './time-display.component.html',
  styleUrl: './time-display.component.css'
})
export class TimeDisplayComponent implements OnInit{
  currentTime: string = 'Loading'

  constructor(private timeService: TimeService){}
    ngOnInit(): void{
      this.timeService.currentTime$.subscribe(time => {
        this.currentTime = time
      });
    }
  }
