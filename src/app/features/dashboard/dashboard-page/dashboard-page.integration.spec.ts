import { Directive, Input } from '@angular/core';
import { TestBed } from '@angular/core/testing';

@Directive({ selector: '[baseChart]' })
class MockBaseChartDirective {
  @Input() type: unknown;
  @Input() data: unknown;
  @Input() options: unknown;
}

jest.mock('ng2-charts', () => ({
  BaseChartDirective: MockBaseChartDirective,
}));

import { DashboardPageComponent } from './dashboard-page.component';
import { DashboardDataService } from '../services/dashboard-data.service';

describe('DashboardPageComponent integration', () => {
  it('shows skeleton first and then renders cards from real service stream', async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPageComponent],
      providers: [DashboardDataService],
    }).compileComponents();

    const fixture = TestBed.createComponent(DashboardPageComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('app-skeleton').length).toBe(7);
    expect(fixture.nativeElement.querySelectorAll('app-stats-card').length).toBe(0);

    await new Promise((resolve) => setTimeout(resolve, 500));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('app-skeleton').length).toBe(0);
    expect(fixture.nativeElement.querySelectorAll('app-stats-card').length).toBe(4);
    expect(fixture.nativeElement.querySelectorAll('app-chart-card').length).toBe(3);
  });
});
