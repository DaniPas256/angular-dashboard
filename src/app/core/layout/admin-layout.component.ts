import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { AppButtonComponent } from '../../shared/components/app-button/app-button.component';
import { ThemeUiService } from '../services/theme-ui.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, AppButtonComponent],
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
