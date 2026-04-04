import { Directive, OnDestroy, OnInit, input, output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Directive({
  selector: '[appDebounceInput]',
  standalone: false,
  host: {
    '(input)': 'onInput($event)',
  },
})
export class DebounceInputDirective implements OnInit, OnDestroy {
  readonly appDebounceMs = input(300);

  readonly debouncedValue = output<string>();

  private readonly input$ = new Subject<string>();
  private sub?: Subscription;

  ngOnInit(): void {
    const msRaw = this.appDebounceMs();
    const ms = msRaw > 0 ? msRaw : 300;
    this.sub = this.input$
      .pipe(debounceTime(ms), distinctUntilChanged())
      .subscribe((v) => this.debouncedValue.emit(v));
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.input$.complete();
  }

  onInput(event: Event): void {
    const t = event.target as HTMLInputElement | null;
    this.input$.next(t?.value ?? '');
  }
}
