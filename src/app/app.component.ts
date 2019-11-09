import { Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

export class Coffee {
  constructor(
    private type: string, private table: number
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

  ordersReady$ = this.orderedCoffees
    .asObservable()
    .pipe(
      debounceTime(1000)
    );

  order(type: string) {
    this.orderedCoffees.next(new Coffee(type, 1));
  }
}
