import { ChartData } from 'chart.js';
import { Directive, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';

@Directive({ selector: '[baseChart]' })
class MockBaseChartDirective {
  @Input() type: unknown;
  @Input() data: unknown;
  @Input() options: unknown;
}

jest.mock('ng2-charts', () => ({
  BaseChartDirective: MockBaseChartDirective,
}));

import { DashboardBundle, DashboardDataService } from '../services/dashboard-data.service';
import { DashboardPageComponent } from './dashboard-page.component';

describe('DashboardPageComponent', () => {
  let fixture: ComponentFixture<DashboardPageComponent>;
  let subject: Subject<DashboardBundle>;

  beforeEach(async () => {
    subject = new Subject<DashboardBundle>();

    await TestBed.configureTestingModule({
      imports: [DashboardPageComponent],
      providers: [
        {
          provide: DashboardDataService,
          useValue: {
            getDashboard$: () => subject.asObservable(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardPageComponent);
    fixture.detectChanges();
  });

  it('should show skeletons before dashboard bundle is emitted', () => {
    // 4 stats skeletons + 3 charts skeletons
    expect(fixture.nativeElement.querySelectorAll('app-skeleton').length).toBe(
      7,
    );
    expect(fixture.nativeElement.querySelector('app-stats-card')).toBeNull();
    expect(fixture.nativeElement.querySelector('app-chart-card')).toBeNull();
  });

  it('should render stats and chart cards after bundle emission', async () => {
    const bundle: DashboardBundle = {
      stats: [
        {
          id: 's1',
          label: 'Active users',
          value: '1,284',
          hint: '+4.2% vs last week',
        },
        { id: 's2', label: 'Deployments', value: '38' },
        { id: 's3', label: 'Open issues', value: '12' },
        { id: 's4', label: 'Uptime', value: '99.95%' },
      ],
      line: { labels: ['Mon'], datasets: [{ data: [1] }] } as ChartData<'line'>,
      bar: { labels: ['Auth'], datasets: [{ data: [2] }] } as ChartData<'bar'>,
      pie: { labels: ['TS'], datasets: [{ data: [3] }] } as ChartData<'pie'>,
    };

    subject.next(bundle);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelectorAll('app-skeleton').length).toBe(
      0,
    );

    expect(fixture.nativeElement.querySelectorAll('app-stats-card').length).toBe(
      4,
    );
    expect(fixture.nativeElement.querySelectorAll('app-chart-card').length).toBe(
      3,
    );

    // ChartCard renders a canvas only when data is present
    expect(fixture.nativeElement.querySelectorAll('canvas').length).toBe(3);

    const hints = fixture.nativeElement.querySelectorAll('.stat__hint');
    expect(hints.length).toBe(1);
    expect(hints[0].textContent?.trim()).toBe('+4.2% vs last week');
  });
});

