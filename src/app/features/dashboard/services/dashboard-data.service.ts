import { Injectable } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface DashboardStat {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly hint?: string;
}

export interface DashboardBundle {
  readonly stats: readonly DashboardStat[];
  readonly line: ChartConfiguration['data'];
  readonly bar: ChartConfiguration['data'];
  readonly pie: ChartData<'pie'>;
}

@Injectable({ providedIn: 'root' })
export class DashboardDataService {
  getDashboard$(): Observable<DashboardBundle> {
    const stats: DashboardStat[] = [
      { id: 's1', label: 'Active users', value: '1,284', hint: '+4.2% vs last week' },
      { id: 's2', label: 'Deployments', value: '38', hint: 'Last 30 days' },
      { id: 's3', label: 'Open issues', value: '12', hint: '3 critical' },
      { id: 's4', label: 'Uptime', value: '99.95%', hint: '~90d window' },
    ];

    const line: ChartConfiguration['data'] = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Requests (k)',
          data: [12, 19, 14, 22, 18, 9, 11],
          borderColor: '#2563eb',
          backgroundColor: 'rgb(37 99 235 / 12%)',
          fill: true,
          tension: 0.35,
        },
      ],
    };

    const bar: ChartConfiguration['data'] = {
      labels: ['Auth', 'API', 'UI', 'Infra', 'Docs'],
      datasets: [
        {
          label: 'Hours',
          data: [28, 42, 36, 20, 14],
          backgroundColor: [
            'rgb(37 99 235 / 75%)',
            'rgb(99 102 241 / 75%)',
            'rgb(14 165 233 / 75%)',
            'rgb(34 197 94 / 75%)',
            'rgb(234 179 8 / 75%)',
          ],
        },
      ],
    };

    const pie: ChartData<'pie'> = {
      labels: ['TypeScript', 'SCSS', 'HTML', 'Other'],
      datasets: [
        {
          data: [52, 18, 12, 18],
          backgroundColor: ['#2563eb', '#6366f1', '#0ea5e9', '#94a3b8'],
        },
      ],
    };

    const bundle: DashboardBundle = { stats, line, bar, pie };
    return of(bundle).pipe(delay(450));
  }
}
