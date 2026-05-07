import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSelectComponent } from './app-select.component';
import type { AppSelectOption } from './app-select.models';

describe('AppSelectComponent', () => {
  let fixture: ComponentFixture<AppSelectComponent>;
  let component: AppSelectComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should use selectId as controlId when provided', () => {
    fixture.componentRef.setInput('selectId', 'status');
    fixture.detectChanges();
    expect(component.controlId).toBe('status');
  });

  it('should default controlId when selectId is empty', () => {
    fixture.componentRef.setInput('selectId', '');
    fixture.detectChanges();
    expect(component.controlId).toBe('app-select');
  });

  it('should implement ControlValueAccessor (writeValue/onSelect/onBlur)', () => {
    const options: readonly AppSelectOption[] = [
      { label: 'One', value: '1' },
      { label: 'Two', value: '2' },
    ];
    fixture.componentRef.setInput('options', options);
    fixture.detectChanges();

    const onChange = jest.fn();
    const onTouched = jest.fn();
    component.registerOnChange(onChange);
    component.registerOnTouched(onTouched);

    component.writeValue('2');
    expect(component.value).toBe('2');

    component.onSelect('1');
    expect(component.value).toBe('1');
    expect(onChange).toHaveBeenCalledWith('1');

    component.onBlur();
    expect(onTouched).toHaveBeenCalled();
  });

  it('should pass through raw value when no option matches', () => {
    fixture.componentRef.setInput('options', []);
    fixture.detectChanges();

    const onChange = jest.fn();
    component.registerOnChange(onChange);

    component.onSelect('abc');
    expect(component.value).toBe('abc');
    expect(onChange).toHaveBeenCalledWith('abc');
  });
});

