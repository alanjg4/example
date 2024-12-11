import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  private currentTimeSubject = new BehaviorSubject<string>('Loading.');
  currentTime$ = this.currentTimeSubject.asObservable();
  private currentDateAndTime: Date | null = null

  constructor (private http: HttpClient){
    this.getCurrentTime();
  }

  private getCurrentTime() {
    const url = 'https://worldtimeapi.org/api/timezone/America/Los_Angeles'
    this.http.get<any>(url).subscribe(
      (response) => {
        this.currentDateAndTime = new Date(response.datetime);
        this.startClock();
      },
      (error) => {
        console.error('Error getting time:', error);
        this.currentTimeSubject.next('Error getting time');
      }
    );
  }

  private startClock(){
    setInterval(() => {
      if (this.currentDateAndTime) {
        this.currentDateAndTime.setSeconds(this.currentDateAndTime.getSeconds() + 1);
        this.updateTime();
      }
    }, 1000)
  }

  private updateTime(){
    if (this.currentDateAndTime){
      const localTime = this.convertToLocalTime(this.currentDateAndTime);
      this.currentTimeSubject.next(localTime);
    }
  }

  private convertToLocalTime(date: Date){
    return new Intl.DateTimeFormat('en-US', {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  }
}
   
