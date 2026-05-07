import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppInputComponent } from './app-input.component';

describe('AppInputComponent', () => {
  let fixture: ComponentFixture<AppInputComponent>;
  let component: AppInputComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should derive controlId from label when no inputId provided', () => {
    fixture.componentRef.setInput('label', 'User Email');
    fixture.detectChanges();
    expect(component.controlId).toBe('user-email');
  });

  it('should prefer inputId as controlId', () => {
    fixture.componentRef.setInput('inputId', 'my-id');
    fixture.detectChanges();
    expect(component.controlId).toBe('my-id');
  });

  it('should implement ControlValueAccessor (writeValue/onInput/onBlur)', () => {
    const onChange = jest.fn();
    const onTouched = jest.fn();
    component.registerOnChange(onChange);
    component.registerOnTouched(onTouched);

    component.writeValue('abc');
    expect(component.value).toBe('abc');

    component.onInput('xyz');
    expect(component.value).toBe('xyz');
    expect(onChange).toHaveBeenCalledWith('xyz');

    component.onBlur();
    expect(onTouched).toHaveBeenCalled();
  });

  it('should respect disabled state', () => {
    component.setDisabledState(true);
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(input.disabled).toBe(true);
  });
});

