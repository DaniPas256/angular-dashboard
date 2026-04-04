import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  input,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import type { AppSelectOption } from './app-select.models';

@Component({
  selector: 'app-select',
  standalone: false,
  templateUrl: './app-select.component.html',
  styleUrl: './app-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppSelectComponent),
      multi: true,
    },
  ],
})
export class AppSelectComponent implements ControlValueAccessor {
  readonly label = input('');
  readonly selectId = input('');
  readonly options = input<readonly AppSelectOption[]>([]);

  value: string | number = '';
  disabled = false;

  private onChange: (v: string | number) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private readonly cdr: ChangeDetectorRef) {}

  get controlId(): string {
    return this.selectId() || 'app-select';
  }

  writeValue(value: string | number | null): void {
    this.value = value ?? '';
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (v: string | number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  onSelect(raw: string): void {
    const opt = this.options().find((o) => String(o.value) === raw);
    const v = opt ? opt.value : raw;
    this.value = v;
    this.onChange(v);
  }

  onBlur(): void {
    this.onTouched();
  }

  trackByValue(_index: number, item: AppSelectOption): string | number {
    return item.value;
  }
}
