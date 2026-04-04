import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ThemeUiService } from '../services/theme-ui.service';

@Component({
  selector: 'app-admin-layout',
  standalone: false,
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLayoutComponent {
  constructor(protected readonly themeUi: ThemeUiService) {}

  toggleTheme(): void {
    this.themeUi.toggle();
  }
}
