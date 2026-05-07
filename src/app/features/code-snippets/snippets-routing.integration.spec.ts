import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { snippetsRoutes } from './snippets-routing.module';

describe('Snippets routing integration', () => {
  it('navigates to category page and renders matching snippet content', async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter(snippetsRoutes)],
    });

    const harness = await RouterTestingHarness.create('/');
    await harness.navigateByUrl('/http-interceptor-jwt');

    const native = harness.routeNativeElement as HTMLElement;
    expect(native.querySelector('.snippet-doc__title')?.textContent).toContain('HTTP');
    expect(native.querySelector('.snippet-doc__lead')?.textContent?.length).toBeGreaterThan(0);
    expect(native.querySelectorAll('.snippet-section').length).toBeGreaterThan(0);
  });

  it('redirects empty snippets path to default category', async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter(snippetsRoutes)],
    });

    const harness = await RouterTestingHarness.create('/');
    await harness.navigateByUrl('/');

    const native = harness.routeNativeElement as HTMLElement;
    expect(native.querySelector('.snippet-doc__title')?.textContent).toContain('FormBuilder');
  });
});
