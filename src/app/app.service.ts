import { Injectable } from '@angular/core';
import { Observable, interval, from, Subject } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { Coffee } from './coffee.class';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private readonly testData = [
    {type: 'expresso', preparationTime: 1000},
    {type: 'latte', preparationTime: 2000}
  ];
  private orderedCoffees = new Subject<any>();

  coffees$ = this.orderedCoffees.asObservable();

  order(type: string, preparationTime: number) {
    this.orderedCoffees.next(new Coffee(type, preparationTime));
  }
}
