import { Component } from '@angular/core';
import { Observable, timer, interval } from 'rxjs';
import { delayWhen, take } from 'rxjs/operators';
import { AppService } from './app.service';
// import { Coffee } from './coffee.class';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  waiter$: Observable<any>;

  coffeeCleaner$ = interval(1000).pipe(take(5));

  /**
   * Multiple coffee can be prepared simultaneously
   */
  ordersReady$ = this.appService.coffees$
    .pipe(
      delayWhen((coffee: any) => {
        return timer(coffee.preparationTime);
      })
    );

  constructor(private appService: AppService) {
  }

  order(type: string, preparationTime: number) {
    this.appService.order(type, preparationTime);
  }
}
