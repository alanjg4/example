import { Component, OnInit } from '@angular/core';
import { TimeService } from '../time.service';

@Component({
  selector: 'app-time-display',
  imports: [],
  templateUrl: './time-display.component.html',
  styleUrl: './time-display.component.css'
})
export class TimeDisplayComponent implements OnInit{
  currentTime: string = 'Loading'
  /* Current time is initially 'Loading' and ngOnInit fecthes the time as compomponent is initialized.*/
  constructor(private timeService: TimeService){}
    ngOnInit(){
      this.timeService.currentTime$.subscribe((time) => {
        this.currentTime = time;
      });
    }
  }
