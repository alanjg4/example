import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  private currentTimeSubject = new BehaviorSubject<string>('Loading.');
  currentTime$ = this.currentTimeSubject.asObservable();

  constructor (private http: HttpClient){
    this.fetchCurrentTime();
  }

    fetchCurrentTime() {
      const url = 'http://worldtimeapi.org/api/timezone/America/Los_Angeles'
      this.http.get<any>(url).subscribe(
        (response) => {
          this.currentTimeSubject.next(response.datetime);
        },
        (error) => {
          console.error('Error fetching time:', error);
          this.currentTimeSubject.next('Error fetching time');
        }
      );
    }
}
   
