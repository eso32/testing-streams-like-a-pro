import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent, Coffee } from './app.component';
import { DebugElement } from '@angular/core';

import { of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { AppService } from './app.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let el: DebugElement;
  let scheduler: TestScheduler;
  let appService: any;

  beforeEach(async(() => {
    appService = jasmine.createSpy('AppService');
    
    TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      providers: [{ provide: AppService, useValue: appService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('customers awaiting', () => {
    scheduler.run(({expectObservable, cold, hot}) => {
      let expected = {
        a: {name: 'Mike', preparationTime: 1000},
        b: {name: 'Anna', preparationTime: 3000}
      };
      appService.users$ = cold('a 1s b', expected);
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      expectObservable(component.ordersReady$).toBe('1000ms a 3000ms b', expected);
    });
  });

  // it('orders awaiting', () => {
  //   scheduler.run(({expectObservable, cold, hot}) => {
  //     let expected = {
  //       a: {type: 'Mike', preparationTime: 1000},
  //       b: {name: 'Anna', preparationTime: 3000}
  //     };
  //     appService.users$ = cold('ab', { a: 'Mike', b: 'Flo', c: 'Rolf' });
  //     fixture = TestBed.createComponent(AppComponent);
  //     component = fixture.componentInstance;
  //     component.orderedCoffees = hot('a-b-c', { a: 'Mike', b: 'Flo', c: 'Rolf' });
  //     fixture.detectChanges();

  //     expectObservable(component.ordersReady$).toBe('a-b-c', { a: 'Mike', b: 'Flo', c: 'Rolf' });
  //   });
  // });

  it('Should run self cleaning', () => {
    scheduler.run(({expectObservable}) => {
      const expectedObservable = '1s a 999ms b 999ms c 999ms d 999ms (e|)';
      const expectedValues = {a: 0, b: 1, c: 2, d: 3, e: 4};
      const source$ = component.coffeeCleaner$;

      expectObservable(source$).toBe(expectedObservable, expectedValues);
    });
  });
});
