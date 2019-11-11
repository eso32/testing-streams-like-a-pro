import { Injectable } from '@angular/core';
import { Observable, interval, from } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private readonly testData = [{name: 'Anna', preparationTime: 1000}, {name: 'Bert', preparationTime: 2000}];

  get getUsers(): Observable<any> {
    return interval(1000).pipe(
      take(this.testData.length),
      map(i => this.testData[i])
    );
  }

  users$ = from(this.testData);

  constructor() {}
}
