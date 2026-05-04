import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  templateUrl: './app-skeleton.component.html',
  styleUrl: './app-skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppSkeletonComponent {
  readonly width = input('100%');
  readonly height = input('1rem');
  readonly rounded = input<'sm' | 'md' | 'pill'>('md');
}
