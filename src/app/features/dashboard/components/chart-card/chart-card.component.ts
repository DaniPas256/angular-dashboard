import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { AppCardComponent } from '../../../../shared/components/app-card/app-card.component';
@Component({
  selector: 'app-chart-card',
  standalone: true,
  imports: [BaseChartDirective, AppCardComponent],
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
