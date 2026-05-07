import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCardComponent } from './app-card.component';

describe('AppCardComponent', () => {
  let fixture: ComponentFixture<AppCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppCardComponent);
  });

  it('should render header only when title is set', () => {
    fixture.componentRef.setInput('title', '');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.card__header')).toBeNull();

    fixture.componentRef.setInput('title', 'Hello');
    fixture.detectChanges();
    const titleEl: HTMLElement = fixture.nativeElement.querySelector(
      '.card__title',
    );
    expect(titleEl?.textContent?.trim()).toBe('Hello');
  });
});

