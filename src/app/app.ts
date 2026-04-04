import { Component } from '@angular/core';

import { ThemeUiService } from './core/services/theme-ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss',
})
export class App {
  constructor(_theme: ThemeUiService) {}
}
