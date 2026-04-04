import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { SnippetsCatalogService } from '../services/snippets-catalog.service';

@Component({
  selector: 'app-snippets-layout',
  standalone: false,
  templateUrl: './snippets-layout.component.html',
  styleUrl: './snippets-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnippetsLayoutComponent {
  readonly categoryQuery = signal('');

  constructor(protected readonly catalog: SnippetsCatalogService) {}

  onQueryInput(value: string): void {
    this.categoryQuery.set(value);
  }

  trackCategory(_index: number, c: { id: string }): string {
    return c.id;
  }
}
