import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-chart-card',
  standalone: false,
  templateUrl: './chart-card.component.html',
  styleUrl: './chart-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartCardComponent {
  readonly title = input('');
  readonly chartType = input<ChartType>('bar');
  readonly data = input<ChartConfiguration['data'] | null>(null);
  readonly options = input<ChartConfiguration['options']>({});

  get pieData(): ChartData<'pie'> | null {
    return this.chartType() === 'pie' ? (this.data() as ChartData<'pie'>) : null;
  }

  get nonPieData(): ChartConfiguration['data'] | null {
    return this.chartType() === 'pie' ? null : this.data();
  }
}
