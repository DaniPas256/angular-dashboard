import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  templateUrl: './stats-card.component.html',
  styleUrl: './stats-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsCardComponent {
  readonly label = input.required<string>();
  readonly value = input.required<string>();
  readonly hint = input('');
}
