import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HighlightDirective } from './highlight.directive';
import { Component } from "@angular/core";

@Component({
  standalone: false,
  template: `<div [appHighlight]='isActive'><div>`
})
class TestComponent {
  isActive = false;
}

describe('HighlightDirective', () => {
  let fixture : ComponentFixture<TestComponent> ;
  let component : TestComponent;

  beforeEach( () => {
    fixture = TestBed.configureTestingModule({
      declarations: [TestComponent, HighlightDirective]
    }).createComponent(TestComponent)

    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('By defult should not be hightlighted', () => {
    const div: HTMLElement = fixture.nativeElement.querySelector('div');

    expect(div.className).toBe('');
  })

  it('should be hightlighted when active', () => {
    const div: HTMLElement = fixture.nativeElement.querySelector('div');
    component.isActive = true;
    fixture.detectChanges();

    expect(div.className).not.toBe('');
  })  
})