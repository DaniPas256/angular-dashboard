import { DebounceInputDirective } from './debounce-input.directive';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { Component } from "@angular/core";
import { By } from '@angular/platform-browser';

@Component({
  standalone: true,
  imports: [DebounceInputDirective],
  template: `<div><input appDebounceInput><div>`
})
class TestComponent {
  isActive = false;
}

describe('DebounceInputDirective', () => {
  let fixture : ComponentFixture<TestComponent> ;
  let component : TestComponent;

  beforeEach( () => {
    fixture = TestBed.configureTestingModule({
      imports: [TestComponent]
    }).createComponent(TestComponent)

    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should debounce', fakeAsync(() =>{
    const directive = fixture.debugElement.query(By.directive(DebounceInputDirective)).injector.get(DebounceInputDirective);

    const emitSpy = jest.spyOn( directive.debouncedValue, 'emit')
    const input =  fixture.debugElement.query(By.css('input'));

    input.triggerEventHandler('input', { target: { value: 'test' } } )

    fixture.detectChanges()

    expect( emitSpy ).not.toHaveBeenCalled();
    tick(300)
    flush();

    expect( emitSpy ).toHaveBeenCalled();
  }))
})