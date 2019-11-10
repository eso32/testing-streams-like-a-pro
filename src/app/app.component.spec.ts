import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent, Coffee } from './app.component';
import { DebugElement } from '@angular/core';
import { TestScheduler } from 'rxjs/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let el: DebugElement;
  let scheduler: TestScheduler;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('Should make new coffee after order', (done) => {
    const expectedCoffee = new Coffee('expresso', 3000);
    component.ordersReady$.subscribe(coffee => {
      expect(coffee).toEqual(expectedCoffee);
      done();
    });
    component.order('expresso', 3000);
  });

  it('Should prepare coffee in correct order', (done) => {
    let index = 0;
    const numbers = [0, 1, 2, 3, 4];

    component.coffeeCleaner$.subscribe((number) => {
      expect(number).toEqual(numbers[index]);
      if (number === 4) {
        done();
      }
      index++;
    });
  });
});
