import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { TestScheduler } from 'rxjs/testing';
import { AppService } from './app.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let scheduler: TestScheduler;
  let appService: any;
  const expected = {
    a: {type: 'expresso', preparationTime: 1000},
    b: {type: 'latte', preparationTime: 3000}
  };

  beforeEach(async(() => {
    appService = jasmine.createSpy('AppService');
    scheduler = new TestScheduler((actual, expectedVal) => {
      expect(actual).toEqual(expectedVal);
    });

    TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      providers: [{ provide: AppService, useValue: appService }]
    })
    .compileComponents();
  }));

  it('Should make new coffee after order', () => {
    scheduler.run(({expectObservable, cold}) => {
      appService.coffees$ = cold('a 1s b', expected);

      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;

      expectObservable(component.ordersReady$).toBe('1000ms a 3000ms b', expected);
    });
  });

  it('Should run self cleaning', () => {
    scheduler.run(({expectObservable, cold}) => {
      appService.coffees$ = cold('-');

      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;

      const expectedObservable = '1s a 999ms b 999ms c 999ms d 999ms (e|)';
      const expectedValues = {a: 0, b: 1, c: 2, d: 3, e: 4};
      const source$ = component.coffeeCleaner$;

      expectObservable(source$).toBe(expectedObservable, expectedValues);
    });
  });
});
