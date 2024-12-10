import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  constructor (private http: HttpClient){}

    getTime(): Observable<any> {
      const url = 'https://worldtimeapi.org/timezone/Etc/UTC';
      return this.http.get<JSON>(url);
    }
}
   
