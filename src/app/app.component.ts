import { Component } from '@angular/core';
import { Observable, Subject, timer, interval } from 'rxjs';
import { debounceTime, delayWhen, take } from 'rxjs/operators';

export class Coffee {
  constructor(
    public type: string, public preparationTime: number
  ) {}
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  waiter$: Observable<Coffee>;
  orderedCoffees = new Subject<Coffee>();

  coffeeCleaner$ = interval(700).pipe(take(5));

  ordersReady$ = this.orderedCoffees
    .asObservable()
    .pipe(
      delayWhen((coffee: Coffee) => {
        return timer(coffee.preparationTime);
      })
    );

  order(type: string, preparationTime: number) {
    this.orderedCoffees.next(new Coffee(type, preparationTime));
  }
}
