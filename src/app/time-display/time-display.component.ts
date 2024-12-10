import { Component, OnDestroy, OnInit } from '@angular/core';
import { TimeService } from '../time.service';
import { Subscription, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-time-display',
  imports: [],
  templateUrl: './time-display.component.html',
  styleUrl: './time-display.component.css'
})
export class TimeDisplayComponent implements OnInit, OnDestroy {
  time: any;
  error: string | null = null;
  private timeSubscription: Subscription | null = null;

  constructor(private timeService: TimeService) {}

  ngOnInit(): void {
    console.log('here');
    this.timeSubscription = interval(1000)
      .pipe(switchMap(() => this.timeService.getTime()))
      .subscribe({
        next: (data) => {
          this.time = data.time;
          this.error = null;
        },
        error: (err) => {
          this.error = 'Failed to fetch time. Please try again.';
          console.error(err);
        }
      });
  }

  ngOnDestroy(): void {
    this.timeSubscription?.unsubscribe();
  }
}
