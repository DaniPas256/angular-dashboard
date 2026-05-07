import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { routes } from '../../app-routing-module';
import { USER_STORAGE_KEY } from './services/user.service.api';

describe('User route + resolver integration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('resolves users and renders table rows on /users', async () => {
    localStorage.setItem(
      USER_STORAGE_KEY,
      JSON.stringify([
        { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Developer' },
      ]),
    );

    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting(), provideRouter(routes)],
    });

    const harness = await RouterTestingHarness.create('/users');
    const native = harness.routeNativeElement as HTMLElement;

    expect(native.querySelector('.page-title')?.textContent).toContain('Users');
    expect(native.querySelectorAll('tbody tr').length).toBe(2);
    expect(native.textContent).toContain('John Doe');
    expect(native.textContent).toContain('Jane Smith');
  });
});
