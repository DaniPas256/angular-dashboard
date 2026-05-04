import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ThemeUiService } from './core/services/theme-ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  imports: [RouterOutlet],
  styleUrl: './app.scss',
})
export class App {
  constructor(_theme: ThemeUiService) {}
}
