import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent, Coffee } from './app.component';
import { DebugElement } from '@angular/core';

describe('MojoFileUploadComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let el: DebugElement;

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
  });

  it('Should make new coffee after order', (done) => {
    const expectedCoffee = new Coffee('expresso', 1);
    component.ordersReady$.subscribe(coffee => {
      expect(coffee).toEqual(expectedCoffee);
      done();
    });
    component.order('expresso');
  });
});
