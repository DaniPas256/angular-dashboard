import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';

import { AdminLayoutComponent } from './admin-layout.component';
import { ThemeUiService } from '../services/theme-ui.service';

@Component({
  standalone: true,
  template: '<p>Dummy page</p>',
})
class DummyPageComponent {}

describe('AdminLayoutComponent integration', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('theme-dark');
  });

  it('toggles theme through UI button and persists selected mode', async () => {
    await TestBed.configureTestingModule({
      imports: [AdminLayoutComponent],
      providers: [
        ThemeUiService,
        provideRouter([
          { path: 'dashboard', component: DummyPageComponent },
          { path: 'users', component: DummyPageComponent },
          { path: 'snippets', component: DummyPageComponent },
        ]),
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(AdminLayoutComponent);
    fixture.detectChanges();

    const toggleButton = fixture.debugElement.query(By.css('.sidebar__footer .btn'))
      .nativeElement as HTMLButtonElement;

    expect(document.documentElement.classList.contains('theme-dark')).toBeFalsy();
    expect(toggleButton.textContent?.trim()).toBe('Dark mode');

    toggleButton.click();
    fixture.detectChanges();

    expect(document.documentElement.classList.contains('theme-dark')).toBeTruthy();
    expect(localStorage.getItem('portfolio-admin-theme')).toBe('dark');
    expect(toggleButton.textContent?.trim()).toBe('Light mode');
  });
});
