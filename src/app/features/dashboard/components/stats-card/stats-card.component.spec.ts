import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsCardComponent } from './stats-card.component';

describe('StatsCardComponent', () => {
  let fixture: ComponentFixture<StatsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StatsCardComponent);
  });

  it('should render label and value', () => {
    fixture.componentRef.setInput('label', 'Active users');
    fixture.componentRef.setInput('value', '1,284');
    fixture.componentRef.setInput('hint', '');
    fixture.detectChanges();

    const label: HTMLElement = fixture.nativeElement.querySelector(
      '.stat__label',
    );
    const value: HTMLElement = fixture.nativeElement.querySelector(
      '.stat__value',
    );

    expect(label.textContent?.trim()).toBe('Active users');
    expect(value.textContent?.trim()).toBe('1,284');
  });

  it('should not render hint when hint is empty', () => {
    fixture.componentRef.setInput('label', 'Deployments');
    fixture.componentRef.setInput('value', '38');
    fixture.componentRef.setInput('hint', '');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.stat__hint')).toBeNull();
  });

  it('should render hint when provided', () => {
    fixture.componentRef.setInput('label', 'Open issues');
    fixture.componentRef.setInput('value', '12');
    fixture.componentRef.setInput('hint', '3 critical');
    fixture.detectChanges();

    const hint: HTMLElement = fixture.nativeElement.querySelector('.stat__hint');
    expect(hint.textContent?.trim()).toBe('3 critical');
  });
});

