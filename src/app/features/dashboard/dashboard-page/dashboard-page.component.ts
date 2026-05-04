import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ChartConfiguration } from 'chart.js';
import { Observable } from 'rxjs';

import { ChartCardComponent } from '../components/chart-card/chart-card.component';
import { StatsCardComponent } from '../components/stats-card/stats-card.component';
import { AppSkeletonComponent } from '../../../shared/components/app-skeleton/app-skeleton.component';
import { DashboardBundle, DashboardDataService } from '../services/dashboard-data.service';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [AsyncPipe, StatsCardComponent, ChartCardComponent, AppSkeletonComponent],
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
