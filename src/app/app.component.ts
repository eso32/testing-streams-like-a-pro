import { Component } from '@angular/core';
import { Observable, Subject, timer, interval } from 'rxjs';
import { debounceTime, delayWhen, take, map } from 'rxjs/operators';
import { AppService } from './app.service';

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
  waiter$: Observable<any>;
  orderedCoffees = new Subject<any>();

  coffeeCleaner$ = interval(1000).pipe(take(5));

  ordersReady$ = this.appService.users$
    .pipe(
      delayWhen((user: any) => {
        return timer(user.preparationTime);
      })
    );

  customers$ = this.appService.users$;

  constructor(private appService: AppService) {
  }

  order(type: string, preparationTime: number) {
    this.orderedCoffees.next(new Coffee(type, preparationTime));
  }
}
