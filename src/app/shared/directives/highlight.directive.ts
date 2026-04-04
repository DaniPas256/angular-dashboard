import { booleanAttribute, Directive, HostBinding, input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: false,
})
export class HighlightDirective {
  readonly appHighlight = input(false, { transform: booleanAttribute });

  @HostBinding('class.app-highlight')
  get active(): boolean {
    return this.appHighlight();
  }
}
