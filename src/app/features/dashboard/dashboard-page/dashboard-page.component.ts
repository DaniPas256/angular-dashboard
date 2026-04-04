import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { Observable } from 'rxjs';

import { DashboardBundle, DashboardDataService } from '../services/dashboard-data.service';

@Component({
  selector: 'app-dashboard-page',
  standalone: false,
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent {
  readonly data$: Observable<DashboardBundle>;

  readonly chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: { color: 'var(--color-text-muted)' },
      },
    },
    scales: {
      x: {
        ticks: { color: 'var(--color-text-muted)' },
        grid: { color: 'var(--color-border)' },
      },
      y: {
        ticks: { color: 'var(--color-text-muted)' },
        grid: { color: 'var(--color-border)' },
      },
    },
  };

  readonly pieOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: 'var(--color-text-muted)' },
      },
    },
  };

  constructor(private readonly dashboardData: DashboardDataService) {
    this.data$ = this.dashboardData.getDashboard$();
  }

  trackStatById(_index: number, s: { id: string }): string {
    return s.id;
  }
}
